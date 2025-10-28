# MyORM

[![npm version](https://img.shields.io/npm/v/@danny270793/myorm.svg)](https://www.npmjs.com/package/@danny270793/myorm)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/tests-114%20passing-success.svg)](./src/__tests__)

A lightweight, type-safe ORM for SQLite with TypeScript support, featuring migrations, query builders, and an Active Record pattern.

## Features

- 🔒 **Type-safe** - Full TypeScript support with type definitions
- 🗄️ **SQLite** - Built on better-sqlite3 for fast, synchronous operations
- 🔄 **Migrations** - Schema versioning and migration tracking with up/down support
- 🎯 **Active Record Pattern** - Intuitive model-based data access
- 🔨 **Query Builders** - Fluent API for building complex queries
- 🏗️ **Schema Builder** - Programmatic table creation with constraints
- 🔄 **Type Conversions** - Automatic TypeScript ↔ SQLite type mapping
- ✅ **Well-tested** - 114 tests with comprehensive coverage
- 📚 **API Documentation** - Complete TypeDoc-generated documentation
- 📦 **Minimal dependencies** - Only requires better-sqlite3
- 🎨 **Developer-friendly** - Extensive examples and guides

## Installation

```bash
npm install @danny270793/myorm better-sqlite3
npm install -D @types/better-sqlite3
```

## Quick Start

### 1. Define a Model

```typescript
import { Model, Column } from '@danny270793/myorm';

class User extends Model {
    static readonly tableName = 'users';

    getId(): string | number {
        return this.id.get();
    }

    id: Column = new Column('id', 'number');
    name: Column = new Column('name', 'string');
    email: Column = new Column('email', 'string');
    active: Column = new Column('active', 'boolean');
}
```

### 2. Create a Migration

```typescript
import { Migration, Schema, TableBuilder } from '@danny270793/myorm';

class CreateUsersTable extends Migration {
    getMigrationNumber(): number {
        return 1;
    }

    up(schema: Schema): void {
        schema.createTable('users', (table: TableBuilder) => {
            table.column('id', 'number').primaryKey().autoIncrement();
            table.column('name', 'string').notNull();
            table.column('email', 'string').unique();
            table.column('active', 'boolean').default(true);
        });
    }

    down(schema: Schema): void {
        schema.dropTable('users');
    }
}
```

### 3. Run Migrations

```typescript
import { Migrations } from '@danny270793/myorm';

await Migrations.setup();
```

### 4. Use the Model

```typescript
// Create
const user = await User.create({
    name: 'John Doe',
    email: 'john@example.com',
    active: true,
});

// Read
const foundUser = await User.find('1');
const allUsers = await User.findAll();

// Update
foundUser.name.set('Jane Doe');
await foundUser.save();

// Delete
await foundUser.delete();
```

## API Reference

### Model

Base class for all models. Provides CRUD operations.

```typescript
abstract class Model {
    static async create<T>(data: Record<string, any>): Promise<T>;
    static async find<T>(id: string): Promise<T>;
    static async findAll<T>(): Promise<T[]>;
    async save(): Promise<void>;
    async delete(): Promise<void>;
}
```

### Column

Represents a database column with type-safe getters and setters.

```typescript
class Column {
    constructor(name: string, type: string);
    get(): any;
    set(value: any): void;
    getName(): string;
    getType(): string;
}
```

### Migration

Base class for database migrations.

```typescript
abstract class Migration {
    abstract getMigrationNumber(): number;
    abstract up(schema: Schema): void;
    abstract down(schema: Schema): void;
    async wasApplied(schema: Schema): Promise<boolean>;
    async apply(schema: Schema): Promise<void>;
}
```

### Schema

Manages database schema operations and migration tracking.

```typescript
class Schema {
    createTable(tableName: string, callback: (table: TableBuilder) => void): void;
    dropTable(tableName: string): void;
    isMigrationApplied(migrationNumber: number): boolean;
    recordMigration(migrationNumber: number): void;
}
```

### TableBuilder

Fluent API for building table schemas.

```typescript
class TableBuilder {
    column(name: string, type: string): ColumnBuilder;
    // Generates CREATE TABLE SQL
}

class ColumnBuilder {
    primaryKey(): this;
    autoIncrement(): this;
    unique(): this;
    notNull(): this;
    nullable(): this;
    default(value: any): this;
}
```

### Query Builders

Build SQL queries programmatically.

```typescript
// SELECT
const query = Select.from('users')
    .where({ field: 'active', operator: '=', value: true })
    .orderBy('name', 'asc')
    .limit(10);

// INSERT
const query = Insert.into('users').rows({
    name: 'John',
    email: 'john@example.com',
});

// UPDATE
const query = Update.table('users')
    .set({ name: 'Jane' })
    .where({ field: 'id', operator: '=', value: 1 });

// DELETE
const query = Delete.from('users').where({
    field: 'id',
    operator: '=',
    value: 1,
});
```

## Advanced Features

### Custom Table Names

By default, MyORM generates table names from class names. You can override this:

```typescript
class User extends Model {
    static readonly tableName = 'users'; // Explicit table name
}
```

### Query Builder Features

- Complex WHERE clauses with multiple operators (`=`, `!=`, `>`, `<`, `>=`, `<=`, `LIKE`)
- ORDER BY with ASC/DESC
- LIMIT and OFFSET for pagination
- WHERE IN for multiple values

### Migration Management

Migrations are tracked in a `migrations` table, ensuring they run only once:

```typescript
// Check if migration was applied
const applied = await migration.wasApplied(schema);

// Apply migration
await migration.apply(schema);
```

### Type Safety

All models and queries are fully typed, providing IDE autocomplete and compile-time type checking.

## Type Mappings

MyORM automatically maps between TypeScript and SQLite types:

| TypeScript | SQLite  | Notes                     |
| ---------- | ------- | ------------------------- |
| `string`   | TEXT    |                           |
| `number`   | INTEGER |                           |
| `boolean`  | INTEGER | 0 = false, 1 = true       |
| `date`     | TEXT    | Stored as ISO 8601 string |

## Examples

See the `examples/` directory for complete working examples:

- **`1-models-and-crud.ts`** - Model definition and basic CRUD operations
- **`2-migrations.ts`** - Database migrations with up/down functionality
- **`3-query-builders.ts`** - Advanced query building with conditions and joins
- **`4-type-conversions.ts`** - TypeScript to SQLite type conversion examples
- **`5-basic-usage.ts`** - Complete application example with all features

Run the examples:

```bash
# Run the main example
npm run example

# Run specific examples
npm run build
node dist/examples/1-models-and-crud.js
node dist/examples/2-migrations.js
node dist/examples/3-query-builders.js
node dist/examples/4-type-conversions.js
```

For more details, see the [Examples README](./examples/README.md).

## Testing

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Building

```bash
# Build TypeScript to JavaScript
npm run build

# Format code with Prettier
npm run format
```

## Documentation

Generate API documentation:

```bash
npm run docs
```

This generates markdown documentation in the `docs/` directory using TypeDoc.

View the online documentation: [API Documentation](./docs/README.md)

## Project Structure

```
MyORM/
├── src/
│   ├── index.ts                    # Main entry point (barrel file)
│   └── libraries/
│       ├── basics/                 # Query builders (Select, Insert, Update, Delete)
│       ├── models/                 # Model and Column classes
│       ├── migrations/             # Migration and TableBuilder classes
│       ├── schema.ts               # Schema management
│       ├── database.ts             # DatabaseManager singleton
│       └── logger.ts               # Logging utility
├── examples/                       # Example applications
├── src/__tests__/                  # Test suite
└── docs/                          # Generated API documentation
```

## Author

**Danny Vaca**
- Email: danny270793@gmail.com
- Website: [https://danny270793.github.io](https://danny270793.github.io/#/)
- GitHub: [@danny270793](https://github.com/danny270793)

## Repository

- **GitHub**: [https://github.com/danny270793/myorm](https://github.com/danny270793/myorm)
- **Issues**: [https://github.com/danny270793/layout/issues](https://github.com/danny270793/layout/issues)
- **NPM**: [@danny270793/myorm](https://www.npmjs.com/package/@danny270793/myorm)

## License

MIT License - see [LICENSE](./LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run tests: `npm test`
4. Build: `npm run build`
5. Format code: `npm run format`

