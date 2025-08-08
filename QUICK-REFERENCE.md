# Claude Code Quick Reference Guide

## Essential Commands

### 🔊 Sound Control
```bash
/soundOn                    # Enable notification sounds
/soundOff                   # Disable notification sounds
```

### 🚀 Quick Start
```bash
/start "implement feature"  # Start intelligent workflow
/commit                     # Create conventional commit
/pr-create                  # Create pull request
```

### 🧪 Testing
```bash
/test-gen "ServiceName"     # Generate comprehensive tests
/coverage                   # Analyze test coverage
/tdd "new feature"          # Test-driven development
```

---

## Top 20 Most Useful Commands

| Command | Purpose | Example |
|---------|---------|---------|
| `/start` | Begin complex task | `/start "implement payment gateway"` |
| `/commit` | Conventional commit | `/commit` |
| `/test-gen` | Generate tests | `/test-gen "UserService"` |
| `/api` | Generate API endpoint | `/api "user authentication"` |
| `/refactor` | Intelligent refactoring | `/refactor "OrderProcessor"` |
| `/map` | Strategic roadmap | `/map "microservices migration"` |
| `/deep-dive` | In-depth analysis | `/deep-dive "performance issues"` |
| `/pr-create` | Create pull request | `/pr-create` |
| `/scaffold-deno-fresh` | Deno app | `/scaffold-deno-fresh my-app` |
| `/technical-debt` | Debt assessment | `/technical-debt` |
| `/api-docs` | Generate API docs | `/api-docs` |
| `/think` | Extended reasoning | `/think harder` |
| `/bug-fix` | Fix bugs | `/bug-fix "null pointer"` |
| `/context-load-go-web` | Load Go context | `/context-load-go-web` |
| `/monitor` | Setup monitoring | `/monitor` |
| `/security-audit` | Security scan | `/audit` |
| `/changelog` | Generate changelog | `/changelog` |
| `/containerize` | Docker setup | `/containerize` |
| `/diagram` | Create diagrams | `/diagram "system flow"` |
| `/review` | Code review | `/review` |

---

## Agent Quick Access

### 🤖 Launch Specialized Agents

```bash
# Testing Expert
Use Test Coverage Engineer for comprehensive testing

# Kubernetes Expert
Use Kubernetes Architect for cluster setup and troubleshooting

# Refactoring Expert
Use Refactoring Strategist for code improvement

# Documentation Expert
Use Technical Writer for documentation

# Code Analysis
Use Implementation Investigator to understand integrations

# Leadership Review
Use Tech Lead for architectural guidance

# Cloud Native Development
Use Software Engineer for infrastructure and cloud-native apps
```

---

## Git Worktree Workflows

### Create Feature Branch
```bash
./helper-scripts/addWorkTree.sh feature-name
./helper-scripts/addWorkTree.sh feature-name "Custom prompt for Claude"
```

### Remove Completed Work
```bash
./helper-scripts/removeWorkTree.sh feature-name
```

### Complete Feature Flow
```bash
# 1. Create worktree
./helper-scripts/addWorkTree.sh feature-auth

# 2. Implement feature
/start "implement authentication"

# 3. Generate tests
/test-gen "AuthService"

# 4. Commit changes
/commit

# 5. Create PR
/pr-create

# 6. Clean up
./helper-scripts/removeWorkTree.sh feature-auth
```

---

## Notification Management

### Test Notifications
```bash
# Test notification
echo '{"hook_event_name": "Notification", "message": "Test"}' | node ~/.claude/hooks/notify.js

# Test completion sound
echo '{"hook_event_name": "Stop"}' | node ~/.claude/hooks/notify.js
```

### Configure Sounds
```bash
# Enable sounds
cat ~/.claude/customConfig.json | jq '.notificationSoundEnabled = true' | tee ~/.claude/customConfig.json

# Change notification sound
cat ~/.claude/customConfig.json | jq '.notificationSound = "Hero"' | tee ~/.claude/customConfig.json

# Change completion sound
cat ~/.claude/customConfig.json | jq '.stopSound = "Glass"' | tee ~/.claude/customConfig.json
```

---

## Common Workflows

### 📦 New Project Setup

```bash
# Deno Fresh Application
/scaffold-deno-fresh my-app
/context-load-deno-fresh
/project-status-deno

# Go Microservice
/scaffold-go-connect service-name
/context-load-go-connectrpc
/project-status-go

# Rust API
/scaffold-rust-axum api-name
/project-status-rust
```

### 🐛 Bug Fixing

```bash
/investigate "error message"
/bug-fix "specific issue"
/test-gen "affected component"
/commit
```

### 📚 Documentation

```bash
/api-docs                   # API documentation
/onboard                    # Onboarding guide
/explain "complex code"     # Code explanation
/document "feature"         # General docs
```

### 🔍 Code Analysis

```bash
/deep-dive "architecture"   # Comprehensive analysis
/technical-debt             # Debt assessment
/bottleneck                 # Performance issues
/dependencies               # Dependency analysis
```

### 🔒 Security

```bash
/audit                      # Security audit
/secrets-audit              # Scan for secrets
/threat-model               # Risk assessment
/harden                     # Security hardening
```

