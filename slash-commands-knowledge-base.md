# Claude Code Slash Commands Knowledge Base

## Overview

Slash commands in Claude Code are special commands that provide shortcuts and enhance interactions during an interactive session. They start with a forward slash (`/`) and can control various aspects of the session or execute custom functionality.

## Built-in Slash Commands

Claude Code comes with several built-in slash commands:

- `/clear` - Clear the conversation history
- `/help` - Display usage help and available commands
- `/model` - Select or change the AI model being used
- `/review` - Request a code review from Claude
- `/bug` - Report bugs directly to Anthropic

## Custom Slash Commands

Custom slash commands can be created to extend Claude's functionality and tailor it to your specific needs.

### Command Locations

Custom commands can be stored in two locations:

1. **Project-specific commands**: `.claude/commands/`
   - Available only within the specific project
   - Ideal for project-related shortcuts and workflows

2. **Personal commands**: `~/.claude/commands/`
   - Available across all projects
   - Perfect for personal productivity tools and common tasks

### Creating Custom Commands

To create a custom command:

1. Create a Markdown file in one of the command directories
2. Name the file after your command (e.g., `sound.md` for `/sound`)
3. Add your command content and instructions

### Command Features

#### Arguments
- Commands can accept arguments using the `$ARGUMENTS` variable
- Example: `/mycommand arg1 arg2` will replace `$ARGUMENTS` with `arg1 arg2`

#### Bash Commands
- Execute bash commands using the `!` prefix
- Example: `!echo "Hello World"`

#### File References
- Reference files using the `@` prefix
- Example: `@src/main.js`

#### Namespacing
- Create subdirectories for organized command groups
- Example: `.claude/commands/dev/build.md` creates `/dev/build`

### Command Structure Example

```markdown
# Command Name

Description of what the command does.

## Instructions

Tell Claude what to do when this command is invoked.

You can include:
- Bash commands: !npm test
- File references: @config.json
- Arguments: Process these arguments: $ARGUMENTS
```

## MCP (Model Context Protocol) Slash Commands

MCP servers can provide dynamic slash commands that are discovered at runtime:

- Format: `/mcp__<server-name>__<prompt-name>`
- Arguments are defined by the MCP server
- Automatically available when MCP servers are connected

## Best Practices

1. **Keep commands focused** - Each command should do one thing well
2. **Use descriptive names** - Command names should clearly indicate their purpose
3. **Document thoroughly** - Include clear instructions and examples
4. **Leverage arguments** - Make commands flexible with argument support
5. **Organize with namespaces** - Group related commands in subdirectories

## Example: SOUND_ENABLED Toggle Command

To create a command that toggles the SOUND_ENABLED environment variable:

1. Create `.claude/commands/sound.md`
2. Add instructions for toggling the variable
3. Use bash commands to modify environment settings

This provides a quick way to enable/disable sounds with `/sound` command.