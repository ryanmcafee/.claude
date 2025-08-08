# Claude Code Configuration

Personal configuration repository for extending [Claude Code](https://claude.ai/code) with custom hooks, commands, agents and automated notifications.

## Features

- 🤖 **7 Specialized Agents** - Expert agents for testing, refactoring, Kubernetes, documentation, and more
- 📚 **100+ Custom Commands** - Comprehensive command library across 14 categories
- 🔔 **Desktop Notifications** - Get notified when tasks complete or Claude needs your attention
- 🔊 **Customizable Sounds** - Different sounds for different event types
- 📝 **Comprehensive Logging** - Track all tool usage automatically
- 🛠️ **Git Worktree Management** - Automated parallel development workflows
- 🎯 **MCP Server Integrations** - GitHub, Atlassian, Memory, and more
- 🎨 **Smart Focus Detection** - Notifications only when you're not actively watching

## Repository Structure

```
.claude/
├── agents/                    # Specialized AI agents
│   ├── implementation-investigator.md
│   ├── kubernetes-architect.md
│   ├── refactoring-strategist.md
│   ├── software-engineer.md
│   ├── tech-lead.md
│   ├── technical-writer.md
│   └── test-coverage-engineer.md
├── commands/                  # 100+ custom commands
│   ├── agent/                # Agent & persona commands
│   ├── analyze/              # Analysis & research
│   ├── code/                 # Code operations
│   ├── context/              # Context loading
│   ├── docs/                 # Documentation
│   ├── git/                  # Git operations
│   ├── github/               # GitHub integration
│   ├── meta/                 # Meta commands
│   ├── ops/                  # Operations & DevOps
│   ├── scaffold/             # Project scaffolding
│   ├── security/             # Security tools
│   ├── test/                 # Testing commands
│   ├── tool/                 # Specialized tools
│   └── workflow/             # Workflow management
├── helper-scripts/           # Shell automation
│   ├── addWorkTree.sh       # Create git worktrees
│   └── removeWorkTree.sh    # Clean up worktrees
├── hooks/                    # Event hooks
│   ├── notify.js            # Smart notifications
│   └── log-tool-use.js     # Usage logging
├── mcp.json                 # MCP server configuration
├── settings.json            # Main settings
├── settings.local.json      # Local overrides
└── customConfig.json        # User preferences
```

## Specialized Agents

The repository includes 7 expert agents that extend Claude Code's capabilities:

### 1. **Implementation Investigator** 🔍
- **Purpose**: Reverse-engineer and document technology integrations
- **Use Cases**: Understanding MySQL integrations, Temporal workflows, OAuth2 implementations
- **Example**: `"Investigate how Temporal is integrated in our system"`

### 2. **Kubernetes Architect** ☸️
- **Purpose**: Kubernetes cluster design, troubleshooting, and operations
- **Use Cases**: HA cluster setup, networking issues, GitOps workflows
- **Example**: `"Set up ArgoCD for automated deployments"`

### 3. **Refactoring Strategist** 🔧
- **Purpose**: Systematic code improvement and technical debt reduction
- **Use Cases**: Large class decomposition, testability improvements, design patterns
- **Example**: `"This class has 500+ lines and needs refactoring"`

### 4. **Software Engineer** 💻
- **Purpose**: Cloud-native development and infrastructure as code
- **Expertise**: TypeScript, Go, Kubernetes operators, Terraform, AWS
- **Example**: `"Build a Kubernetes operator for database management"`

### 5. **Tech Lead** 👨‍💻
- **Purpose**: Senior technical leadership and architectural guidance
- **Use Cases**: Code reviews, architecture decisions, team mentoring
- **Example**: `"Review my authentication system implementation"`

### 6. **Technical Writer** 📝
- **Purpose**: Comprehensive technical documentation creation
- **Use Cases**: API docs, integration guides, troubleshooting resources
- **Example**: `"Create API documentation for user management service"`

### 7. **Test Coverage Engineer** 🧪
- **Purpose**: Automated testing and coverage analysis
- **Use Cases**: Unit tests, integration tests, contract tests
- **Example**: `"Add test coverage for authentication service"`

## Commands Library

Over 100 specialized commands organized into 14 categories:

### Quick Examples

```bash
# Sound controls
/soundOn                          # Enable notification sounds
/soundOff                         # Disable notification sounds

# Git operations
/commit                           # Create conventional commit
/pr-create                        # Create pull request
/merge-main                       # Merge with main branch

# Code operations
/refactor                         # Intelligent refactoring
/test-gen                         # Generate test suite
/api "user authentication"       # Generate API endpoint

# Scaffolding
/scaffold-deno-fresh my-app      # Fresh 2.0 application
/scaffold-go-connect service      # ConnectRPC service
/scaffold-rust-axum api           # Axum web service

# Analysis
/map "microservices migration"   # Strategic roadmap
/deep-dive "performance issues"  # In-depth analysis
/technical-debt                  # Debt assessment

# Documentation
/api-docs                         # Generate API docs
/changelog                        # Auto-generate changelog
/onboard                          # Create onboarding docs
```

### Command Categories

| Category | Description | Example Commands |
|----------|-------------|------------------|
| **agent/** | Agent & persona commands | `agent-persona-backend-specialist`, `agent-browser-automation` |
| **analyze/** | Analysis & research | `deep-dive`, `map`, `investigate`, `think` |
| **code/** | Code operations | `refactor`, `api`, `migrate`, `simplify` |
| **context/** | Context loading | `context-load-go-web`, `context-load-postgres` |
| **docs/** | Documentation | `api-docs`, `changelog`, `document` |
| **git/** | Git operations | `commit`, `pr-create`, `merge-main` |
| **github/** | GitHub integration | `github-codesearch` |
| **meta/** | Meta commands | `generate-command`, `knowledge-extract` |
| **ops/** | Operations & DevOps | `containerize`, `deploy`, `monitor` |
| **scaffold/** | Project scaffolding | `scaffold-deno-fresh`, `scaffold-rust-axum` |
| **security/** | Security tools | `audit`, `threat-model`, `secrets-audit` |
| **test/** | Testing commands | `test-gen`, `coverage`, `tdd` |
| **tool/** | Specialized tools | `diagram`, `review`, `five` |
| **workflow/** | Workflow management | `start`, `epic`, `plan`, `release` |

## Helper Scripts

### Git Worktree Management

#### Creating Worktrees
```bash
# Create a new feature worktree
./helper-scripts/addWorkTree.sh feature-auth

# With custom Claude prompt
./helper-scripts/addWorkTree.sh api-refactor "Refactoring the API layer for performance"
```

**Features**:
- Creates isolated git worktree at `~/dev/worktrees/[repo]-[task]`
- Generates VS Code workspace with Claude auto-start
- Opens in Cursor editor automatically

#### Removing Worktrees
```bash
# Clean up completed feature
./helper-scripts/removeWorkTree.sh feature-auth
```

**Features**:
- Detects uncommitted changes
- Closes associated Cursor windows
- Removes worktree, branch, and workspace files

## Hooks System

### Notification Hook (`notify.js`)

Intelligent macOS notifications with focus detection:

**Features**:
- Window focus detection (no spam when you're watching)
- Customizable sounds for different events
- Click-to-open Cursor integration
- Markdown cleaning for notifications

**Test Commands**:
```bash
# Test notification
echo '{"hook_event_name": "Notification", "message": "Test"}' | node ~/.claude/hooks/notify.js

# Test completion sound
echo '{"hook_event_name": "Stop"}' | node ~/.claude/hooks/notify.js
```

### Logging Hook (`log-tool-use.js`)

Comprehensive tool usage tracking:

**Features**:
- Project-based log separation
- JSON structured logging
- Automatic directory creation
- Tool input/output tracking

**Log Location**: `~/.claude/logs/[project-name].log`

## Prerequisites

### macOS Requirements

This configuration is designed for macOS and requires:

1. **Homebrew** - Package manager for macOS
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **terminal-notifier** - For desktop notifications
   ```bash
   brew install terminal-notifier
   ```

3. **Node.js** - JavaScript runtime (comes with Claude Code)

## Installation

1. **Clone this repository** to your Claude configuration directory:
   ```bash
   git clone https://github.com/yourusername/.claude.git ~/.claude
   ```

2. **Grant Notification Permissions**:
   - Go to **System Settings** → **Privacy & Security** → **Notifications**
   - Find **terminal-notifier** in the list
   - Enable **Allow Notifications**
   - Adjust notification style and settings as desired

3. **Test the notification system**:
   ```bash
   terminal-notifier -title "Test" -message "Hello from Claude!" -sound Ping
   ```

4. **Configure MCP Server Environment** (optional):
   Create environment variables for MCP integrations:
   ```bash
   export GITHUB_TOKEN="your_github_token"
   export JIRA_URL="https://your-domain.atlassian.net"
   export JIRA_USERNAME="your_email"
   export JIRA_TOKEN="your_jira_token"
   export CONFLUENCE_URL="https://your-domain.atlassian.net/wiki"
   export CONFLUENCE_USERNAME="your_email"
   export CONFLUENCE_TOKEN="your_confluence_token"
   ```

## MCP Server Integrations

The repository includes pre-configured MCP (Model Context Protocol) servers:

### GitHub Integration
- **Type**: Docker-based server
- **Features**: Full GitHub API access, PR management, issue tracking
- **Authentication**: Personal access token via `GITHUB_TOKEN`

### Atlassian Integration (Jira & Confluence)
- **Type**: SSE transport
- **Features**: 
  - Jira: Issue management, sprint planning, workflow automation
  - Confluence: Page creation, documentation management
- **Authentication**: API tokens for both services

### Memory Server
- **Type**: Local SQLite database
- **Features**: Persistent memory across sessions
- **Location**: `~/Library/Application Support/Claude/memory.db`

### Sequential Thinking
- **Type**: Node.js server
- **Features**: Enhanced reasoning capabilities for complex problems

### Time Server
- **Type**: stdio transport
- **Features**: Time-aware operations and scheduling

## Configuration

### customConfig.json

Create or modify `~/.claude/customConfig.json` to customize behavior:

```json
{
  "notificationSoundEnabled": true,
  "notificationSound": "Ping",
  "stopSound": "Glass",
  "forceNotifyIfFocused": false
}
```

#### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `notificationSoundEnabled` | boolean | `true` | Enable/disable notification sounds |
| `notificationSound` | string | `"Ping"` | Sound for regular notifications |
| `stopSound` | string | `"Glass"` | Sound when tasks complete |
| `forceNotifyIfFocused` | boolean | `false` | Show notifications even when window is focused |

#### Available Sounds

Common macOS notification sounds:
- `Basso`, `Blow`, `Bottle`, `Frog`, `Funk`
- `Glass`, `Hero`, `Morse`, `Ping`, `Pop`
- `Purr`, `Sosumi`, `Submarine`, `Tink`

### settings.json

The `settings.json` file is automatically configured with the necessary hooks. It includes:

- **PostToolUse** hook for logging
- **Notification** hook for alerts
- **Stop** hook for completion notifications

## Usage

### Sound Controls

Enable or disable notification sounds using slash commands:

```
/soundOn   # Enable notification sounds
/soundOff  # Disable notification sounds
```

### Notification Behavior

- **When Focused**: By default, notifications are suppressed when you're actively working in the project window
- **When Away**: Notifications appear with sound when you're working in other applications
- **Click to Open**: Clicking a notification opens Cursor with the project directory

### Logs

Tool usage is automatically logged to:
```
~/.claude/logs/[project-name]/tool-use.log
```

## Troubleshooting

### Notifications Not Appearing

1. **Check Permissions**:
   ```bash
   # Test terminal-notifier directly
   terminal-notifier -title "Test" -message "Testing notifications"
   ```

2. **Verify Configuration**:
   ```bash
   cat ~/.claude/customConfig.json
   ```

3. **Check Hook Registration**:
   ```bash
   cat ~/.claude/settings.json | jq '.hooks'
   ```

### No Sound Playing

1. **Check Sound Settings**:
   ```bash
   cat ~/.claude/customConfig.json | jq '.notificationSoundEnabled'
   ```

2. **Test Sound**:
   ```bash
   terminal-notifier -sound Ping -title "Test" -message "Testing sound"
   ```

3. **Verify System Volume**: Ensure macOS volume is not muted

### Focus Detection Issues

If notifications appear when they shouldn't (or vice versa):

1. **Force Notifications**:
   ```bash
   # Edit customConfig.json
   {
     "forceNotifyIfFocused": true
   }
   ```

2. **Check Window Title**: The system detects focus by checking if the project name appears in the active window title

## Customization

### Adding New Hooks

1. Create a new JavaScript file in `hooks/`
2. Register it in `settings.json`:
   ```json
   {
     "hooks": {
       "EventName": [{
         "matcher": "*",
         "hooks": [{
           "type": "command",
           "command": "node ~/.claude/hooks/your-hook.js"
         }]
       }]
     }
   }
   ```

### Creating Custom Commands

1. Create a markdown file in `commands/`
2. Use this template:
   ```markdown
   ---
   description: Brief description
   ---
   # Command Name
   
   ## Instructions
   
   !your bash command here
   ```

## Security Notes

- Hooks run with your full user permissions
- All inputs are sanitized before processing
- Logs are stored locally and never transmitted
- No sensitive data is included in notifications

## Contributing

Feel free to fork and customize this configuration for your own needs. Pull requests for improvements are welcome!

## License

This configuration is provided as-is for personal use with Claude Code.