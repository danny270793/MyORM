# MyORM Examples

This directory contains comprehensive examples demonstrating various features of MyORM.

## Running Examples

Each example can be run individually:

```bash
# Build the project first
npm run build

# Run a specific example
node dist/examples/1-models-and-crud.js
node dist/examples/2-migrations.js
node dist/examples/3-query-builders.js
node dist/examples/4-type-conversions.js
```

Or run all examples:

```bash
npm run example
```

## Examples Overview

### 1. Models and CRUD Operations (`1-models-and-crud.ts`)

**What you'll learn:**
- How to define a Model class
- Creating records (INSERT)
- Reading records (SELECT) - findAll() and find()
- Updating records (UPDATE)
- Deleting records (DELETE)
- Working with different column types

**Key concepts:**
- Active Record pattern
- Model lifecycle
- Column get/set methods

---

### 2. Database Migrations (`2-migrations.ts`)

**What you'll learn:**
- Creating migration classes
- Migration ordering and numbering
- Using TableBuilder API
- Adding table constraints (primary key, unique, not null)
- Setting default values
- Checking migration status
- Running migrations

**Key concepts:**
- Schema versioning
- Database evolution
- Migration tracking
- Rollback capability (down method)

---

### 3. Query Builders (`3-query-builders.ts`)

**What you'll learn:**
- Using Select, Insert, Update, Delete query builders
- Building WHERE clauses
- Using comparison operators (=, >, <, LIKE)
- Working with prepared statements
- Direct database access

**Key concepts:**
- SQL query generation
- Parameterized queries (SQL injection prevention)
- Fluent API for building queries
- PreparedStatement interface

---

### 4. Type Conversions (`4-type-conversions.ts`)

**What you'll learn:**
- How TypeScript types map to SQLite types
- Automatic type conversion
- Working with dates
- Boolean storage and retrieval
- Handling null values
- Number precision (integers and floats)

**Key concepts:**
- Type safety
- Data integrity
- SQLite type system
- Type conversion rules

---

### Basic Usage (`basic-usage.ts`)

The original example demonstrating a complete workflow:
- Setting up migrations
- Creating a User model
- Complete CRUD cycle in one flow

---

## Type Mappings

| TypeScript | SQLite  | Notes                               |
| ---------- | ------- | ----------------------------------- |
| `string`   | TEXT    | UTF-8 text                          |
| `number`   | INTEGER | Integers and floats                 |
| `boolean`  | INTEGER | 0 = false, 1 = true                 |
| `Date`     | TEXT    | Stored as ISO 8601 string           |
| `null`     | NULL    | Represents absence of value         |

## Best Practices

1. **Always define explicit table names**
   ```typescript
   static readonly tableName = 'users';
   ```

2. **Use migrations for schema changes**
   ```typescript
   class CreateUsersTable extends Migration {
       getMigrationNumber(): number {
           return 1; // Incremental numbers
       }
   }
   ```

3. **Leverage the fluent API for readability**
   ```typescript
   table.column('email', 'string')
       .unique()
       .notNull();
   ```

4. **Handle dates properly**
   ```typescript
   createdAt: Column = new Column('createdAt', 'date');
   // Automatically converts between Date objects and ISO strings
   ```

5. **Use WHERE clauses for safety**
   ```typescript
   Update.table('users')
       .set({ active: false })
       .where({ field: 'id', operator: '=', value: userId });
   ```

## Common Patterns

### Creating a Model

```typescript
import { Model, Column } from '@danny270793/myorm';

class MyModel extends Model {
    static readonly tableName = 'my_table';

    getId(): string | number {
        return this.id.get();
    }

    id: Column = new Column('id', 'number');
    name: Column = new Column('name', 'string');
}
```

### Creating a Migration

```typescript
import { Migration, Schema, TableBuilder } from '@danny270793/myorm';

class CreateMyTable extends Migration {
    getMigrationNumber(): number {
        return 1;
    }

    up(schema: Schema): void {
        schema.createTable('my_table', (table: TableBuilder) => {
            table.column('id', 'number').primaryKey().autoIncrement();
            table.column('name', 'string').notNull();
        });
    }

    down(schema: Schema): void {
        schema.dropTable('my_table');
    }
}
```

### CRUD Operations

```typescript
// Create
const record = await MyModel.create({ name: 'Test' });

// Read
const found = await MyModel.find('1');
const all = await MyModel.findAll();

// Update
found.name.set('Updated');
await found.save();

// Delete
await found.delete();
```

## Troubleshooting

### "Table not found" error
Make sure you've run migrations before accessing the table:
```typescript
await Migrations.setup();
```

### Type conversion issues
Check that your column types match the data you're storing:
```typescript
new Column('age', 'number')  // Not 'string'!
```

### Migration not applying
Ensure migration numbers are unique and sequential:
```typescript
getMigrationNumber(): number {
    return 1; // Must be unique
}
```

## Next Steps

- Check out the [main README](../README.md) for API documentation
- Explore the [TypeDoc documentation](../docs/index.html)
- Look at the [test files](../src/__tests__/) for more usage examples
- Read the source code for advanced patterns

