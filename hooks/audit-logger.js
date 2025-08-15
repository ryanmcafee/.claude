#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const SecurityUtils = require('./security-utils');

class AuditLogger {
    constructor() {
        this.security = new SecurityUtils();
        this.auditPath = path.join(process.env.HOME, '.claude', 'logs', 'audit.log');
        this.detailedAuditPath = path.join(process.env.HOME, '.claude', 'logs', 'detailed-audit.json');
        this.ensureLogDirectories();
    }

    /**
     * Ensure log directories exist
     */
    ensureLogDirectories() {
        const logDir = path.dirname(this.auditPath);
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
    }

    /**
     * Process audit event
     */
    async processEvent(eventData) {
        try {
            const auditEntry = this.createAuditEntry(eventData);
            
            // Write human-readable log
            this.writeHumanReadableLog(auditEntry);
            
            // Write detailed JSON log
            this.writeDetailedLog(auditEntry);
            
            // Check for suspicious patterns
            await this.analyzeSuspiciousActivity(auditEntry);
            
        } catch (error) {
            console.error('Audit Logger Error:', error.message);
            this.logError(error, eventData);
        }
        
        // Always exit successfully for audit logging
        process.exit(0);
    }

    /**
     * Create comprehensive audit entry
     */
    createAuditEntry(eventData) {
        const timestamp = new Date().toISOString();
        const sessionId = this.generateSessionId();
        
        const auditEntry = {
            // Core identification
            timestamp,
            session_id: sessionId,
            audit_id: this.generateAuditId(),
            
            // Event details
            event_type: 'tool_execution',
            tool_name: eventData.tool_name,
            hook_event_name: eventData.hook_event_name,
            
            // Command details
            command: this.extractCommand(eventData),
            command_hash: this.hashCommand(this.extractCommand(eventData)),
            
            // Context
            working_directory: eventData.working_directory || process.cwd(),
            project_name: this.extractProjectName(eventData.working_directory),
            
            // System context
            user: process.env.USER || 'unknown',
            hostname: require('os').hostname(),
            platform: process.platform,
            node_version: process.version,
            
            // Security assessment
            security_assessment: this.assessSecurity(eventData),
            
            // Full event data (for detailed analysis)
            raw_event_data: eventData,
            
            // Risk indicators
            risk_indicators: this.identifyRiskIndicators(eventData)
        };

        return auditEntry;
    }

    /**
     * Extract command from event data
     */
    extractCommand(eventData) {
        if (eventData.parameters?.command) return eventData.parameters.command;
        if (eventData.arguments?.command) return eventData.arguments.command;
        if (eventData.tool_arguments?.command) return eventData.tool_arguments.command;
        return 'unknown_command';
    }

