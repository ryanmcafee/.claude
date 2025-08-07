---
allowed-tools: Task, mcp__atlassian__jira_get_issue, mcp__atlassian__jira_add_comment, mcp__atlassian__jira_update_issue
description: implement a Jira ticket with optional additional instructions
---
# Implement Jira Ticket

Reads a Jira ticket description and implements the requested changes.

## Instructions

Parse the arguments to extract the Jira ticket ID and any additional instructions.
Arguments format: `<TICKET_ID> [additional instructions]`

The arguments provided are: $ARGUMENTS

First, extract the ticket ID (should be in format like APP-1234) from the beginning of the arguments.
Any text after the ticket ID should be treated as additional implementation instructions.

Then:
1. Use mcp__atlassian__jira_get_issue to fetch the ticket details including description and comments
2. Read through the ticket description to understand what needs to be implemented
3. If there are comments on the ticket, read those as well for additional context
4. Begin implementing the requested changes based on the ticket description and any additional instructions provided
5. Update the jira ticket status to be In Progress if it is not already.
6. Use subagents for where it makes sense and think hard.

## Jira Context

Context for Jira Sprint Updates:

### Jira API Structure and Field Formats
- Sprint field in Jira is stored as customfield_10020
- When updating sprints, use the format: {"customfield_10020": SPRINT_ID}
- Sprint IDs are numeric values (e.g., 2248) not string names
- The field accepts a number directly, not an array for updates

### Available Sprints Reference (non-exhaustive list showing format)
- APP Sprint 23: ID 2182 (closed)
- APP Sprint 24: ID 2183 (active)
- APP Sprint 25: ID 2248 (future)
- APP Sprint 26: ID 2249 (future)
- APP Sprint 27: ID 2347 (future)
- APP Sprint 28: ID 2348 (future)

### Jira Board Information
- Main APP board ID: 6
- Board type: scrum
- Sprint board URL pattern: https://jupiterone.atlassian.net/jira/software/projects/APP/boards/6

### Common JQL Queries for Sprint Management
- Find issues in a sprint: sprint = "APP Sprint 25" OR sprint = 2248
- Find issues without a sprint: sprint is EMPTY
- Find issues in active sprints: sprint in openSprints()
- Find issues in future sprints: sprint in futureSprints()

### Sprint Update Process Flow
1. Check current sprint assignment using jira_get_issue with fields=customfield_10020
2. Update sprint using jira_update_issue with fields={"customfield_10020": SPRINT_ID}
3. Verify update with another jira_get_issue call

### Bulk Update Guidelines
- For batch updates, use the jira_batch_create_issues endpoint
- CSV format must include "Issue Key,Sprint" columns
- Maximum recommended batch size: 50 issues per request

### Error Handling Notes
- If an issue is already in the sprint, updating will not cause errors
- You cannot assign an issue to both active and future sprint simultaneously
- Closed sprints cannot receive new issues

### Required Permissions
- Edit Issues permission required for sprint updates
- Board visibility required for the specific board
- Access to view sprints in the relevant board