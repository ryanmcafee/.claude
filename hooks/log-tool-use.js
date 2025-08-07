#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// Create logs directory if it doesn't exist
const logsDir = path.join(os.homedir(), '.claude', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Read input from stdin
let inputData = '';
process.stdin.on('data', chunk => {
  inputData += chunk;
});

process.stdin.on('end', () => {
  try {
    const data = JSON.parse(inputData);
    
    // Get project name from current directory
    const projectName = path.basename(process.cwd());
    
    // Create log entry
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      project: projectName,
      tool: data.tool_name,
      input: data.tool_input,
      output: data.tool_output || null,
      event: data.event
    };
    
    // Write to log file
    const logFile = path.join(logsDir, `${projectName}.log`);
    fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
    
    // Exit successfully
    process.exit(0);
  } catch (error) {
    // Log errors to stderr for debugging if needed
    console.error(`Error in log-tool-use hook: ${error.message}`);
    process.exit(1);
  }
});