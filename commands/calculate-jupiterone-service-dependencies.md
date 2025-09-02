# JupiterOne Service Dependency Analysis

## Objective
Analyze all JupiterOne GitHub repositories to build a comprehensive service dependency graph and deployment order visualization using parallel sub-agents for maximum performance.

## Requirements
- Use the GitHub CLI (`gh`), do not use GitHub MCP server
- Generate comprehensive dependency analysis and visualizations
- Identify circular dependencies and deployment tiers
- Leverage sub-agents for parallel repository analysis
- Write and use python code to help determistically collect the needed data

## Repository List
Use the following list to output to a `repos.txt` file:
- JupiterOne/jupiter-integration-jupiterone
- JupiterOne/entitlement-service
- JupiterOne/rule-service
- JupiterOne/login
- JupiterOne/notification-service
- JupiterOne/iam
- JupiterOne/parameter-service
- JupiterOne/jupiter-usage-reporter
- JupiterOne/feature-toggle-service
- JupiterOne/dashboard-service
- JupiterOne/jupiter-questions-service
- JupiterOne/jupiter-reporting-service
- JupiterOne/jupiter-scheduler
- JupiterOne/jupiter-search-indexer
- JupiterOne/jupiter-settings-service
- JupiterOne/email-template-generator
- JupiterOne/graphql-proxy-service
- JupiterOne/provision-vendor-stack
- JupiterOne/web-images
- JupiterOne/event-bus
- JupiterOne/rate-limiter
- JupiterOne/asset-inventory-service
- JupiterOne/auth-cache
- JupiterOne/provision-data-model-schemas
- JupiterOne/apps
- JupiterOne/jupiter-data-model
- JupiterOne/web-icons
- JupiterOne/history-stream
- JupiterOne/provision-api-gateway
- JupiterOne/provision-apps-gateway
- JupiterOne/provision-cognito
- JupiterOne/provision-backup-cognito-user-pools
- JupiterOne/callisto
- JupiterOne/account-change-stream
- JupiterOne/query-service
- JupiterOne/query-domain
- JupiterOne/query-engine
- JupiterOne/persister-monorepo
- JupiterOne/jupiter-autocomplete-service
- JupiterOne/file-service
- JupiterOne/history-service
- JupiterOne/provision-neo4j
- JupiterOne/neo4j
- JupiterOne/in-graph-mapper
- JupiterOne/provision-island-network-proxy
- JupiterOne/jupiter-integration-service
- JupiterOne/jupiter-integration-aws
- JupiterOne/jupiter-provision-eventbridge
- JupiterOne/halo
- JupiterOne/provision-integration-rds
- JupiterOne/integrations
- JupiterOne/provision-integration-aws-account
- JupiterOne/provision-argocd
- JupiterOne/error-reporting-service
- JupiterOne/provision-waf
- JupiterOne/provision-managed-questions
- JupiterOne/data-catalog
- JupiterOne/observability-agent
- JupiterOne/provision-actions-runner-controller
- JupiterOne/provision-backup-dynamodb-tables
- JupiterOne/provision-launchdarkly
- JupiterOne/docker-registry
- JupiterOne/opentelemetry-instrumentation
- JupiterOne/web-service

## Instructions

### Phase 1: Parallel Repository Discovery (Using Sub-Agents)

Deploy 10 parallel sub-agents to analyze repository batches:

```
Divide the 64 repositories into 10 batches (~6-7 repos each)

Each sub-agent will:
- Use gh CLI to fetch repository contents
- Check for deploy/terraform/dependencies.tf
- Check for deploy/dependencies.yaml (legacy)
- Fetch project.name file for canonical naming
- Return structured JSON with findings
```

Sub-agent task distribution:
- Agent 1: Repos 1-7
- Agent 2: Repos 8-14
- Agent 3: Repos 15-21
- Agent 4: Repos 22-28
- Agent 5: Repos 29-35
- Agent 6: Repos 36-42
- Agent 7: Repos 43-49
- Agent 8: Repos 50-56
- Agent 9: Repos 57-61
- Agent 10: Repos 62-64 + monorepo detection

### Phase 2: Parallel Monorepo Analysis (Using Sub-Agents)

Deploy 4 parallel sub-agents for monorepo detection:

