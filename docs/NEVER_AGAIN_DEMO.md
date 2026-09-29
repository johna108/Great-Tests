# NEVER AGAIN Demo Scenarios

This document explains how to use the Great-Tests repository as a controlled staging environment to demonstrate various failure and recovery scenarios for the NEVER AGAIN application.

## Architecture Overview

The repository provides:
- **CI Workflow** (`.github/workflows/ci.yml`): Standard build and test pipeline
- **Staging Deployment Workflow** (`.github/workflows/staging-deploy.yml`): Deploys specific commits to staging
- **Staging Rollback Workflow** (`.github/workflows/staging-rollback.yml`): Rolls back to known-good commits
- **Health Endpoint** (`GET /health`): Returns `{"status": "healthy"}`
- **Version Endpoint** (`GET /version`): Returns commit SHA and environment

## Controlled Failure Scenarios

### A. CI Failure

**Purpose**: Demonstrate how CI can be made to fail deterministically.

**Trigger**: Create a commit that breaks backend tests.

**Expected CI Result**: 
- Backend tests fail
- Workflow stops at "Run backend tests" step
- Overall workflow status: FAILURE

**NEVER AGAIN Behavior**: 
- Should detect CI failure via `inspect_ci_failure` action
- Should not proceed with deployment

**Recovery**: 
- Fix the breaking commit
- Rerun CI workflow
- CI should pass

**Example Implementation**:
Modify `backend/tests/test_api.py` to make a test fail:
```python
def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}  # This will fail if health returns different value
```

### B. Health Check Regression

**Purpose**: Demonstrate how health check contract can change, causing monitoring to fail.

**Trigger**: Deploy a commit that changes the health check response format.

**Expected CI Result**: 
- CI passes (tests don't check exact format)
- Staging deployment succeeds initially
- Health verification fails during deployment workflow

**NEVER AGAIN Behavior**:
- Should detect health check failure via `verify_staging_health` action
- Should trigger rollback procedure

**Recovery**:
- Rollback to previous known-good SHA using staging-rollback workflow
- Health check should pass again

**Example Implementation**:
Temporarily modify `backend/app/main.py` health endpoint:
```python
@app.get("/health")
async def health():
    # Intentionally break contract for demo
    return {"status": "healthy", "timestamp": "2026-09-29"}  # Extra field breaks contract
```

### C. Deployment Regression

**Purpose**: Demonstrate how a deployment can succeed but application be in degraded state.

**Trigger**: Deploy a commit where container starts but application serves errors.

**Expected CI Result**: 
- CI passes
- Staging deployment succeeds (container starts)
- Health check fails (application not actually working)

**NEVER AGAIN Behavior**:
- Should detect deployment regression via health verification failure
- Should trigger rollback procedure

**Recovery**:
- Rollback to previous known-good SHA
- Application should return to healthy state

**Example Implementation**:
Modify the application to serve errors:
```python
# Add a failing condition in routes or main
@app.get("/health")
async def health():
    # Simulate degraded state
    raise Exception("Database connection failed")  # This will make health check fail
```

### D. Recovery

**Purpose**: Demonstrate how rolling back to known-good SHA restores healthy state.

**Trigger**: Execute staging-rollback workflow with a known-good commit.

**Expected Result**: 
- Container stops and restarts with target SHA
- Health check passes
- Version endpoint returns target SHA

**NEVER AGAIN Behavior**:
- Should verify successful rollback via `verify_staging_health` and checking version endpoint
- Should confirm application is healthy and serving correct version

## GitHub Actions Usage

### Required Secrets/Variables
No special secrets required for basic operation. All workflows use:
- Default GITHUB_TOKEN for checkout
- Public Docker Hub (no authentication needed for public images)

### Workflow Dispatch Examples

#### Deploy Specific Commit
```bash
gh workflow run staging-deploy.yml -f sha=abc123def456
```

#### Rollback to Specific Commit  
```bash
gh workflow run staging-rollback.yml -f target_sha=abc123def456
```

## Verification Endpoints

### Health Check
```bash
curl http://localhost:8000/health
# Returns: {"status": "healthy"}
```

### Version Information
```bash
curl http://localhost:8000/version  
# Returns: {"commit": "abc123def456...", "environment": "staging"}
```

## Staging Mechanism

The staging environment uses Docker containers running locally:
1. Workflow checks out specific commit SHA
2. Builds Docker image tagged with commit SHA
3. Stops any existing staging container
4. Starts new container on port 8000
5. Waits for health check to pass
6. Verifies version endpoint matches deployed SHA
7. Reports success/failure

## Safety Measures

1. **No Production Impact**: All operations are local/docker-based
2. **No Arbitrary Code Execution**: SHA inputs are validated, not executed
3. **No Secret Exposure**: Workflows don't print tokens or secrets
4. **Deterministic**: Same SHA input always produces same result
5. **Self-contained**: No external dependencies beyond Docker Hub

## Manual Testing Instructions

### Normal Operation
1. Push to main branch triggers CI workflow
2. Verify all tests pass
3. Use workflow_dispatch to deploy specific SHA:
   - Go to Actions tab → Staging Deployment → Run workflow
   - Enter commit SHA
   - Monitor for success/failure

### Testing Failure Scenarios
1. Create demo branch with intentional breakage
2. Push demo branch 
3. Trigger staging-deploy with demo branch SHA
4. Observe controlled failure
5. Trigger staging-rollback to known-good SHA
6. Verify recovery

## Files Created/Modified

**Created**:
- `.github/workflows/staging-deploy.yml`
- `.github/workflows/staging-rollback.yml` 
- `docs/NEVER_AGAIN_DEMO.md`

**Modified**:
- `backend/app/main.py`: Added version endpoint and fixed health check to match test expectations