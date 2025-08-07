#!/bin/bash

task_name="$1"
shift  # Remove first argument
prompt="${*:-Working on: $task_name}"  # Capture all remaining arguments
worktree_path="$HOME/dev/worktrees/$(basename $PWD)-$task_name"

# Create worktree
git worktree add "$worktree_path" -b "$task_name"

# Create workspace with auto-running task
cat > "$worktree_path/${task_name}.code-workspace" << EOF
{
    "folders": [{"path": "."}],
    "settings": {
        "terminal.integrated.defaultProfile.osx": "zsh"
    },
    "tasks": {
        "version": "2.0.0",
        "tasks": [
            {
                "label": "Claude Code Auto Start",
                "type": "shell",
                "command": "claude",
                "args": ["$prompt"],
                "runOptions": {"runOn": "folderOpen"},
                "presentation": {
                    "echo": true,
                    "reveal": "always",
                    "panel": "new"
                }
            }
        ]
    }
}
EOF

# Open workspace
cursor "$worktree_path/${task_name}.code-workspace"

echo "✅ Opened Cursor with Claude Code auto-starting for task: $task_name"