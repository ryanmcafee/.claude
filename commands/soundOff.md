---
allowed-tools: Bash(node:*)
description: disable sound notifications
---
# Disable Sound Notifications

Disable sound for notification alerts

## Instructions

!node -e "const fs=require('fs'); const path=require('path'); const configPath=path.join(process.env.HOME, '.claude', 'customConfig.json'); let config={}; try { if(fs.existsSync(configPath)) { config=JSON.parse(fs.readFileSync(configPath, 'utf8')); } } catch(e) {} config.notificationSoundEnabled=false; fs.writeFileSync(configPath, JSON.stringify(config, null, 2)); console.log('🔇 Sound disabled');"

This command updates the notificationSoundEnabled setting in ~/.claude/customConfig.json to false, preserving any existing configuration.