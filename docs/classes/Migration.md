[**@danny270793/myorm v1.0.0**](../README.md)

***

[@danny270793/myorm](../globals.md) / Migration

# Abstract Class: Migration

Defined in: [migrations/migration.ts:28](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/migrations/migration.ts#L28)

Abstract base class for database migrations.
Migrations provide a way to version control database schema changes.

## Example

```typescript
class CreateUsersTable extends Migration {
    getMigrationNumber(): number {
        return 1;
    }

    up(schema: Schema): void {
        schema.createTable('users', (table) => {
            table.column('id', 'number').primaryKey().autoIncrement();
            table.column('name', 'string').notNull();
            table.column('email', 'string').unique();
        });
    }

    down(schema: Schema): void {
        schema.dropTable('users');
    }
}
```

## Constructors

### Constructor

> **new Migration**(): `Migration`

#### Returns

`Migration`

## Methods

### getMigrationNumber()

> `abstract` **getMigrationNumber**(): `number`

Defined in: [migrations/migration.ts:35](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/migrations/migration.ts#L35)

Gets the unique migration number used for ordering.
Migrations are applied in ascending order by this number.

#### Returns

`number`

The migration number

***

### up()

> `abstract` **up**(`schema`): `void`

Defined in: [migrations/migration.ts:42](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/migrations/migration.ts#L42)

Applies the migration (creates tables, columns, etc.).

#### Parameters

##### schema

[`Schema`](Schema.md)

The Schema instance to use for database operations

#### Returns

`void`

***

### down()

> `abstract` **down**(`schema`): `void`

Defined in: [migrations/migration.ts:49](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/migrations/migration.ts#L49)

Reverts the migration (drops tables, columns, etc.).

#### Parameters

##### schema

[`Schema`](Schema.md)

The Schema instance to use for database operations

#### Returns

`void`

***

### wasApplied()

> **wasApplied**(`schema`): `Promise`\<`boolean`\>

Defined in: [migrations/migration.ts:57](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/migrations/migration.ts#L57)

Checks if this migration has already been applied.

#### Parameters

##### schema

[`Schema`](Schema.md)

The Schema instance to check against

#### Returns

`Promise`\<`boolean`\>

A promise resolving to true if the migration was applied, false otherwise

***

### apply()

> **apply**(`schema`): `Promise`\<`void`\>

Defined in: [migrations/migration.ts:67](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/migrations/migration.ts#L67)

Applies the migration and records it in the migrations table.

#### Parameters

##### schema

[`Schema`](Schema.md)

The Schema instance to use

#### Returns

`Promise`\<`void`\>

A promise that resolves when the migration is complete
