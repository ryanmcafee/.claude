#!/bin/bash

task_name="$1"
repo_name=$(basename $(git rev-parse --show-toplevel 2>/dev/null) 2>/dev/null)
worktree_path="$HOME/dev/worktrees/${repo_name}-${task_name}"

# Expand the tilde path
worktree_path=$(eval echo "$worktree_path")

if [ -z "$task_name" ]; then
    echo "❌ Error: Please provide a task name"
    echo "Usage: cursor-claude-down <task_name>"
    exit 1
fi

if [ -z "$repo_name" ]; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

if [ ! -d "$worktree_path" ]; then
    echo "❌ Error: Worktree not found at $worktree_path"
    exit 1
fi

echo "🔍 Found worktree: $worktree_path"

# Check if there are uncommitted changes
cd "$worktree_path"
if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "⚠️  Warning: Uncommitted changes detected in worktree"
    git status --porcelain
    read -p "Do you want to continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Aborted"
        exit 1
    fi
fi

# Go back to original repo
cd - > /dev/null

echo "🧹 Cleaning up worktree: $task_name"

# Close any Cursor windows for this workspace (macOS)
if command -v osascript &> /dev/null; then
    osascript << EOF 2>/dev/null
tell application "Cursor"
    set windowList to every window
    repeat with w in windowList
        if name of w contains "$task_name" then
            close w
        end if
    end repeat
end tell
EOF
fi

# Remove the worktree
echo "🗑️  Removing worktree..."
git worktree remove "$worktree_path" --force

# Delete the feature branch
echo "🌿 Deleting branch feature/$task_name..."
git branch -D "feature/$task_name" 2>/dev/null || echo "   (branch may have been already deleted)"

# Clean up any leftover workspace files
workspace_file="$worktree_path/${task_name}.code-workspace"
if [ -f "$workspace_file" ]; then
    rm "$workspace_file"
fi

echo "✅ Successfully cleaned up task: $task_name"