[**@danny270793/myorm**](../README.md)

***

[@danny270793/myorm](../README.md) / Schema

# Class: Schema

Defined in: [schema.ts:24](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/schema.ts#L24)

Manages database schema operations including table creation/deletion and migration tracking.

## Example

```typescript
const schema = new Schema();

// Create a table
schema.createTable('users', (table) => {
    table.column('id', 'number').primaryKey().autoIncrement();
    table.column('name', 'string').notNull();
});

// Drop a table
schema.dropTable('users');

// Check if migration was applied
const applied = schema.isMigrationApplied(1);
```

## Constructors

### Constructor

> **new Schema**(): `Schema`

Defined in: [schema.ts:30](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/schema.ts#L30)

Creates a new Schema instance and initializes the migrations tracking table.

#### Returns

`Schema`

## Methods

### createTable()

> **createTable**(`tableName`, `callback`): `void`

Defined in: [schema.ts:64](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/schema.ts#L64)

Creates a new table in the database using a fluent builder API.

#### Parameters

##### tableName

`string`

The name of the table to create

##### callback

(`table`) => `void`

Function that receives a TableBuilder to define the table structure

#### Returns

`void`

#### Example

```typescript
schema.createTable('users', (table) => {
    table.column('id', 'number').primaryKey().autoIncrement();
    table.column('name', 'string').notNull();
    table.column('email', 'string').unique();
});
```

***

### dropTable()

> **dropTable**(`tableName`): `void`

Defined in: [schema.ts:85](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/schema.ts#L85)

Drops a table from the database.

#### Parameters

##### tableName

`string`

The name of the table to drop

#### Returns

`void`

#### Example

```typescript
schema.dropTable('users');
```

***

### isMigrationApplied()

> **isMigrationApplied**(`migrationNumber`): `boolean`

Defined in: [schema.ts:96](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/schema.ts#L96)

Checks if a migration has been applied.

#### Parameters

##### migrationNumber

`number`

The migration number to check

#### Returns

`boolean`

true if the migration was applied, false otherwise

***

### recordMigration()

> **recordMigration**(`migrationNumber`, `migrationName`): `void`

Defined in: [schema.ts:111](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/schema.ts#L111)

Records a migration as applied in the migrations table.

#### Parameters

##### migrationNumber

`number`

The migration number

##### migrationName

`string`

The migration class name

#### Returns

`void`

***

### ~~createTable()~~

> `static` **createTable**(`tableName`, `columns`): `void`

Defined in: [schema.ts:127](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/schema.ts#L127)

**`Internal`**

Creates a table using raw column definitions (legacy method).

#### Parameters

##### tableName

`string`

The name of the table to create

##### columns

`Record`\<`string`, `string`\>

Object mapping column names to SQL type definitions

#### Returns

`void`

#### Deprecated

Use the callback-based createTable method instead

***

### ~~dropTable()~~

> `static` **dropTable**(`tableName`): `void`

Defined in: [schema.ts:144](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/schema.ts#L144)

**`Internal`**

Drops a table (static method).

#### Parameters

##### tableName

`string`

The name of the table to drop

#### Returns

`void`

#### Deprecated

Use the instance method dropTable instead
