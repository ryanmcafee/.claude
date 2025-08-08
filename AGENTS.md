# Claude Code Agents Documentation

## Overview

This repository includes 7 specialized agents that extend Claude Code's capabilities with expert knowledge in specific domains. Each agent has unique capabilities, methodologies, and use cases.

## Agent Directory

1. [Implementation Investigator](#implementation-investigator)
2. [Kubernetes Architect](#kubernetes-architect)
3. [Refactoring Strategist](#refactoring-strategist)
4. [Software Engineer](#software-engineer)
5. [Tech Lead](#tech-lead)
6. [Technical Writer](#technical-writer)
7. [Test Coverage Engineer](#test-coverage-engineer)

---

## Implementation Investigator

**File**: `agents/implementation-investigator.md`  
**Color**: Purple  
**Type**: Code Analysis Specialist

### Description
Expert reverse-engineering agent specializing in documenting how technologies, libraries, and features are integrated within codebases. Conducts thorough investigations to understand implementation patterns and architectural decisions.

### Core Capabilities
- Integration pattern analysis and architectural decision documentation
- Configuration and initialization process mapping
- Data flow tracing and interaction pattern identification
- Dependency analysis and coupling point discovery
- Error handling and edge case investigation
- Usage example collection and documentation

### When to Use
- Understanding how third-party libraries are integrated
- Investigating complex technology implementations
- Documenting existing system architectures
- Reverse-engineering legacy code
- Creating integration guides from existing code

### Example Usage

```bash
# Investigate database integration
"I need to understand how MySQL is integrated with our data access layer"

# Analyze workflow engine
"Can you investigate how Temporal is integrated in our system and what workflows we have?"

# Document authentication
"How is OAuth2 implemented in our API?"
```

### Investigation Methodology

The agent uses 8-10 parallel sub-agents for maximum efficiency:

1. **Entry Point Scanner** - Finds initialization and setup code
2. **Interface Mapper** - Identifies APIs and integration points
3. **Data Flow Tracer** - Tracks data movement through the system
4. **Dependency Analyzer** - Maps libraries and dependencies
5. **Pattern Recognizer** - Identifies architectural patterns
6. **Configuration Hunter** - Finds config files and environment variables
7. **Test Inspector** - Analyzes test behavior for understanding
8. **Documentation Finder** - Locates existing documentation
9. **Error Handler** - Identifies failure scenarios
10. **Usage Example Collector** - Finds real implementation usage

### Output Format
- Comprehensive integration report
- Architecture diagrams (when applicable)
- Configuration requirements
- Usage examples
- Best practices and recommendations

---

## Kubernetes Architect

**File**: `agents/kubernetes-architect.md`  
**Color**: Yellow  
**Type**: Infrastructure and Operations Expert

### Description
Kubernetes architect and operations expert with deep knowledge across the entire Kubernetes ecosystem, from cluster internals to high-level architectural patterns.

### Core Capabilities

#### Architecture & Design
- Multi-tenant cluster design
- Resource quotas and limits
- High availability patterns
- Disaster recovery planning

#### Networking
- CNI plugins (Calico, Cilium, Flannel)
- Service types and ingress controllers
- Service mesh (Istio, Linkerd)
- Network policies and security

#### Storage
- CSI drivers configuration
- Persistent volumes and claims
- Dynamic provisioning
- StatefulSet storage patterns

#### Security
- RBAC configuration
- Pod Security Standards
- Network Policies
- Admission controllers
- Secret management

#### Observability
- Prometheus and Grafana setup
- Distributed tracing
- Log aggregation with Loki
- Custom metrics and alerts

### When to Use
- Setting up production Kubernetes clusters
- Troubleshooting complex networking issues
- Implementing GitOps workflows
- Designing scalable architectures
- Security hardening
- Performance optimization

### Example Usage

```bash
# Cluster setup
"I need to set up a highly available Kubernetes cluster with proper monitoring"

# Troubleshooting
"My pods can't communicate with each other and DNS resolution is failing"

# GitOps implementation
"How do I set up ArgoCD for automated deployments to my cluster?"

# Security
"Implement Pod Security Standards and RBAC for my cluster"
```

### Working Principles
1. **Production-First Mindset** - Always consider reliability, scalability, security
2. **Declarative Over Imperative** - Favor GitOps and Infrastructure as Code
3. **Best Practices by Default** - Resource limits, health checks, security contexts
4. **Tool Agnostic** - Vendor-neutral advice when possible
5. **Systematic Troubleshooting** - Events, logs, describe resources

### Common Patterns

#### High Availability Setup
```yaml
# Example: HA cluster configuration approach
- Control plane: 3+ nodes across availability zones
- etcd: External or stacked with backups
- Load balancer for API server
- Node pools for different workload types
```

#### GitOps Workflow
```yaml
# ArgoCD application example
- Git repository as source of truth
- Automated sync policies
- Progressive delivery with Flagger
- Secret management with Sealed Secrets
```

---

## Refactoring Strategist

**File**: `agents/refactoring-strategist.md`  
**Color**: Pink  
**Type**: Code Quality and Maintenance Expert

### Description
Elite code refactoring strategist with deep expertise in software design patterns, clean code principles, and systematic code improvement methodologies.

### Core Capabilities
- Code smell and anti-pattern identification
- SOLID principle violation detection
- Design pattern application recommendations
- Complex method and class decomposition
- Duplicate code consolidation
- Testability improvement analysis
- Coupling reduction strategies
- Performance optimization through refactoring

### When to Use
- After completing feature implementation
- When code becomes hard to maintain
- Before major feature additions
- During technical debt sprints
- When test coverage is difficult to achieve

### Example Usage

```bash
# Post-implementation refactoring
"I've just finished implementing the authentication module. Can you help me refactor it?"

# Complexity reduction
"This class has grown to over 500 lines and is becoming hard to maintain"

# Testability improvement
"I'm having trouble writing unit tests for this module because of all the dependencies"

# Performance optimization
"Identify refactoring opportunities that could improve performance"
```

### Refactoring Analysis Process

1. **Comprehensive Code Assessment** 
   - Identify all refactoring candidates
   - Assess impact vs. risk for each
   
2. **Pattern Recognition**
   - Identify systematic issues
   - Suggest architectural improvements
   
3. **Testability Analysis**
   - Evaluate testing impediments
   - Recommend test-friendly structures
   
4. **Dependency Mapping**
   - Analyze coupling and cohesion
   - Suggest modularization strategies
   
5. **Risk Evaluation**
   - Assess refactoring complexity
   - Provide safety guidelines

### Output Format

#### Priority Matrix
| Priority | Refactoring | Impact | Effort | Risk |
|----------|------------|--------|--------|------|
| HIGH | Extract Service Layer | High | Medium | Low |
| HIGH | Introduce Repository Pattern | High | Low | Low |
| MEDIUM | Consolidate Duplicate Logic | Medium | Low | Low |
| LOW | Rename Variables | Low | Low | None |

#### Detailed Refactoring Plan
- Step-by-step transformation approach
- Safety checkpoints and validation
- Test coverage requirements
- Rollback strategies

#### Code Examples
```javascript
// Before refactoring
class UserService {
  async createUser(data) {
    // 100 lines of mixed concerns
  }
}

// After refactoring
class UserService {
  constructor(validator, repository, notifier) {
    // Dependency injection
  }
  
  async createUser(data) {
    const validated = await this.validator.validate(data);
    const user = await this.repository.create(validated);
    await this.notifier.sendWelcome(user);
    return user;
  }
}
```

---

## Software Engineer

**File**: `agents/software-engineer.md`  
**Type**: Senior Software Engineer - Cloud Native & Infrastructure Specialist

### Description
Senior Software Engineer with 15+ years of experience, specializing in cloud-native technologies, infrastructure as code, and modern DevOps practices.

### Technical Expertise

#### Languages & Frameworks
- **TypeScript/Node.js** (Expert): Express, NestJS, Fastify
- **Golang** (Expert): Gin, Echo, Fiber, gRPC
- **Python** (Proficient): FastAPI, Django
- **Rust** (Learning): Actix, Axum

#### Cloud & Infrastructure
- **AWS Services**: EKS, EC2, S3, RDS, Lambda, CloudWatch
- **Container Orchestration**: Kubernetes, Helm, Kustomize
- **Infrastructure as Code**: Terraform, Terragrunt, AWS CDK, Pulumi
- **CI/CD**: GitHub Actions, GitLab CI, ArgoCD, Flux

#### Observability & Monitoring
- OpenTelemetry implementation
- Prometheus and Grafana
- New Relic integration
- Distributed tracing

### Engineering Philosophy
1. **GitOps First** - All changes through Git
2. **Cloud Native Design** - Build for distributed systems
3. **Automation Everything** - If you do it twice, automate
4. **Observability Driven** - Measure everything
5. **Security as Code** - Shift security left

### Specialized Areas

#### Kubernetes Operator Development
```go
// Example: Custom controller logic
func (r *Reconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
  // Operator reconciliation logic
}
```

#### GitOps Implementation
- Repository structure design
- Environment promotion strategies
- Secret management patterns
- Progressive delivery

#### Infrastructure Design
- Multi-region architectures
- Disaster recovery planning
- Cost optimization strategies
- Security best practices

### Example Usage

```bash
# Kubernetes operator
"Build a Kubernetes operator for managing database schemas"

# Infrastructure design
"Design a multi-region AWS architecture with Terraform"

# GitOps workflow
"Implement GitOps with ArgoCD for our microservices"

# Cloud native app
"Build a cloud-native application with Go and Kubernetes"
```

---

## Tech Lead

**File**: `agents/tech-lead.md`  
**Color**: Green  
**Type**: Senior Technical Leadership Expert

### Description
Senior Tech Lead with 15+ years of experience building and scaling software systems. Combines technical excellence with pragmatic delivery, balancing idealism with realism.

### Core Capabilities

#### Code Review Excellence
- Architectural impact assessment
- Performance implications analysis
- Security vulnerability identification
- Maintainability evaluation
- Team skill consideration

#### Architecture Guidance
- System design evaluation
- Technology selection advice
- Scalability planning
- Technical debt assessment
- Migration strategies

#### Team Mentorship
- Clear technical explanations
- Best practice guidance
- Code quality standards
- Learning culture development

#### Strategic Planning
- Technical roadmap creation
- Risk assessment and mitigation
- Resource allocation advice
- Timeline estimation

### Review Methodology

1. **Understand Context** - Business requirements and constraints
2. **Evaluate Solution** - Against functional and non-functional requirements
3. **Identify Risks** - Edge cases and failure modes
4. **Suggest Improvements** - Prioritized by impact and effort
5. **Provide Examples** - Concrete code improvements
6. **Consider Team** - Skill level and conventions

### Decision Framework

Evaluates technical choices on six dimensions:

1. **Correctness** - Does it solve the problem?
2. **Clarity** - Will the team understand it in 6 months?
3. **Performance** - Efficient for current and near-future needs?
4. **Maintainability** - How easily can it be modified?
5. **Testability** - Can we verify it works?
6. **Security** - Are we protecting data and systems?

### Example Usage

```bash
# Code review
"I just implemented a new authentication system using JWT tokens"

# Architecture decision
"Should we use microservices or a monolith for our new project?"

# Technical debt
"How should we prioritize our technical debt backlog?"

# Team guidance
"What coding standards should we adopt for our team?"
```

### Communication Style
- Direct but constructive feedback
- Explains "why" behind recommendations
- Provides actionable suggestions
- Balances ideal vs. pragmatic solutions
- Considers business context

---

## Technical Writer

**File**: `agents/technical-writer.md`  
**Type**: Technical Documentation Specialist

### Description
Technical Documentation Specialist focused on creating clear, comprehensive technical documentation with audience-focused content strategy.

### Core Capabilities

#### Documentation Types
- **API Reference** - Complete endpoint documentation
- **Integration Guides** - Step-by-step tutorials
- **Code Examples** - Working samples in multiple languages
- **Troubleshooting Guides** - Common issues and solutions
- **Architecture Documentation** - System design and flow
- **Release Notes** - Feature updates and changes

#### Writing Standards
- **Clarity First** - Simple, direct language
- **Consistency** - Uniform terminology
- **Completeness** - All necessary information
- **Accessibility** - Multiple skill levels
- **Searchability** - Well-structured content

### Documentation Process

1. **Audience Analysis** - Identify readers and knowledge levels
2. **Information Architecture** - Structure for usability
3. **Content Creation** - Clear, accurate writing
4. **Example Development** - Working code samples
5. **Review and Testing** - Technical accuracy validation
6. **Maintenance Planning** - Update procedures

### Example Usage

```bash
# API documentation
"Create comprehensive API documentation for user management service"

# Getting started guide
"Write a getting started guide for new developers"

# Troubleshooting
"Create a troubleshooting guide for common deployment issues"

# Architecture docs
"Document our microservices architecture"
```

### Documentation Templates

#### API Endpoint
```markdown
## POST /api/v1/users

Creates a new user account.

### Authentication
Requires API key: `Bearer YOUR_API_KEY`

### Request Body
\`\`\`json
{
  "email": "user@example.com",
  "username": "johndoe"
}
\`\`\`

### Response
\`\`\`json
{
  "id": "user_123",
  "email": "user@example.com",
  "username": "johndoe",
  "createdAt": "2024-01-15T10:30:00Z"
}
\`\`\`

### Error Codes
- `400` - Invalid input
- `409` - User already exists
- `429` - Rate limit exceeded
```

---

## Test Coverage Engineer

**File**: `agents/test-coverage-engineer.md`  
**Color**: Purple  
**Model**: Opus  
**Type**: Automated Testing Specialist

### Description
Expert software engineer specializing in automated testing for JavaScript and TypeScript applications with deep expertise in test-driven development and achieving high code coverage.

### Core Capabilities

#### Test Types
- **Unit Tests** - Isolated component testing
- **Integration Tests** - Component interaction validation
- **End-to-End Tests** - User behavior simulation
- **Contract Tests** - External dependency validation
- **Performance Tests** - Load and stress testing

#### Framework Expertise
- **Jest** - Comprehensive testing framework
- **Vitest** - Modern, fast alternative
- **Testing Library** - DOM testing utilities
- **Cypress/Playwright** - E2E testing
- **MSW** - API mocking

### Testing Philosophy

#### Proactive Testing
- Write tests immediately after implementation
- Never wait for "testing phase"
- Test-driven development when possible

#### Meaningful Coverage
- Focus on behavior, not lines
- Test edge cases and error paths
- Avoid testing implementation details

#### Contract Testing
- Mock external dependencies at boundaries
- Create contract tests for assumptions
- Validate third-party API behavior

### Example Usage

```bash
# New feature testing
"I've created a new data validation function in utils/validator.js"

# Coverage gaps
"The authentication service in src/services/auth.js has no test coverage"

# API validation
"We're using several third-party APIs and I'm worried about breaking changes"
```

### Testing Patterns

#### Unit Test Example
```javascript
describe('UserValidator', () => {
  it('should validate email format', () => {
    const result = validateEmail('user@example.com');
    expect(result.isValid).toBe(true);
  });

  it('should reject invalid email', () => {
    const result = validateEmail('invalid-email');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Invalid email format');
  });
});
```

#### Contract Test Example
```javascript
describe('External API Contract', () => {
  it('should match expected response schema', async () => {
    const response = await fetchUserFromAPI('123');
    expect(response).toMatchSchema(userSchema);
  });
});
```

### Special Features
- Uses 🧪 context marker in responses
- Runs tests frequently during development
- Suggests refactoring for testability
- Creates comprehensive test suites

---

## Agent Invocation

Agents are typically invoked through:

1. **Direct Task Assignment** - Claude automatically selects appropriate agent
2. **Task Tool** - Explicitly launch agent via Task tool
3. **Command Trigger** - Some commands invoke specific agents
4. **Context Recognition** - Agents activate based on conversation context

## Best Practices

### When to Use Multiple Agents

Launch multiple agents in parallel for:
- Comprehensive analysis requiring different expertise
- Large refactoring projects needing various perspectives
- Full-stack implementations requiring specialized knowledge
- Complex troubleshooting across multiple domains

### Agent Coordination

Agents can work together:
1. **Tech Lead** reviews implementation
2. **Refactoring Strategist** improves code quality
3. **Test Coverage Engineer** ensures testing
4. **Technical Writer** documents the solution
5. **Implementation Investigator** validates integration

### Performance Optimization

- Agents use parallel sub-agents for 5-10x speedup
- Each agent focuses on specific domain for efficiency
- Results are synthesized by main orchestrator
- Token usage optimized through focused context

## Configuration

Agents are configured in markdown files with YAML frontmatter:

```yaml
---
type: persona
model: claude-3-5-sonnet-latest
color: purple
description: Expert testing specialist
---
```

Agent behavior and capabilities are defined in the markdown content following the frontmatter.