# Claude Code Hooks Knowledge Base

## Overview

Hooks in Claude Code are user-defined shell commands that execute at specific points during Claude Code's lifecycle. They provide deterministic control over the AI's behavior and enable automation of various tasks.

## Core Concepts

### What are Hooks?
- Shell commands that run automatically at predefined events
- Execute with full user permissions (security consideration)
- Can modify Claude Code's behavior based on exit codes and JSON output
- Configured in the `settings.json` file

### Key Benefits
- Customize notifications (e.g., play sounds, send desktop alerts)
- Automate code formatting after file edits
- Log command execution for audit trails
- Provide automated feedback to Claude
- Implement custom permission systems

## Configuration Structure

Hooks are configured in the `settings.json` file under the `hooks` key:

```json
{
  "hooks": {
    "EventName": [
      {
        "matcher": "ToolPattern",
        "hooks": [
          {
            "type": "command",
            "command": "your-command-here"
          }
        ]
      }
    ]
  }
}
```

### Components:
- **EventName**: The lifecycle event to hook into
- **matcher**: Tool name pattern (e.g., "Bash", "Edit", "*" for all)
- **type**: Always "command" for shell commands
- **command**: The shell command to execute

## Available Events

### 1. PreToolUse
- Runs **before** a tool is executed
- Can prevent tool execution based on exit code
- Useful for validation and permission checks

### 2. PostToolUse
- Runs **after** a tool completes
- Cannot affect the tool's execution
- Ideal for logging, formatting, and notifications

### 3. Notification
- Triggered when Claude Code displays notifications
- Perfect for custom alert systems

### 4. Stop
- Executes when the main agent finishes its work
- Useful for cleanup or summary tasks

### 5. SubagentStop
- Runs when a subagent completes its task
- Similar to Stop but for subagent contexts

## Hook Execution Flow

### Input (stdin)
Hooks receive JSON data via stdin containing:
- Event details
- Tool information
- Relevant parameters

### Output Control

#### Exit Codes:
- **0**: Success (continue normally)
- **Non-zero**: Failure (behavior depends on event type)
  - PreToolUse: Prevents tool execution
  - PostToolUse: Logs error but continues

#### JSON Output:
Hooks can output JSON to stdout to:
- Provide feedback to Claude
- Modify behavior
- Add context to the conversation

## Practical Examples

### 1. Bash Command Logger
Log all bash commands with descriptions:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '\"\\(.tool_input.command) - \\(.tool_input.description // \"No description\")\"' >> ~/.claude/bash-command-log.txt"
          }
        ]
      }
    ]
  }
}
```

### 2. Auto-formatter for Python Files
Format Python files after editing:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "if [[ \"$(jq -r '.tool_input.file_path' | grep -E '\\.py$')\" ]]; then black \"$(jq -r '.tool_input.file_path')\"; fi"
          }
        ]
      }
    ]
  }
}
```

### 3. Sound Notification on Completion
Play a sound when tasks complete:

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Glass.aiff"
          }
        ]
      }
    ]
  }
}
```

### 4. Permission Guard for Sensitive Files
Prevent editing of sensitive files:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "if [[ \"$(jq -r '.tool_input.file_path')\" == *\"secrets\"* ]]; then echo 'Cannot edit files containing secrets'; exit 1; fi"
          }
        ]
      }
    ]
  }
}
```

### 5. Git Status Check Before File Edits
Warn about uncommitted changes:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "if ! git diff --quiet; then echo '{\"message\": \"Warning: You have uncommitted changes\"}'; fi"
          }
        ]
      }
    ]
  }
}
```

## Best Practices

### Security
1. **Validate all inputs** - Never trust data from stdin
2. **Use absolute paths** - Avoid path traversal vulnerabilities
3. **Quote shell variables** - Prevent injection attacks
4. **Limit permissions** - Run with minimal required privileges
5. **Avoid sensitive operations** - Don't modify critical system files

### Performance
1. Keep hooks lightweight and fast
2. Use async operations where possible
3. Implement timeouts for long-running commands
4. Cache results when appropriate

### Reliability
1. Handle errors gracefully
2. Provide meaningful error messages
3. Test hooks thoroughly before deployment
4. Use logging for debugging

### Code Quality
1. Make hooks idempotent when possible
2. Document complex hooks
3. Version control hook configurations
4. Use structured output (JSON) for complex data

## Advanced Patterns

### Conditional Execution
Execute hooks based on conditions:

```bash
if [[ "$(jq -r '.tool_input.file_path')" =~ \\.test\\. ]]; then
  npm test "$(jq -r '.tool_input.file_path')"
fi
```

### Chain Multiple Commands
Use shell operators to chain commands:

```bash
command1 && command2 || echo "Failed"
```

### Environment Variables
Access Claude Code context:

```bash
echo "Working in: $PWD"
```

### JSON Response with Feedback
Provide structured feedback to Claude:

```bash
echo '{"message": "Code formatted successfully", "files_changed": 3}'
```

## Debugging Hooks

### Common Issues
1. **Permission denied**: Ensure hook scripts are executable
2. **Command not found**: Use absolute paths or ensure PATH is set
3. **JSON parsing errors**: Validate JSON output format
4. **Exit code confusion**: Remember non-zero prevents PreToolUse execution

### Debug Techniques
1. Log hook input: `cat > /tmp/hook-debug.json`
2. Test manually: `echo '{}' | your-hook-command`
3. Add verbose output: `set -x` in bash scripts
4. Check Claude Code logs for hook errors

## Hook Input Schema

Each hook receives JSON input with relevant data:

```json
{
  "event": "PreToolUse|PostToolUse|Notification|Stop|SubagentStop",
  "tool_name": "ToolName",
  "tool_input": {
    // Tool-specific parameters
  },
  "tool_output": {
    // Available in PostToolUse
  },
  "context": {
    // Additional context information
  }
}
```

## Limitations

1. Hooks run synchronously (may impact performance)
2. No direct access to Claude's internal state
3. Cannot modify tool inputs (only prevent execution)
4. Limited to shell command execution
5. No built-in timeout mechanism

## Future Considerations

When writing hooks, consider:
1. Portability across different shells/OSes
2. Backwards compatibility with settings
3. Resource usage and cleanup
4. Integration with existing toolchains
5. Documentation for team members

---

This knowledge base provides a comprehensive guide to implementing and using hooks in Claude Code. Remember to always prioritize security and test thoroughly before deploying hooks in production environments.