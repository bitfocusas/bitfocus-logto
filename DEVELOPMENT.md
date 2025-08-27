# Logto OSS - Development Setup Guide

<!-- Current Hash: 3f5533080365886d8e0f38c0cc19b8e8ff3a3a14 -->

This guide will help you set up the Logto OSS (Open Source Software) development environment.
This is based initially on Logto's README.

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** `^22.14.0` (as specified in package.json engines)
- **pnpm** `^9.0.0 || ^10.0.0` (required package manager)
- **Docker** (for PostgreSQL database)

## Quick Start

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone https://github.com/logto-io/logto.git
cd logto

# Install dependencies
pnpm install

# Build workspace dependencies (required for development)
pnpm prepack
```

### 2. Set Up Database with Docker

The application uses PostgreSQL as the database. Docker is used to run only the database service:

```bash
# Start PostgreSQL database
docker-compose up -d postgres
```

This will start a PostgreSQL 17 instance with the following configuration:

- **Host**: `localhost:5432`
- **Database**: `logto`
- **Username**: `postgres`
- **Password**: `p0stgr3s`

### 3. Configure Environment Variables

Create a `.env` file in the project root with the following content:

```env
DB_URL=postgresql://postgres:p0stgr3s@localhost:5432/logto
```

### 4. Seed the Database

Run the database seeding command to create tables and initial data:

```bash
# Seed with SWE (Skip When Exists) option
pnpm cli db seed --swe
```

The `--swe` flag skips seeding if the Logto configs table already exists, making it safe to run multiple times.

### 5. Start Development Servers

```bash
# Start both core backend and admin console
pnpm dev
```

This command will:

- Start the core backend service on `http://localhost:3001`
- Start the admin console on `http://localhost:3002`
- Watch for file changes and restart services automatically

## Access Points

- **Admin Console**: `http://localhost:3001` (Redirects to console. Default can be changed in env)
- **API Documentation**: `http://localhost:3001/api/swagger.json` (Default can be changed in env)
- **Core API**: `http://localhost:3001/api` (Default can be changed in env)

## Additional Setup Options

### Database Alterations

If you're upgrading from an older version or encounter "Found undeployed database alterations" errors:

```bash
# Deploy database alterations
pnpm alteration deploy
```

### Add Connectors (Optional)

```bash
# Link all local connectors
pnpm cli connector link -p .

# Or install specific connectors from NPM
pnpm cli connector add <connector-name> -p .
```

### Test Data (Optional)

For development/testing purposes, you can seed additional test data:

```bash
# Seed with test data
pnpm cli db seed --swe --test
```

This creates test users with management roles for easier development.

## Development Workflow

1. **Make Changes**: Edit files in `packages/console` (Admin Console) or `packages/core` (Backend)
2. **Auto Reload**: The dev server watches for changes and restarts automatically
3. **Database Changes**: Use `pnpm alteration` commands for schema changes
4. **Testing**: Run `pnpm test` for unit tests

## Troubleshooting

### Common Issues

1. **Port Already in Use**: Ensure ports 3001 and 3002 are available
2. **Database Connection**: Verify PostgreSQL is running and credentials are correct
3. **Node Version**: Ensure you're using Node.js `^22.14.0`
4. **Package Manager**: Use pnpm, not npm or yarn

### Reset Database

If you need to start fresh:

```bash
# Stop and remove the database container
docker-compose down

# Start fresh database
docker-compose up -d postgres

# Re-seed the database
pnpm cli db seed --swe
```

## Project Structure

- `packages/core/` - Backend API service
- `packages/console/` - Admin Console frontend
- `packages/cli/` - Command-line interface
- `packages/connectors/` - Third-party service connectors
- `packages/schemas/` - Database schemas and migrations

## Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for detailed contribution guidelines.

## License

This project is licensed under the MPL-2.0 License.
