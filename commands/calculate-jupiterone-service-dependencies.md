# JupiterOne Service Dependency Analysis

## Objective
Analyze all JupiterOne GitHub repositories to build a comprehensive service dependency graph and deployment order visualization.

## Requirements
- Use the GitHub CLI (`gh`), do not use GitHub MCP server
- Generate comprehensive dependency analysis and visualizations
- Identify circular dependencies and deployment tiers

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

1. Initial Repository Analysis

  Start with the repos.txt file containing 64 JupiterOne repository names

  Use GitHub CLI to fetch from the JupiterOne organization:

  For each repo, first check for deploy/terraform/dependencies.tf

  If not found, check for deploy/dependencies.yaml (legacy pipeline indicator)

  Also fetch project.name file for canonical service naming (if missing, use repo name)

2. Monorepo Detection

  For repositories without standard dependency files, check for monorepo patterns:

  Pattern 1: deployments/*/ structure

  Check for deployments/*/project.name

  Check for deployments/*/deploy/terraform/dependencies.tf

  Check for deployments/*/deploy/dependencies.yaml

  Pattern 2: packages/*/ structure (e.g., persister-monorepo, file-service, graphql-proxy-service)

  Check for packages/*/project.name

  Check for packages/*/deploy/terraform/dependencies.tf

  Check for packages/*/deploy/dependencies.yaml

3. Dependency Extraction

  From Terraform files: Extract all data "terraform_remote_state" "service_name" references

  From YAML files: Extract all entries under the terraform: key

  Normalize service names (convert underscores to hyphens)

  Map to canonical names from project.name files

4. Dependency Graph Analysis

  Build a complete service graph that:

  Identifies internal vs external dependencies

  Detects all circular dependencies (especially bidirectional ones like iam-v2-service ↔ provision-cognito)

  Calculates deployment tiers using topological sort

  Handles circular dependencies by placing them in the final tier

5. Visualization Requirements

  Create an interactive HTML visualization using vis.js that:

  Shows ALL services without truncation (expected ~68 services excluding integration sub-projects, or 142 with them)

  Displays proper dependency arrows (A → B means A depends on B)

  Color codes services:

  Green: Regular services

  Purple: Monorepo services

  Orange: No dependencies

  Red: Has circular dependencies

  Includes complete lists of:

  All deployment tiers with every service listed

  All circular dependencies

  Alphabetical service listing with metadata

  Interactive features:

  Click nodes for detailed information

  Filter to show only circular dependencies

  Hierarchical layout option

  Physics stabilization

6. Expected Discoveries

  The analysis should reveal:

  4 monorepos:

  integrations: 91 services (can be excluded from visualization for clarity)

  persister-monorepo: 2 services (jupiter-mapper, jupiter-persister)

  file-service: 3 services (file-service-authorizer, file-service-client, file-service-api)

  graphql-proxy-service: 1 service

  Key canonical name mappings:

  iam → iam-v2-service

  rule-service → jupiter-rule-service

  search-indexer → jupiter-search-indexer

  questions-service → jupiter-questions-service

  Circular dependencies to find:

  iam-v2-service ↔ provision-cognito

  entitlement-service ↔ jupiter-rule-service

7. Output Files

  Generate:

  Complete dependency graph JSON with all services and their dependencies

  Deployment order showing which services can be deployed in parallel

  HTML visualization showing the complete service architecture

  Analysis reports identifying circular dependencies and deployment tiers

8. Important Notes

  Some repos have monorepo structure but no valid services (e.g., in-graph-mapper, jupiter-integration-service)

  Some repos are truly without dependencies (e.g., neo4j, event-bus)

  The integrations monorepo alone contains 91 sub-services, making the total count 142 services instead of just 64

  Always use canonical names from project.name files for accurate dependency matching

  Handle both Terraform and YAML dependency formats