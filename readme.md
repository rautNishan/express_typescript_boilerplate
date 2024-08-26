# Express-TypeScript-Boilerplate

Welcome to our Express-TypeScript-Boilerplate, a ready-to-use setup for building web applications with Express, TypeScript, TypeORM, and PostgreSQL. This boilerplate includes built-in user authentication with role-based access control, designed for rapid development and scalability.

# Prerequisites

### Node Js

### PostGresSQL Database

# Getting Started

### Clone

***https://github.com/rautNishan/express_typescript_postgres_boilerplate.git***

### Installation

```bash
$ npm i
```

### Running the App
```bash
$ npm run start:dev
```

### Swagger Docs

#### Admin Docs: http://localhost:3000/admin-docs 

#### User Docs: http://localhost:3000/user-docs

# Migrations

### Run Migration
```bash
$ npm run migration:run
```
### Generate Migration
```bash
$ npm run migration:generate ./src/common/database/migrations/migration-name
```
### Revert Migration
```bash
$ npm run migration:revert
```

### Seed Admin
```bash
$ npm run seed:admin
```

# Todo
### [ ] Task 1: Update swagger documentation
### [ ] Task 2: Proper file naming convention 
### [ ] Task 3: Complete this boilerplate