    /**
     * Generate session ID
     */
    generateSessionId() {
        // Use environment variables or generate based on timestamp
        return process.env.CLAUDE_SESSION_ID || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Generate unique audit ID
     */
    generateAuditId() {
        return crypto.randomBytes(16).toString('hex');
    }

    /**
     * Hash command for pattern analysis while preserving privacy
     */
    hashCommand(command) {
        if (!command || command === 'unknown_command') return null;
        return crypto.createHash('sha256').update(command).digest('hex');
    }

    /**
     * Extract project name from working directory
     */
    extractProjectName(workingDir) {
        if (!workingDir) return 'unknown';
        return path.basename(workingDir);
    }

    /**
     * Assess security risk of command
     */
    assessSecurity(eventData) {
        const command = this.extractCommand(eventData);
        if (command === 'unknown_command') {
            return { risk_level: 'unknown', details: 'Command not identified' };
        }

        const validation = this.security.validateCommand(command);
        
        return {
            risk_level: validation.riskLevel || 'low',
            action_taken: validation.action || 'allow',
            category: validation.category || null,
            reason: validation.reason || 'No security concerns',
            matched_pattern: validation.matchedPattern || null
        };
    }

    /**
     * Identify risk indicators in the event
     */
    identifyRiskIndicators(eventData) {
        const indicators = [];
        const command = this.extractCommand(eventData);

        // Command-based risk indicators
        if (command.includes('sudo')) indicators.push('elevated_privileges');
        if (command.includes('rm')) indicators.push('file_deletion');
        if (command.includes('curl') || command.includes('wget')) indicators.push('network_access');
        if (command.includes('..')) indicators.push('path_traversal');
        if (command.includes('/dev/')) indicators.push('device_access');
        if (command.includes('&&') || command.includes('||') || command.includes('|')) indicators.push('command_chaining');
        if (command.includes('eval') || command.includes('exec')) indicators.push('code_execution');
        
        // Context-based indicators
        const workingDir = eventData.working_directory || process.cwd();
        if (workingDir.includes('/tmp')) indicators.push('temporary_directory');
        if (workingDir === '/') indicators.push('root_directory_operation');

        return indicators;
    }

    /**
     * Write human-readable audit log
     */
    writeHumanReadableLog(auditEntry) {
        const logLine = this.formatHumanReadableEntry(auditEntry);
        fs.appendFileSync(this.auditPath, logLine + '\n');
    }

    /**
     * Format entry for human reading
     */
    formatHumanReadableEntry(auditEntry) {
        const timestamp = auditEntry.timestamp.replace('T', ' ').replace(/\.\d{3}Z$/, '');
        const risk = auditEntry.security_assessment.risk_level.toUpperCase();
        const action = auditEntry.security_assessment.action_taken.toUpperCase();
        
        let riskIcon = '✅';
        if (risk === 'MEDIUM') riskIcon = '⚠️ ';
        if (risk === 'HIGH') riskIcon = '🛑';

        return `${timestamp} ${riskIcon} [${action}] ${auditEntry.tool_name}: ${auditEntry.command} (${auditEntry.project_name})`;
    }

    /**
     * Write detailed JSON audit log
     */
    writeDetailedLog(auditEntry) {
        const logLine = JSON.stringify(auditEntry);
        fs.appendFileSync(this.detailedAuditPath, logLine + '\n');
    }

    /**
     * Analyze for suspicious activity patterns
     */
    async analyzeSuspiciousActivity(auditEntry) {
        const suspiciousPatterns = [
            {
                name: 'rapid_high_risk_commands',
                check: () => this.checkRapidHighRiskCommands(auditEntry)
            },
            {
                name: 'unusual_directory_access',
                check: () => this.checkUnusualDirectoryAccess(auditEntry)
            },
            {
                name: 'potential_data_exfiltration',
                check: () => this.checkPotentialDataExfiltration(auditEntry)
            }
        ];

        for (const pattern of suspiciousPatterns) {
            try {
                const result = await pattern.check();
                if (result.suspicious) {
                    this.logSuspiciousActivity(pattern.name, result, auditEntry);
                }
            } catch (error) {
                console.error(`Error checking pattern ${pattern.name}:`, error.message);
            }
        }
    }

    /**
     * Check for rapid high-risk commands
     */
    checkRapidHighRiskCommands(auditEntry) {
        // Simple implementation - check if current command is high risk
        const isHighRisk = auditEntry.security_assessment.risk_level === 'high';
        
        if (isHighRisk) {
            return {
                suspicious: true,
                details: 'High-risk command detected',
                severity: 'high'
            };
        }

        return { suspicious: false };
    }

    /**
     * Check for unusual directory access
     */
    checkUnusualDirectoryAccess(auditEntry) {
        const sensitiveDirectories = ['/etc', '/bin', '/usr/bin', '/sbin', '/boot', '/sys'];
        const workingDir = auditEntry.working_directory;
        
        for (const sensitiveDir of sensitiveDirectories) {
            if (workingDir.startsWith(sensitiveDir)) {
                return {
                    suspicious: true,
                    details: `Operation in sensitive directory: ${sensitiveDir}`,
                    severity: 'medium'
                };
            }
        }

        return { suspicious: false };
    }

    /**
     * Check for potential data exfiltration
     */
    checkPotentialDataExfiltration(auditEntry) {
        const command = auditEntry.command;
        const exfiltrationPatterns = [
            /curl.*-d.*@/,  // POST data with file
            /wget.*--post-file/,  // POST file
            /nc.*-e/,  // Netcat with execute
            /ssh.*-R/  // SSH reverse tunnel
        ];

        for (const pattern of exfiltrationPatterns) {
            if (pattern.test(command)) {
                return {
                    suspicious: true,
                    details: 'Potential data exfiltration pattern detected',
                    severity: 'high'
                };
            }
        }

        return { suspicious: false };
    }

    /**
     * Log suspicious activity
     */
    logSuspiciousActivity(patternName, result, auditEntry) {
        const suspiciousLogPath = path.join(process.env.HOME, '.claude', 'logs', 'suspicious-activity.log');
        
        const suspiciousEntry = {
            timestamp: new Date().toISOString(),
            pattern: patternName,
            severity: result.severity,
            details: result.details,
            audit_id: auditEntry.audit_id,
            command: auditEntry.command,
            working_directory: auditEntry.working_directory
        };

        fs.appendFileSync(suspiciousLogPath, JSON.stringify(suspiciousEntry) + '\n');
        
        // Also log to console for immediate attention
        console.error(`🚨 SUSPICIOUS ACTIVITY: ${patternName} - ${result.details}`);
    }

    /**
     * Log errors
     */
    logError(error, eventData) {
        const errorLogPath = path.join(process.env.HOME, '.claude', 'logs', 'audit-errors.log');
        
        const errorEntry = {
            timestamp: new Date().toISOString(),
            error: error.message,
            stack: error.stack,
            event_data: eventData
        };

        fs.appendFileSync(errorLogPath, JSON.stringify(errorEntry) + '\n');
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
        const logger = new AuditLogger();
        await logger.processEvent(eventData);
        
    } catch (error) {
        console.error('Audit Logger Fatal Error:', error.message);
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

module.exports = AuditLogger;