```
Agent 1: Analyze repositories with deployments/*/ structure
- Check for deployments/*/project.name
- Check for deployments/*/deploy/terraform/dependencies.tf
- Check for deployments/*/deploy/dependencies.yaml

Agent 2: Analyze repositories with packages/*/ structure
- Check for packages/*/project.name
- Check for packages/*/deploy/terraform/dependencies.tf
- Check for packages/*/deploy/dependencies.yaml

Agent 3: Deep scan persister-monorepo and file-service
- Expected: persister-monorepo (2 services)
- Expected: file-service (3 services)

Agent 4: Deep scan integrations and graphql-proxy-service
- Expected: integrations (91 services)
- Expected: graphql-proxy-service (1 service)
```

### Phase 3: Parallel Dependency Extraction (Using Sub-Agents)

Deploy 3 parallel sub-agents for dependency extraction:

```
Agent 1: Parse all Terraform dependencies
- Extract data "terraform_remote_state" "service_name" references
- Normalize service names (underscores to hyphens)
- Map to canonical names from project.name files

Agent 2: Parse all YAML dependencies
- Extract entries under terraform: key
- Normalize service names
- Map to canonical names

Agent 3: Cross-reference and validate dependencies
- Identify internal vs external dependencies
- Build preliminary dependency mappings
- Flag inconsistencies for review
```

### Phase 4: Parallel Graph Analysis (Using Sub-Agents)

Deploy 5 parallel sub-agents for comprehensive analysis:

```
Agent 1: Circular dependency detection
- Identify all circular dependencies
- Focus on known patterns (iam-v2-service ↔ provision-cognito)
- Document bidirectional dependencies

Agent 2: Topological sort and tier calculation
- Calculate deployment tiers
- Handle circular dependencies appropriately
- Generate deployment order

Agent 3: Service categorization
- Identify monorepo services
- Categorize standalone services
- Flag services without dependencies

Agent 4: Dependency validation
- Cross-check all dependency references
- Verify canonical name mappings
- Identify broken or missing dependencies

Agent 5: Statistics generation
- Count total services and dependencies
- Calculate dependency density
- Generate metrics for visualization
```

### Phase 5: Visualization Generation

Create an interactive HTML visualization using vis.js:

**Visual Requirements:**
- Show ALL services without truncation (~68 services or 142 with integrations)
- Proper dependency arrows (A → B means A depends on B)
- Color coding:
  - Green: Regular services
  - Purple: Monorepo services
  - Orange: No dependencies
  - Red: Has circular dependencies

**Data Display:**
- Complete deployment tiers with all services
- All circular dependencies highlighted
- Alphabetical service listing with metadata

**Interactive Features:**
- Click nodes for detailed information
- Filter to show only circular dependencies
- Hierarchical layout option
- Physics stabilization

### Phase 6: Expected Discoveries

The parallel analysis should reveal:

**Monorepos (4 total):**
- integrations: 91 services (optional exclusion for clarity)
- persister-monorepo: 2 services (jupiter-mapper, jupiter-persister)
- file-service: 3 services (file-service-authorizer, file-service-client, file-service-api)
- graphql-proxy-service: 1 service

**Key Canonical Name Mappings:**
- iam → iam-v2-service
- rule-service → jupiter-rule-service
- search-indexer → jupiter-search-indexer
- questions-service → jupiter-questions-service

### Phase 7: Output Generation

Generate comprehensive artifacts:

1. **dependency-graph.json** - Complete service dependency map
2. **deployment-order.json** - Parallel deployment tiers
3. **visualization.html** - Interactive vis.js graph
4. **analysis-report.md** - Circular dependencies and metrics
5. **service-catalog.json** - All services with metadata

### Implementation Notes

**Performance Optimization:**
- Use 10+ parallel sub-agents for ~10x speedup
- Batch GitHub API calls within each agent
- Process results concurrently, not sequentially

**Edge Cases:**
- Some repos have monorepo structure but no services
- Some repos have no dependencies (neo4j, event-bus)
- Total service count: 142 with integrations, 68 without
- Always use canonical names from project.name files
- Support both Terraform and YAML formats

**Execution Strategy:**
1. Launch Phase 1 agents (10 parallel) for initial discovery
2. Launch Phase 2 agents (4 parallel) for monorepo analysis
3. Launch Phase 3 agents (3 parallel) for dependency extraction
4. Launch Phase 4 agents (5 parallel) for graph analysis
5. Synthesize all results and generate visualizations