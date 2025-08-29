---
allowed-tools: Task, Glob, Grep, Read, Edit, MultiEdit, Bash, LS, TodoWrite, Write, WebFetch, BashOutput, KillBash
---
# Refactor Project for AWS Commercial and GovCloud Dual Deployment Support

This command refactors your Terraform, TypeScript, and JavaScript code to enable seamless deployment to both AWS Commercial and AWS GovCloud partitions. It automatically updates hardcoded AWS ARNs, modernizes variable references, and ensures your infrastructure code works across different AWS partitions without manual code changes.

**CRITICAL: Check to see if terraform is installed/available on system path by running: `which terraform`. If not installed, install by running: `brew install tfenv` && `tfenv install 1.13.1` && `tfenv use 1.13.1`

**CRITICAL: Use parallel sub-agent execution throughout this command. Launch 4-6 Task agents simultaneously for discovery, analysis, and implementation phases.**

**Critical: Do not add the AWS partition data source, our terraform runs inside of a container: terraform-deploy that injects a terraform file to make this available.

Always look for opportunities to parallelize work and use subagents where possible.

You should start with gathering context and understanding the instructions/tasks to perform.

Always consider the specific context provided, including any coding standards from CLAUDE.md files, existing architectural patterns in the codebase, and the team's technical constraints provided.

## What This Command Does

This command performs a comprehensive refactoring of your project's infrastructure and application code to support deployment across multiple AWS partitions:

### Terraform Refactoring
- **Dynamic ARN Generation**: Replaces all hardcoded `arn:aws` references with `arn:${data.aws_partition.current.partition}` for automatic partition detection
- **Variable Modernization**: Updates legacy `target_aws_account_id` to modern `deploy_config.aws_account_id` pattern
- **Infrastructure Variables**: Adds essential variables (`infra_aws_region`, `infra_environment`, `is_govcloud`) for partition-aware deployments
- **Remote State Configuration**: Updates terraform remote state to use dynamic regions instead of hardcoded `us-east-1`
- **Module Compatibility**: Upgrades @jupiterone/terraform-modules to version 27.10.53 with built-in GovCloud support

### TypeScript/JavaScript Refactoring
- **Runtime Partition Detection**: Adds AWS SDK imports and functions to detect the current partition at runtime
- **Dynamic ARN Construction**: Replaces hardcoded ARNs with template literals using detected partition
- **Dependency Management**: Automatically installs required AWS SDK packages (`@aws-sdk/util-arn-parser`, `@aws-sdk/client-sts`)

### Docker Configuration
- **Standardized Dockerfile**: Ensures deploy/Dockerfile uses the correct terraform-deploy base image with GovCloud support

The refactoring ensures your code works seamlessly across AWS Commercial (`aws`) and GovCloud (`aws-us-gov`) partitions without requiring manual code changes for each deployment target.

