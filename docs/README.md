**@danny270793/myorm v1.0.0**

***

# MyORM

A lightweight, type-safe ORM for SQLite with TypeScript support, featuring migrations, query builders, and an Active Record pattern.

## Features

- 🔒 **Type-safe** - Full TypeScript support with type definitions
- 🗄️ **SQLite** - Built on better-sqlite3 for fast, synchronous operations
- 🔄 **Migrations** - Schema versioning and migration tracking
- 🎯 **Active Record Pattern** - Intuitive model-based data access
- 🔨 **Query Builders** - Fluent API for building queries
- ✅ **Well-tested** - 114 tests with comprehensive coverage
- 📦 **Zero dependencies** - Only requires better-sqlite3

## Installation

```bash
npm install myorm better-sqlite3
npm install -D @types/better-sqlite3
```

## Quick Start

### 1. Define a Model

```typescript
import { Model, Column } from 'myorm';

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
import { Migration, Schema, TableBuilder } from 'myorm';

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
import { Migrations } from 'myorm';

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

- `basic-usage.ts` - Full CRUD operations example

Run the example:

```bash
npm run example
```

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
npm run build
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