---

## Command Categories Cheat Sheet

| Category | Key Commands | Use For |
|----------|-------------|---------|
| **agent/** | persona specialists | Role-specific expertise |
| **analyze/** | deep-dive, map, think | Research & analysis |
| **code/** | api, refactor, migrate | Code operations |
| **context/** | load frameworks/DBs | Context loading |
| **docs/** | api-docs, changelog | Documentation |
| **git/** | commit, pr-create | Version control |
| **ops/** | containerize, deploy | DevOps tasks |
| **scaffold/** | project templates | New projects |
| **security/** | audit, threat-model | Security checks |
| **test/** | test-gen, coverage | Testing |
| **workflow/** | start, plan, epic | Task management |

---

## Performance Tips

### 🚄 Maximum Speed (10x faster)

Use commands with parallel sub-agents:
- `/map` - 8 parallel agents
- `/start` - Intelligent orchestration
- `/deep-dive` - Comprehensive analysis
- `/test-gen` - Parallel test creation

### 💡 Smart Command Chains

```bash
# Complete feature implementation
/map "feature planning" &&
/scaffold-go-connect service &&
/api "endpoints" &&
/test-gen "all services" &&
/api-docs
```

---

## Configuration Files

### Essential Files

| File | Purpose | Location |
|------|---------|----------|
| `settings.json` | Main configuration | `~/.claude/settings.json` |
| `customConfig.json` | User preferences | `~/.claude/customConfig.json` |
| `mcp.json` | MCP servers | `~/.claude/mcp.json` |

### Key Settings

```json
// customConfig.json
{
  "notificationSoundEnabled": true,
  "notificationSound": "Ping",
  "stopSound": "Glass",
  "forceNotifyIfFocused": false
}
```

---

## MCP Server Commands

### GitHub
```bash
# Configured via GITHUB_TOKEN environment variable
# Full GitHub API access available
```

### Jira & Confluence
```bash
# Configured via JIRA_* and CONFLUENCE_* environment variables
# Issue management and documentation
```

---

## Log Analysis

### View Recent Activity
```bash
# Latest tool usage
tail -f ~/.claude/logs/$(basename $PWD).log | jq '.'

# Tool usage statistics
cat ~/.claude/logs/*.log | jq -r '.tool' | sort | uniq -c | sort -rn

# Files accessed today
cat ~/.claude/logs/*.log | jq 'select(.tool == "Read") | .input.file_path' | sort -u
```

---

## Keyboard Shortcuts

### In Cursor/VS Code
- **Cmd+Shift+P**: Command palette
- **Cmd+K**: Claude Code commands
- **Cmd+\\**: Toggle sidebar

---

## Emergency Commands

### If Things Go Wrong

```bash
# Check Claude Code status
ps aux | grep claude

# View recent errors
tail -100 ~/.claude/logs/*.log | grep -i error

# Reset configuration
cp ~/.claude/settings.json ~/.claude/settings.backup.json
# Then edit settings.json

# Test basic functionality
echo "test" | claude

# Disable all hooks temporarily
mv ~/.claude/settings.json ~/.claude/settings.disabled.json
```

---

## Quick Persona Reference

| Persona | Best For |
|---------|----------|
| **backend-specialist** | APIs, databases, scalability |
| **frontend-specialist** | UI, React, performance |
| **security-auditor** | Vulnerabilities, compliance |
| **devops-engineer** | CI/CD, infrastructure |
| **database-architect** | Schema design, optimization |
| **performance-engineer** | Bottlenecks, optimization |
| **test-engineer** | Test strategies, automation |
| **code-reviewer** | Code quality, best practices |

---

## One-Liners

```bash
# Enable all sounds
echo '{"notificationSoundEnabled":true}' > ~/.claude/customConfig.json

# Quick commit
git add . && /commit

# Full test suite
/test-gen "." && /coverage

# Security check
/audit && /secrets-audit

# Complete refactor
/refactor && /test-gen && /commit
```

---

## Pro Tips

1. **Use `/start` for complex tasks** - It manages state and coordinates sub-agents
2. **Load contexts early** - `/context-load-*` commands improve accuracy
3. **Chain commands** - Many commands work well together
4. **Trust the agents** - They're optimized for specific domains
5. **Check logs for debugging** - `~/.claude/logs/` has everything

---

## Getting Help

```bash
# View all commands
ls ~/.claude/commands/**/*.md

# Read command documentation
cat ~/.claude/commands/[category]/[command].md

# Check agent capabilities
cat ~/.claude/agents/[agent-name].md

# View hook configuration
cat ~/.claude/settings.json | jq '.hooks'
```

---

## Most Important Files

1. **README.md** - Complete overview
2. **AGENTS.md** - Agent documentation
3. **COMMANDS.md** - All commands reference
4. **HOOKS.md** - Hook configuration
5. **HELPER-SCRIPTS.md** - Script documentation
6. **QUICK-REFERENCE.md** - This file

---

Remember: Commands starting with `/` are Claude Code commands. Scripts in `helper-scripts/` are bash scripts run from terminal.