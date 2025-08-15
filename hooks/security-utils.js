const fs = require('fs');
const path = require('path');
const os = require('os');

class SecurityUtils {
    constructor() {
        this.homeDir = os.homedir();
        this.claudeDir = path.join(this.homeDir, '.claude');
        this.policyPath = path.join(__dirname, 'security-policy.json');
        this.policy = this.loadSecurityPolicy();
    }

    /**
     * Load security policy from configuration file
     */
    loadSecurityPolicy() {
        try {
            if (!fs.existsSync(this.policyPath)) {
                console.error(`Security policy not found at: ${this.policyPath}`);
                return { enabled: false };
            }
            
            const policyContent = fs.readFileSync(this.policyPath, 'utf8');
            return JSON.parse(policyContent);
        } catch (error) {
            console.error('Error loading security policy:', error.message);
            return { enabled: false };
        }
    }

    /**
     * Check if security system is enabled
     */
    isEnabled() {
        return this.policy.enabled === true;
    }

    /**
     * Validate a command against security policies
     * @param {string} command - The command to validate
     * @param {string} workingDir - Current working directory
     * @returns {Object} Validation result with action, reason, and risk level
     */
    validateCommand(command, workingDir = process.cwd()) {
        if (!this.isEnabled()) {
            return { action: 'allow', reason: 'Security system disabled' };
        }

        const result = {
            action: 'allow',
            reason: '',
            riskLevel: 'low',
            category: '',
            matchedPattern: ''
        };

        // Check each policy category
        for (const [categoryName, category] of Object.entries(this.policy.policies || {})) {
            if (!category.enabled) continue;

            // Check blocked patterns
            const blockedResult = this.checkPatterns(command, category.block_patterns || [], 'block');
            if (blockedResult.matched) {
                result.action = 'block';
                result.reason = `Command matches blocked pattern in ${categoryName}`;
                result.riskLevel = 'high';
                result.category = categoryName;
                result.matchedPattern = blockedResult.pattern;
                return result;
            }

            // Check confirmation patterns
            const confirmResult = this.checkPatterns(command, category.require_confirmation || [], 'confirm');
            if (confirmResult.matched) {
                result.action = 'confirm';
                result.reason = `Command requires confirmation for ${categoryName}`;
                result.riskLevel = 'medium';
                result.category = categoryName;
                result.matchedPattern = confirmResult.pattern;
            }
        }

        // Check path restrictions
        const pathResult = this.validatePath(command, workingDir);
        if (pathResult.action !== 'allow') {
            return pathResult;
        }

        return result;
    }

    /**
     * Check command against pattern list
     * @param {string} command - Command to check
     * @param {Array} patterns - Array of regex patterns
     * @param {string} action - Action to take if matched
     * @returns {Object} Match result
     */
    checkPatterns(command, patterns, action) {
        for (const pattern of patterns) {
            try {
                const regex = new RegExp(pattern, 'i');
                if (regex.test(command)) {
                    return { matched: true, pattern, action };
                }
            } catch (error) {
                console.error(`Invalid regex pattern: ${pattern}`, error.message);
            }
        }
        return { matched: false };
    }

    /**
     * Validate path operations
     * @param {string} command - Command to validate
     * @param {string} workingDir - Current working directory
     * @returns {Object} Validation result
     */
    validatePath(command, workingDir) {
        const pathRestrictions = this.policy.path_restrictions;
        if (!pathRestrictions?.enabled) {
            return { action: 'allow', reason: 'Path restrictions disabled' };
        }

        // FIRST: Check blocked system paths (highest priority)
        const blockedPath = this.operatesOnBlockedPath(command);
        if (blockedPath) {
            // Check if it's a read-only operation which might be allowed
            const isReadOnly = this.isReadOnlyCommand(command);
            if (!isReadOnly) {
                return {
                    action: 'block',
                    reason: `Operation on protected system path: ${blockedPath}`,
                    riskLevel: 'high',
                    category: 'path_restriction'
                };
            }
        }

        // SECOND: Check if command operates outside current working directory
        const isOutsideCwd = this.commandOperatesOutsideCwd(command, workingDir);
        if (isOutsideCwd) {
            // Check if it's an allowed read-only operation
            const isAllowedReadOnly = this.isAllowedReadOnlyOperation(command);
            if (isAllowedReadOnly) {
                return { action: 'allow', reason: 'Read-only operation outside CWD allowed' };
            }

            // Check if it requires confirmation
            const requiresConfirmation = this.requiresConfirmationOutsideCwd(command);
            if (requiresConfirmation) {
                return {
                    action: 'confirm',
                    reason: 'Operation outside working directory requires confirmation',
                    riskLevel: 'medium',
                    category: 'path_restriction'
                };
            }
        }

        return { action: 'allow', reason: 'Path validation passed' };
    }

