---
allowed-tools: TodoWrite, TodoRead, Read, Write, Task, Grep, Glob, Edit, MultiEdit, Task, Glob, Grep, Bash
---
# Refactor Terraform

Your mission is to refactor terraform for a given repository to support deploying Terraform to Commercial/GovCloud AWS accounts.

Always look for opportunities to parallelize work and use subagents where possible.

You should start with gathering context and understanding the instructions/tasks to perform.

Always consider the specific context provided, including any coding standards from CLAUDE.md files, existing architectural patterns in the codebase, and the team's technical constraints.

## Context

  This command modernizes Terraform configurations to support both AWS Commercial and GovCloud deployments. Key changes include:

  - **ARN Standardization**: Replaces hardcoded `arn:aws` with dynamic partition references
  - **Variable Updates**: Migrates from legacy `target_aws_account_id` to `deploy_config.aws_account_id`
  - **Infrastructure Variables**: Adds required variables for region/environment configuration
  - **Module Updates**: Upgrades to terraform-modules@27.10.52 for GovCloud compatibility
  - **Remote State**: Updates S3 backend configuration to use dynamic regions

  The refactoring ensures deployments work across AWS partitions (commercial: `aws`, govcloud: `aws-us-gov`) without code changes.

## Instructions

### Ensuring project does not use hard coded aws arns

Find and replace according to the following patterns: 

Filter: For every *.tf file under deploy/*.tf or any glob match: /**/*/deploy/*.tf

Criteria 1:

  Find: "arn:aws"
  Replace: "aws:${data.aws_partition.current.partition}"

Criteria 2:

  Find: "${var.deploy_config.arn_prefix}"
  Replace: "aws:${data.aws_partition.current.partition}"

Criteria 3:

  Find: "${var.target_aws_account_id}"
  Replace: "${var.deploy_config.aws_account_id}"

### Ensuring project uses an up to date deploy/Dockerfile

The following contents should be be present for the file at path: deploy/Dockerfile or any glob match: /**/*/deploy/Dockerfile:

  ARG AWS_ACCOUNT_ID=081157560428
  ARG AWS_REGION=us-east-1
  ARG TERRAFORM_DEPLOY_VERSION=4

  FROM ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/terraform-deploy:${TERRAFORM_DEPLOY_VERSION}

  COPY . .
  
### Ensuring project uses up to date @jupiterone/terraform-modules

For each deploy directory matching the glob pattern: /**/*/deploy, cd to the directory and run: npm i @jupiterone/terraform-modules@27.10.52

### Ensuring needed terraform input variables are declared

For every deploy directory match using glob pattern: /**/*/deploy/*

Ensure that the following terraform variables are declared in variables.tf:

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

### Ensuring project uses correct terraform-remote-state references

Filter: For every *.tf file under deploy/*.tf or any glob match: /**/*/deploy/*.tf

Update any file that matches the following pattern:

Find:

  data "terraform_remote_state" "(*.)" {
    backend = "s3"
    config = {
      bucket = "jupiterone-infra-state"
      key    = "${var.deploy_config.environment}/provision-environment/terraform.tfstate"
      region = "us-east-1"
    }
  }
  
Replace:

  data "terraform_remote_state" "(*.)" {
    backend = "s3"
    config = {
      bucket = "jupiterone-infra-state"
      key    = "${var.deploy_config.environment}/provision-environment/terraform.tfstate"
      region = "${var.infra_aws_region}"
    }
  }


