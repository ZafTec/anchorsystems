# Testing Guide

This project has two types of tests: **Unit Tests** (with mocked database) and **Integration Tests** (with real PostgreSQL).

## Quick Start

### Run All Tests (Unit + Integration)
```bash
npm test
```

### Run Only Unit Tests (Fast, No Database Required)
```bash
npm run test:unit
```

### Run Only Integration Tests (Requires Database)
```bash
# Start the test database
npm run test:db:up

# Set the database URL
export DATABASE_URL='Host=localhost;Port=5433;Database=anchorsystems_test;Username=test;Password=test'

# Run integration tests
npm run test:integration

# Stop the test database when done
npm run test:db:down
```

## Test Types

### 1. Unit Tests (Mocked Database)
- **Location**: `**/__tests__/*.test.ts(x)` (excluding `*.integration.test.ts`)
- **Purpose**: Fast tests that mock external dependencies
- **No database required**
- **19 tests** covering components and API logic

Example:
```bash
npm run test:unit
```

### 2. Integration Tests (Real PostgreSQL)
- **Location**: `**/__tests__/*.integration.test.ts`
- **Purpose**: Test actual database interactions
- **Requires PostgreSQL database**
- **Automatically skipped if `DATABASE_URL` is not set**

Example:
```bash
npm run test:db:up
export DATABASE_URL='Host=localhost;Port=5433;Database=anchorsystems_test;Username=test;Password=test'
npm run test:integration
```

## Local Development with Docker

### Start Test Database
```bash
npm run test:db:up
```

This starts a PostgreSQL 16 container with:
- **Host**: localhost
- **Port**: 5433 (to avoid conflicts)
- **Database**: anchorsystems_test
- **User**: test
- **Password**: test

### View Database Logs
```bash
npm run test:db:logs
```

### Stop Test Database
```bash
npm run test:db:down
```

### Connect to Test Database (for debugging)
```bash
docker exec -it anchorsystems-test-db psql -U test -d anchorsystems_test
```

## CI/CD (GitHub Actions)

On every pull request:
1. **PostgreSQL service** automatically starts
2. **Database schema** is created
3. **All tests run** (unit + integration)
4. **Build verification** ensures production build works

The GitHub Actions workflow uses the same PostgreSQL 16 image and automatically sets up the database.

## Test Coverage

View coverage report:
```bash
npm run test:coverage
```

Coverage reports are also uploaded to Codecov on PRs.

## Writing New Tests

### Unit Test Example
```typescript
// src/components/__tests__/MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Integration Test Example
```typescript
// src/app/api/myroute/__tests__/route.integration.test.ts
import { GET } from '../route';
import { query } from '@/lib/db';

const runIntegrationTests = process.env.DATABASE_URL !== undefined;

describe('My API - Integration', () => {
  if (!runIntegrationTests) {
    it.skip('Skipping - DATABASE_URL not set', () => {});
    return;
  }

  it('should interact with database', async () => {
    // Your test here
  });
});
```

## Troubleshooting

### Integration tests are skipped
- Make sure `DATABASE_URL` environment variable is set
- Make sure PostgreSQL is running: `npm run test:db:up`

### Port already in use
- Check if you have PostgreSQL already running on port 5433
- Stop the test database: `npm run test:db:down`
- Change the port in `docker-compose.test.yml`

### Database connection errors
- Verify the database is healthy: `docker ps`
- Check logs: `npm run test:db:logs`
- Restart the database: `npm run test:db:down && npm run test:db:up`

## Test Database Schema

The test database includes:
- `contact_submissions` table
- Indexes on `email` and `created_at`
- Automatic timestamps
- Serial ID generation

Schema is automatically created via:
- Docker: `scripts/init-test-db.sql`
- CI: GitHub Actions workflow step
