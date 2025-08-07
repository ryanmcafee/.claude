# Claude Code Configuration

Personal configuration repository for extending [Claude Code](https://claude.ai/code) with custom hooks, commands, agents and automated notifications.

## Features

- 🔔 **Desktop Notifications** - Get notified when tasks complete or Claude needs your attention
- 🔊 **Customizable Sounds** - Different sounds for different event types
- 📝 **Comprehensive Logging** - Track all tool usage automatically
- 🎯 **Custom Commands** - Quick shortcuts for common tasks
- 🎨 **Smart Focus Detection** - Notifications only when you're not actively watching

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