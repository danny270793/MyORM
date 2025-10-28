[**@danny270793/myorm**](../README.md)

***

[@danny270793/myorm](../README.md) / Migration

# Abstract Class: Migration

Defined in: [migrations/migration.ts:28](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/migrations/migration.ts#L28)

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

### apply()

> **apply**(`schema`): `Promise`\<`void`\>

Defined in: [migrations/migration.ts:67](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/migrations/migration.ts#L67)

Applies the migration and records it in the migrations table.

#### Parameters

##### schema

[`Schema`](Schema.md)

The Schema instance to use

#### Returns

`Promise`\<`void`\>

A promise that resolves when the migration is complete

***

### down()

> `abstract` **down**(`schema`): `void`

Defined in: [migrations/migration.ts:49](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/migrations/migration.ts#L49)

Reverts the migration (drops tables, columns, etc.).

#### Parameters

##### schema

[`Schema`](Schema.md)

The Schema instance to use for database operations

#### Returns

`void`

***

### getMigrationNumber()

> `abstract` **getMigrationNumber**(): `number`

Defined in: [migrations/migration.ts:35](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/migrations/migration.ts#L35)

Gets the unique migration number used for ordering.
Migrations are applied in ascending order by this number.

#### Returns

`number`

The migration number

***

### up()

> `abstract` **up**(`schema`): `void`

Defined in: [migrations/migration.ts:42](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/migrations/migration.ts#L42)

Applies the migration (creates tables, columns, etc.).

#### Parameters

##### schema

[`Schema`](Schema.md)

The Schema instance to use for database operations

#### Returns

`void`

***

### wasApplied()

> **wasApplied**(`schema`): `Promise`\<`boolean`\>

Defined in: [migrations/migration.ts:57](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/migrations/migration.ts#L57)

Checks if this migration has already been applied.

#### Parameters

##### schema

[`Schema`](Schema.md)

The Schema instance to check against

#### Returns

`Promise`\<`boolean`\>

A promise resolving to true if the migration was applied, false otherwise
