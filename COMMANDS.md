# Claude Code Commands Reference

## Overview

This repository contains 100+ specialized commands organized into 14 categories. Commands leverage parallel processing with sub-agents for 5-10x performance improvements.

## Command Categories

1. [Agent Commands](#agent-commands)
2. [Analysis Commands](#analysis-commands)
3. [Code Commands](#code-commands)
4. [Context Loading](#context-loading)
5. [Documentation](#documentation)
6. [Git Operations](#git-operations)
7. [GitHub Integration](#github-integration)
8. [Meta Commands](#meta-commands)
9. [Operations & DevOps](#operations--devops)
10. [Scaffolding](#scaffolding)
11. [Security](#security)
12. [Testing](#testing)
13. [Tools](#tools)
14. [Workflow Management](#workflow-management)

---

## Agent Commands

### Browser Automation
```bash
/agent-browser-automation "scrape product data from e-commerce site"
```
- Playwright/Puppeteer automation
- Web scraping and testing
- Form automation

### Merge Preparation
```bash
/agent-prep-merge feature-branch
```
- Pre-merge validation
- Conflict detection
- Test verification

### Persona Commands (35 Specialists)

#### Backend Specialist
```bash
/agent-persona-backend-specialist "design REST API for payment processing"
```
- Scalable API design
- Database optimization
- Microservices architecture

#### Frontend Specialist
```bash
/agent-persona-frontend-specialist "create responsive dashboard"
```
- Modern UI frameworks
- Performance optimization
- Accessibility

#### Security Auditor
```bash
/agent-persona-security-auditor "audit authentication system"
```
- Vulnerability assessment
- OWASP compliance
- Security recommendations

#### DevOps Engineer
```bash
/agent-persona-devops-engineer "setup CI/CD pipeline"
```
- Infrastructure automation
- Deployment strategies
- Monitoring setup

#### Additional Personas
- Database Architect
- Performance Engineer
- Test Engineer
- Code Reviewer
- Software Architect
- Technical Writer
- QA Engineer
- ML Engineer
- Mobile Developer
- Cloud Architect
- Data Scientist
- And 20+ more specialized roles

---

## Analysis Commands

### Code Analysis

#### Deep Explanation
```bash
/elaborate "UserService.authenticate method"
```
- Detailed code explanation
- Algorithm analysis
- Complexity breakdown

#### Strategic Roadmap
```bash
/map "migrate monolith to microservices"
```
- 8 parallel sub-agents
- SMART goals
- Risk assessment
- Timeline creation

#### Schema Analysis
```bash
/schema
```
- Database schema documentation
- API schema analysis
- Data model visualization

### Data Analysis

#### Data Flow Mapping
```bash
/data-flow "user registration process"
```
- Data movement tracking
- System interactions
- Dependency mapping

#### Data Visualization
```bash
/data-viz "monthly sales metrics"
/visualize "system architecture"
```
- Chart generation
- Diagram creation
- Visual representations

### Database Analysis

#### Optimization
```bash
/db-optimize
```
- Query performance analysis
- Index recommendations
- Schema optimization

### Research Commands

#### Deep Research
```bash
/deep-dive "WebAssembly performance"
/deep-web-research "latest React patterns"
```
- Comprehensive analysis
- Multiple source synthesis
- Expert insights

#### Investigation
```bash
/investigate "memory leak in production"
```
- Root cause analysis
- Problem diagnosis
- Solution recommendations

#### Quick Research
```bash
/quick-web-research "JWT best practices"
```
- Fast information gathering
- Concise summaries
- Key points extraction

### Thinking Commands

```bash
/think                    # Standard analysis (4,000 tokens)
/think hard              # Enhanced analysis
/think harder            # Deep computation
/ultrathink              # Maximum analysis (31,999 tokens)
```

---

## Code Commands

### Code Analysis

#### Dependency Analysis
```bash
/analyze-deps
/deps
/dependencies
```
- Dependency graphs
- Version analysis
- Security audit

#### Performance Analysis
```bash
/bottleneck "API endpoints"
```
- Performance hotspots
- Resource usage
- Optimization opportunities

#### Technical Debt
```bash
/technical-debt
```
- Debt assessment
- Refactoring priorities
- Remediation plan

### Code Fixes

#### Bug Fixing
```bash
/bug-fix "null pointer exception in UserController"
```
- Root cause identification
- Fix implementation
- Test coverage

### Code Generation

#### API Generation
```bash
/api "user authentication endpoint"
```
Features:
- Multi-framework support (Spring, Axum, Express, etc.)
- Complete implementation
- Tests and documentation
- Database integration
- Security implementation

Example output structure:
- Controller/Handler
- Service layer
- Repository/DAO
- DTOs/Models
- Validation
- Tests
- API documentation

### Code Migration

#### Deno Migration
```bash
/deno-ify
```
- Convert Node.js to Deno
- Update dependencies
- Modernize code

#### General Migration
```bash
/migrate "jQuery to React"
```
- Technology migration
- Gradual transition plan
- Compatibility maintenance

### Code Navigation

```bash
/related "PaymentService.processPayment"
```
- Find related code
- Dependency tracking
- Usage analysis

### Code Refactoring

#### Intelligent Refactoring
```bash
/refactor "OrderProcessor class"
```
- Design pattern application
- SOLID principles
- Clean code practices

#### Simplification
```bash
/simplify "complex validation logic"
```
- Complexity reduction
- Readability improvement
- Logic streamlining

#### Standardization
```bash
/standardize
```
- Code style enforcement
- Naming conventions
- Pattern consistency

---

## Context Loading

### Database Contexts

```bash
/context-load-dragonfly     # DragonflyDB (Redis replacement)
/context-load-postgres      # PostgreSQL advanced patterns
/context-load-redpanda      # RedPanda streaming
/context-load-scylla        # ScyllaDB patterns
```

### Framework Contexts

```bash
/context-load-deno-fresh    # Deno Fresh framework
/context-load-deno-scripting # Deno automation
/context-load-go-web        # Go web development
```

### Language-Specific Contexts

```bash
/context-load-go-connectrpc  # ConnectRPC patterns
/context-load-rust-async     # Rust async patterns
/context-load-java-quarkus   # Quarkus framework
```

---

## Documentation

### Documentation Generation

```bash
/api-docs                   # Generate OpenAPI/Swagger
/changelog                  # Auto-generate changelog
/document "authentication"  # Create documentation
/onboard                    # Onboarding guide
```

### Documentation Management

```bash
/docs-add                   # Add to existing docs
/docs-init                  # Initialize docs structure
/docs-update                # Update documentation
```

### Code Explanation

```bash
/explain "complex algorithm"
```
- Line-by-line explanation
- Concept clarification
- Example generation

---

## Git Operations

### Commit Operations

```bash
/commit                     # Conventional commit
/commit-push                # Commit and push
```

Conventional commit types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Testing
- chore: Maintenance

### Merge Operations

```bash
/merge-main                 # Merge with main
/resolve-merge-conflicts    # Conflict resolution
```

### Pull Request Operations

```bash
/pr-check                   # PR validation
/pr-create                  # Create PR
/pr-review                  # Automated review
/pr-update                  # Update PR
```

### Review Operations

```bash
/review-git                 # Git history analysis
```

---

## GitHub Integration

```bash
/github-codesearch "authentication pattern"
```
- Cross-repository search
- Pattern matching
- Code discovery

---

## Meta Commands

### Command Generation

```bash
/generate-command "custom-linter"
/ideate-commands
```
- Custom command creation
- Command brainstorming
- Template generation

### Knowledge Extraction

```bash
/knowledge-extract
```
- Codebase analysis
- Pattern extraction
- Best practices identification

### Smart Search

```bash
/search-smart "error handling patterns"
```
- Intelligent search
- Multi-source aggregation
- Relevance ranking

### Translation

```bash
/translate "es" "documentation.md"
```
- Multi-language support
- Technical translation
- Preserves formatting

---

## Operations & DevOps

### CI/CD

```bash
/ci-gen                     # Generate CI/CD pipeline
```
- GitHub Actions
- GitLab CI
- Jenkins
- CircleCI

### Containerization

```bash
/containerize
/deploy
```
- Dockerfile generation
- Docker Compose setup
- Kubernetes manifests
- Deployment automation

### System Administration

```bash
/fedora-expert "setup development environment"
```
- Linux administration
- Package management
- System configuration

### Monitoring

```bash
/health-check
/infra-status
/monitor
/observe
```
- Health monitoring
- Status reporting
- Metrics collection
- Observability setup

### Performance

```bash
/benchmark "API endpoints"
/perf "database queries"
```
- Performance testing
- Bottleneck identification
- Optimization recommendations

### Project Status

```bash
/project-status-deno
/project-status-go
/project-status-java
/project-status-k8s
/project-status-rust
```
- Language-specific health checks
- Dependency analysis
- Build status
- Test coverage

---

## Scaffolding

### Deno Projects

```bash
/scaffold-deno-fresh my-app
```
Features:
- Fresh 2.0 alpha
- Islands architecture
- TypeScript
- Tailwind CSS

```bash
/scaffold-deno-script automation-tool
```
- CLI applications
- Automation scripts
- Task runners

### Go Projects

```bash
/scaffold-go-connect user-service
```
- ConnectRPC service
- gRPC/HTTP support
- Code generation

```bash
/scaffold-go-http-server api-gateway
```
- HTTP server
- Router setup
- Middleware

### Java Projects

```bash
/scaffold-java-quarkus microservice
```
- Quarkus application
- Native compilation
- Cloud-native

### Rust Projects

```bash
/scaffold-rust-axum web-api
```
- Axum web service
- Async runtime
- Database integration

```bash
/scaffold-rust-cli tool-name
```
- CLI application
- Argument parsing
- Error handling

### Documentation

```bash
/scaffold-docusaurus-setup
```
- Documentation site
- Versioning
- Search integration

### Configuration

```bash
/generate-project-claude-settings
```
- Project-specific settings
- Language detection
- Hook configuration

---

## Security

```bash
/audit                      # Security audit
/secrets-audit              # Credential scanning
/harden                     # Security hardening
/threat-model               # Risk assessment
```

Security checks:
- OWASP compliance
- Vulnerability scanning
- Secret detection
- Dependency audit
- Configuration review

---

## Testing

### Test Analysis

```bash
/coverage                   # Coverage analysis
/debug "failing test"       # Test debugging
```

### Test Generation

```bash
/test-gen "UserService"
```
Features:
- Multi-framework support
- Unit/Integration/E2E
- Mocking strategies
- Coverage optimization

```bash
/integration-test "payment flow"
```
- Integration scenarios
- API testing
- Database testing

### Test Execution

```bash
/load-test "checkout endpoint"
/tdd "new feature"
/validate
```
- Performance testing
- TDD workflow
- Test validation

### Test Fixes

```bash
/flaky-fix "intermittent test failure"
```
- Flaky test detection
- Root cause analysis
- Stabilization strategies

---

## Tools

```bash
/cpr "repository pattern"   # Code pattern recognition
/diagram "system flow"       # Diagram generation
/five "production outage"    # Five-whys analysis
/review "pull request #123"  # Code review
/zed-task                    # Zed editor automation
```

---

## Workflow Management

### Workflow Creation

```bash
/epic "user management system"
/prototype "chat interface"
```
- Epic breakdown
- Task planning
- Rapid prototyping

### Workflow Management

```bash
/clean                      # Cleanup workflows
/integrate                  # Integration management
/organize                   # Project organization
/plan "Q1 roadmap"         # Planning
/release "v2.0"            # Release management
/sync                      # Synchronization
```

### Workflow Orchestration

```bash
/start "implement payment gateway"
```
Features:
- State management
- Error recovery
- Sub-agent coordination
- Progress tracking
- Git automation

### Workflow Views

```bash
/next-steps                 # Identify priorities
/options                    # Available choices
/progress                   # Progress tracking
/summary                    # Session summary
/tldr                      # Quick overview
```

---

## Command Architecture

### Parallel Processing
- Commands use Task tool for sub-agents
- 5-10x performance improvement
- Concurrent execution

### State Management
- Session IDs with nanosecond precision
- Progress tracking in `/tmp/`
- Checkpoint creation

### Framework Detection
- Automatic technology detection
- Adaptive strategies
- Multi-framework support

### Modern Tools
- Prefers `rg` over `grep`
- Uses `fd` instead of `find`
- `bat` instead of `cat`
- `eza` instead of `ls`

### Testing Integration
- Pre-work validation
- Incremental testing
- Coverage reporting
- Quality gates

---

## Usage Patterns

### Simple Operations
```bash
/soundOn
/commit
/review
```

### Complex Workflows
```bash
# Full feature implementation
/agent-persona-backend-specialist "design payment API"
/api "payment processing endpoint"
/test-gen "PaymentService"
/start "implement payment gateway"
```

### Analysis Chains
```bash
# Comprehensive analysis
/map "system modernization"
/deep-dive "current architecture"
/technical-debt
/plan "migration strategy"
```

### Framework-Specific
```bash
# Deno project
/scaffold-deno-fresh my-app
/context-load-deno-fresh
/project-status-deno

# Go service
/scaffold-go-connect service
/context-load-go-connectrpc
/project-status-go
```

---

## Best Practices

1. **Use parallel commands** - Launch multiple analyses simultaneously
2. **Leverage contexts** - Load relevant context before complex tasks
3. **Chain workflows** - Combine commands for comprehensive solutions
4. **Monitor progress** - Use workflow view commands
5. **Validate results** - Always run tests and checks

## Performance Tips

- Commands with 8+ sub-agents: ~10x faster
- Batch related operations together
- Use specific commands over general ones
- Load contexts early in session
- Enable state management for long tasks