Important: Always exclude loading of any node_modules folder. Do not load any files under the glob pattern: **/node_modules/**

## Execution Strategy

**Phase 1: Parent Discovery Tasks (Launch 4 Task agents simultaneously)**
```
Task 1: Find all deploy/ directories across the codebase
Task 2: Find all *.tf files under deploy/ directories (glob: **/deploy/*.tf)
Task 3: Find all Dockerfile files under deploy/ directories (glob: **/deploy/Dockerfile)
Task 4: Find all TypeScript/JavaScript files with hardcoded ARNs (glob: **/*.{ts,js})
```

**Checkpoint 1**: Validate discovered files and directories before proceeding.

**Phase 2: Child Analysis Tasks (Launch 8 Task agents after Phase 1 completion)**
```
Task 5: Analyze terraform files for remote state configurations (depends on Task 2)
Task 6: Analyze ARN usage patterns in terraform files (depends on Task 2)
Task 7: Analyze existing variable declarations in variables.tf files (depends on Task 2)
Task 8: Check @jupiterone/terraform-modules package versions (depends on Task 1)
Task 9: Compare Dockerfile content vs required specification (depends on Task 3)
Task 10: Identify terraform_remote_state configurations (depends on Task 2)
Task 11: Analyze TypeScript/JavaScript files for hardcoded ARN patterns (depends on Task 4)
Task 12: Check AWS SDK dependencies in package.json files for TS/JS projects (depends on Task 4)
```

**Checkpoint 2**: Validate analysis results and confirm refactoring scope.

**Phase 3: Implementation Tasks (Launch 7 Task agents after Phase 2 completion)**
```
Task 13: Execute ARN pattern replacements across terraform files
Task 14: Update Dockerfile content to required specification
Task 15: Add missing terraform variable declarations
Task 16: Update terraform remote state region configurations
Task 17: Execute npm package installations for terraform modules (serialized per directory)
Task 18: Update TypeScript/JavaScript files with dynamic partition detection
Task 19: Install AWS SDK dependencies for TypeScript/JavaScript projects
```

**Checkpoint 3**: Validate all modifications and run terraform syntax checks.

## Instructions

### Phase 1: Parent Discovery Tasks

First, launch parent discovery tasks to identify all relevant files and directories. Child analysis tasks depend on these results and cannot run until parent tasks complete.

**Parent Task Dependencies:**
- All child analysis tasks require file discovery results from Phase 1
- Implementation tasks require analysis results from Phase 2
- Each phase must complete before the next phase begins

### Phase 2: Child Analysis Tasks

After Phase 1 completes, launch child analysis tasks that examine the discovered files. These tasks run in parallel but all depend on the parent discovery results.

### Ensure project does not use hard coded aws arns

#### Terraform Files

**Implementation with Task Agent 1:**

Filter: For every *.tf file under deploy/*.tf or any glob match: **/deploy/*.tf

Execute the following replacements:

Criteria 1:
```
Find: "arn:aws"
Replace: "arn:${data.aws_partition.current.partition}"
```

Criteria 2:
```
Find: "${var.deploy_config.arn_prefix}"
Replace: "arn:${data.aws_partition.current.partition}"
```

Criteria 3:
```
Find: "${var.target_aws_account_id}"
Replace: "${var.deploy_config.aws_account_id}"
```

#### TypeScript/JavaScript Files

**Implementation with Task Agent 6:**

Filter: For every *.ts and *.js file containing "arn:aws" (glob: **/*.{ts,js})

For each file containing hardcoded ARNs:

1. **Add partition detection imports** at the top of the file:
```typescript
import { parseArn } from "@aws-sdk/util-arn-parser";
import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";
```

2. **Add partition detection function**:
```typescript
async function getAwsPartition(): Promise<string> {
  const client = new STSClient({});
  const response = await client.send(new GetCallerIdentityCommand({}));
  const arnComponents = parseArn(response.Arn!);
  return arnComponents.partition; // "aws" or "aws-us-gov"
}
```

3. **Replace hardcoded ARNs** with dynamic partition:
```typescript
// Replace patterns like:
// "arn:aws:service:region:account:resource"
// With:
// `arn:${partition}:service:region:account:resource`
```

4. **Update function calls** to use the partition:
```typescript
// Before:
const arn = "arn:aws:iam::123456789012:role/MyRole";

// After:
const partition = await getAwsPartition();
const arn = `arn:${partition}:iam::123456789012:role/MyRole`;
```

**Implementation with Task Agent 7:**

For each TypeScript/JavaScript file that was modified:

1. **Traverse up directory tree** to find the nearest package.json
2. **Check for required dependencies**:
   - `@aws-sdk/util-arn-parser@latest`
   - `@aws-sdk/client-sts@latest`
3. **Install missing dependencies** by running in the package.json directory:
```bash
npm install @aws-sdk/util-arn-parser@latest @aws-sdk/client-sts@latest
```

### Ensure project uses an up to date deploy/Dockerfile

**Implementation with Task Agent 2:**

The following contents should be present for the file at path: deploy/Dockerfile or any glob match: **/deploy/Dockerfile:

```dockerfile
ARG AWS_ACCOUNT_ID=081157560428
ARG AWS_REGION=us-east-1
ARG TERRAFORM_DEPLOY_VERSION=4

FROM ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/terraform-deploy:${TERRAFORM_DEPLOY_VERSION}

COPY . .
```