    /**
     * Check if command operates outside current working directory
     */
    commandOperatesOutsideCwd(command, workingDir) {
        // Look for absolute paths or parent directory references
        const pathPatterns = [
            /\/[^/\s]+/,           // Absolute paths
            /\.\.\//,              // Parent directory traversal
            /~\/[^/\s]+/,          // Home directory references
            /\$HOME/               // Home environment variable
        ];

        return pathPatterns.some(pattern => pattern.test(command));
    }

    /**
     * Check if command is an allowed read-only operation
     */
    isAllowedReadOnlyOperation(command) {
        const allowedOps = this.policy.path_restrictions?.allowed_operations_outside_cwd || [];
        return allowedOps.some(op => {
            const pattern = new RegExp(`^${op}\\s+`, 'i');
            return pattern.test(command.trim());
        });
    }

    /**
     * Check if command requires confirmation when outside CWD
     */
    requiresConfirmationOutsideCwd(command) {
        const confirmOps = this.policy.path_restrictions?.always_require_confirmation_outside_cwd || [];
        return confirmOps.some(op => {
            const pattern = new RegExp(`^${op}\\s+`, 'i');
            return pattern.test(command.trim());
        });
    }

    /**
     * Check if command operates on blocked system paths
     */
    operatesOnBlockedPath(command) {
        const blockedPaths = this.policy.path_restrictions?.blocked_paths || [];
        
        for (const blockedPath of blockedPaths) {
            // Create more comprehensive patterns to catch system path operations
            const patterns = [
                // Direct path references: rm /etc/passwd, chmod /bin/ls
                new RegExp(`\\s+${this.escapeRegex(blockedPath)}(/[^\\s]*)?\\s*$`, 'i'),
                new RegExp(`\\s+${this.escapeRegex(blockedPath)}(/[^\\s]*)?\\s+`, 'i'),
                // Commands starting with the path
                new RegExp(`^[^\\s]+\\s+${this.escapeRegex(blockedPath)}(/|\\s|$)`, 'i')
            ];
            
            if (patterns.some(pattern => pattern.test(command))) {
                return blockedPath;
            }
        }
        
        return null;
    }

    /**
     * Check if command is read-only (safe to execute on system paths)
     */
    isReadOnlyCommand(command) {
        const readOnlyCommands = [
            'ls', 'cat', 'less', 'more', 'head', 'tail', 'grep', 'find',
            'file', 'stat', 'du', 'df', 'wc', 'sort', 'uniq', 'cut',
            'awk', 'sed', 'diff', 'cmp', 'strings', 'hexdump', 'od'
        ];

        const commandName = this.extractCommandName(command).toLowerCase();
        return readOnlyCommands.includes(commandName);
    }

    /**
     * Escape regex special characters
     */
    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * Extract command name from full command string
     */
    extractCommandName(command) {
        const parts = command.trim().split(/\s+/);
        return parts[0] || '';
    }

    /**
     * Create security log entry
     * @param {Object} event - Security event to log
     */
    createLogEntry(event) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            event_type: 'security_check',
            action: event.action,
            command: event.command,
            working_directory: event.workingDir,
            reason: event.reason,
            risk_level: event.riskLevel,
            category: event.category,
            matched_pattern: event.matchedPattern,
            user_response: event.userResponse || null
        };

        return JSON.stringify(logEntry);
    }

    /**
     * Get risk explanation for user confirmation
     */
    getRiskExplanation(validationResult) {
        const explanations = {
            'file_destruction': 'This command can permanently delete files or directories',
            'system_modification': 'This command can modify critical system files or permissions',
            'process_control': 'This command can terminate processes or affect system stability',
            'network_security': 'This command can establish network connections or download content',
            'permission_escalation': 'This command can elevate privileges or modify security settings',
            'disk_operations': 'This command can modify disk partitions or filesystems',
            'archive_operations': 'This command can extract files in potentially dangerous ways',
            'symlink_attacks': 'This command can create symbolic links outside the current directory',
            'environment_manipulation': 'This command can modify environment variables affecting system behavior',
            'code_execution': 'This command can execute arbitrary code',
            'path_restriction': 'This command operates outside the current working directory'
        };

        return explanations[validationResult.category] || 'This command has been flagged for security review';
    }

    /**
     * Format confirmation prompt for user
     */
    formatConfirmationPrompt(command, validationResult) {
        const explanation = this.getRiskExplanation(validationResult);
        
        return {
            command: command,
            risk_level: validationResult.riskLevel,
            category: validationResult.category,
            explanation: explanation,
            reason: validationResult.reason,
            matched_pattern: validationResult.matchedPattern,
            prompt: `⚠️  SECURITY WARNING ⚠️\n\nCommand: ${command}\nRisk Level: ${validationResult.riskLevel.toUpperCase()}\nReason: ${explanation}\n\nDo you want to proceed? (y/N)`
        };
    }

    /**
     * Check if bypass is enabled and command has bypass keyword
     */
    checkBypass(command) {
        const bypass = this.policy.bypass;
        if (!bypass?.enabled) return false;
        
        return command.includes(bypass.bypass_keyword);
    }
}

module.exports = SecurityUtils;