#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const SecurityUtils = require('./security-utils');

class SecurityGuard {
    constructor() {
        this.security = new SecurityUtils();
        this.logPath = path.join(process.env.HOME, '.claude', 'logs', 'security.log');
        this.ensureLogDirectory();
    }

    /**
     * Ensure log directory exists
     */
    ensureLogDirectory() {
        const logDir = path.dirname(this.logPath);
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
    }

    /**
     * Process security event from Claude Code
     */
    async processEvent(eventData) {
        try {
            // Only process Bash tool events for now
            if (eventData.tool_name !== 'Bash') {
                return this.exitAllow('Not a Bash command');
            }

            const command = this.extractCommand(eventData);
            if (!command) {
                return this.exitAllow('No command found');
            }

            const workingDir = eventData.working_directory || process.cwd();
            
            // Check for bypass
            if (this.security.checkBypass(command)) {
                this.logSecurityEvent({
                    ...eventData,
                    action: 'bypass',
                    reason: 'Bypass keyword detected',
                    command
                });
                return this.exitAllow('Bypass keyword detected');
            }

            // Validate command
            const validationResult = this.security.validateCommand(command, workingDir);
            
            // Log the security check
            this.logSecurityEvent({
                ...eventData,
                ...validationResult,
                command,
                workingDir
            });

            switch (validationResult.action) {
                case 'block':
                    return this.exitBlock(validationResult, command);
                    
                case 'confirm':
                    return await this.handleConfirmation(validationResult, command, eventData);
                    
                default:
                    return this.exitAllow('Command passed security validation');
            }

        } catch (error) {
            console.error('Security Guard Error:', error.message);
            this.logError(eventData, error);
            // Fail secure - block on error
            return this.exitBlock({ 
                reason: 'Security system error', 
                riskLevel: 'high' 
            }, 'unknown');
        }
    }

    /**
     * Extract command from event data
     */
    extractCommand(eventData) {
        // Check various possible command locations in event data
        if (eventData.parameters?.command) {
            return eventData.parameters.command;
        }
        
        if (eventData.arguments?.command) {
            return eventData.arguments.command;
        }

        if (eventData.tool_arguments?.command) {
            return eventData.tool_arguments.command;
        }

        // Try to find command in any string field
        for (const [key, value] of Object.entries(eventData)) {
            if (typeof value === 'string' && value.length > 0 && value.length < 1000) {
                // Simple heuristic: if it contains common command patterns
                if (/^[a-zA-Z][a-zA-Z0-9_-]*\s/.test(value) || /^(sudo|rm|cp|mv|chmod|chown|kill)/.test(value)) {
                    return value;
                }
            }
        }

        return null;
    }

    /**
     * Handle user confirmation for risky commands
     */
    async handleConfirmation(validationResult, command, eventData) {
        const confirmationData = this.security.formatConfirmationPrompt(command, validationResult);
        
        // Create confirmation prompt
        console.log(confirmationData.prompt);
        
        try {
            const response = await this.getUserResponse();
            const userResponse = response.toLowerCase().trim();
            
            // Log user response
            this.logSecurityEvent({
                ...eventData,
                ...validationResult,
                command,
                userResponse: response,
                action: userResponse === 'y' || userResponse === 'yes' ? 'confirmed_allow' : 'confirmed_block'
            });

            if (userResponse === 'y' || userResponse === 'yes') {
                return this.exitAllow('User confirmed risky operation');
            } else {
                return this.exitBlock({ 
                    reason: 'User denied confirmation', 
                    riskLevel: validationResult.riskLevel 
                }, command);
            }
            
        } catch (error) {
            console.error('Error getting user confirmation:', error.message);
            return this.exitBlock({ 
                reason: 'Confirmation timeout or error', 
                riskLevel: 'high' 
            }, command);
        }
    }

    /**
     * Get user response from stdin
     */
    getUserResponse() {
        return new Promise((resolve, reject) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            // Set timeout for user response
            const timeout = setTimeout(() => {
                rl.close();
                reject(new Error('Confirmation timeout'));
            }, 30000); // 30 seconds

            rl.question('', (answer) => {
                clearTimeout(timeout);
                rl.close();
                resolve(answer);
            });
        });
    }

    /**
     * Log security event
     */
    logSecurityEvent(event) {
        try {
            if (!this.security.policy.logging?.enabled) return;

            const logEntry = this.security.createLogEntry(event);
            fs.appendFileSync(this.logPath, logEntry + '\n');
        } catch (error) {
            console.error('Failed to log security event:', error.message);
        }
    }

    /**
     * Log error event
     */
    logError(eventData, error) {
        try {
            const logEntry = JSON.stringify({
                timestamp: new Date().toISOString(),
                event_type: 'security_error',
                error: error.message,
                stack: error.stack,
                event_data: eventData
            });
            fs.appendFileSync(this.logPath, logEntry + '\n');
        } catch (logError) {
            console.error('Failed to log error:', logError.message);
        }
    }

    /**
     * Exit with allow status
     */
    exitAllow(reason) {
        console.log(`Security Guard: ALLOW - ${reason}`);
        process.exit(0);
    }

    /**
     * Exit with block status
     */
    exitBlock(validationResult, command) {
        const message = `🛑 BLOCKED: ${validationResult.reason}`;
        console.error(message);
        
        if (validationResult.riskLevel === 'high') {
            console.error(`⚠️  HIGH RISK COMMAND BLOCKED: ${command}`);
            console.error(`💡 This command was blocked for security reasons.`);
            
            if (validationResult.matchedPattern) {
                console.error(`🔍 Matched pattern: ${validationResult.matchedPattern}`);
            }
        }
        
        process.exit(1);
    }
}

/**
 * Main execution
 */
async function main() {
    try {
        // Read event data from stdin
        const input = await readStdin();
        if (!input) {
            console.error('No input received');
            process.exit(1);
        }

        const eventData = JSON.parse(input);
        const guard = new SecurityGuard();
        await guard.processEvent(eventData);
        
    } catch (error) {
        console.error('Security Guard Fatal Error:', error.message);
        process.exit(1);
    }
}

/**
 * Read JSON data from stdin
 */
function readStdin() {
    return new Promise((resolve, reject) => {
        let data = '';
        
        process.stdin.on('data', chunk => {
            data += chunk.toString();
        });
        
        process.stdin.on('end', () => {
            resolve(data);
        });
        
        process.stdin.on('error', error => {
            reject(error);
        });
    });
}

// Run if called directly
if (require.main === module) {
    main().catch(error => {
        console.error('Unhandled error:', error);
        process.exit(1);
    });
}

module.exports = SecurityGuard;