### Ensure project uses up to date @jupiterone/terraform-modules

**Implementation with Task Agent 5:**

For each deploy directory matching the glob pattern: **/deploy/, cd to the directory and run: 
```bash
npm i @jupiterone/terraform-modules@27.10.53
```

**IMPORTANT**: Execute npm installations sequentially per directory to avoid conflicts. Use resource isolation.

### Ensure needed terraform input variables are declared

**Implementation with Task Agent 3:**

For every deploy directory match using glob pattern: **/deploy/

Ensure that the following terraform variables are declared in variables.tf:

```hcl
variable "infra_aws_region" {
  type        = string
  default     = "us-east-1"
  description = "AWS region for infrastructure deployment"
}

variable "infra_environment" {
  type        = string
  default     = "jupiterone-infra"
  description = "Infrastructure environment identifier"
}

variable "is_govcloud" {
  type        = bool
  default     = false
  description = "Flag to indicate if deployment is in AWS GovCloud"
}
```

### Ensure project uses correct terraform-remote-state references

**Implementation with Task Agent 4:**

Filter: For every *.tf file under deploy/*.tf or any glob match: **/deploy/*.tf

Update any file that matches the following pattern:

Find:
```hcl
data "terraform_remote_state" "(*.*)" {
  backend = "s3"
  config = {
    bucket = "jupiterone-infra-state"
    key    = "${var.deploy_config.environment}/provision-environment/terraform.tfstate"
    region = "us-east-1"
  }
}
```

Replace:
```hcl
data "terraform_remote_state" "(*.*)" {
  backend = "s3"
  config = {
    bucket = "jupiterone-infra-state"
    key    = "${var.deploy_config.environment}/provision-environment/terraform.tfstate"
    region = "${var.infra_aws_region}"
  }
}
```

## Checkpointing and Validation

**Checkpoint 1 - After Discovery:**
- Log all discovered files and directories
- Verify expected files are found
- Identify any missing expected patterns

**Checkpoint 2 - After Analysis:**
- Confirm scope of changes required
- Validate regex patterns on sample data
- Check for edge cases or conflicts

**Checkpoint 3 - After Implementation:**
- Run `terraform fmt -recursive` on all modified .tf files
- Run `terraform fmt -check=true` on all deploy directories
- Verify the changes by running from the project's root directory: `npm run build && npm run plan`
- Verify npm package installations succeeded
- Generate summary report of all changes made

## Deterministic Results

To ensure deterministic outcomes with parent-child task dependencies:

1. **Sequential Phase Execution**: Each phase must complete before the next begins
2. **Parent-Child Dependencies**: Child tasks wait for parent task results
3. **Resource Isolation**: Each Task agent operates on distinct file sets within its phase
4. **Ordered Operations**: npm installations are serialized per directory
5. **Pattern Validation**: Test all regex patterns before bulk replacement
6. **Atomic Operations**: Use MultiEdit for file modifications when possible
7. **Phase Verification**: Validate results at each checkpoint before proceeding
8. **Dependency Tracking**: Ensure child tasks receive complete parent results

## Error Handling

- If any Task agent encounters errors, iterate on the task up to 5 times. If it continues to fail past 5 attempts, halt execution and report the error.
- Provide rollback instructions if modifications fail validation
- Log all operations for debugging and audit purposes
- Test regex patterns on sample data before bulk operations

## Success Criteria

1. All hardcoded `arn:aws` references in Terraform files replaced with dynamic partitions
2. All hardcoded `arn:aws` references in TypeScript/JavaScript files replaced with dynamic partition detection
3. All legacy `target_aws_account_id` references updated
4. All Dockerfile content standardized to specification
5. All required infrastructure variables declared
6. All remote state configurations use dynamic regions
7. All npm packages updated to required version
8. All AWS SDK dependencies installed for TypeScript/JavaScript projects
9. All terraform configurations validate successfully
10. All TypeScript/JavaScript files compile without errors