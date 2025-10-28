[**@danny270793/myorm v1.0.0**](../README.md)

***

[@danny270793/myorm](../globals.md) / Model

# Abstract Class: Model

Defined in: [models/model.ts:42](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/models/model.ts#L42)

Abstract base class for all database models following the Active Record pattern.
Provides CRUD operations and automatic table name generation.

## Example

```typescript
class User extends Model {
    static readonly tableName = 'users';

    getId(): string | number {
        return this.id.get();
    }

    id: Column = new Column('id', 'number');
    name: Column = new Column('name', 'string');
    email: Column = new Column('email', 'string');
}

// Create
const user = await User.create({ name: 'John', email: 'john@example.com' });

// Read
const found = await User.find('1');
const all = await User.findAll();

// Update
found.name.set('Jane');
await found.save();

// Delete
await found.delete();
```

## Constructors

### Constructor

> **new Model**(): `Model`

#### Returns

`Model`

## Properties

### tableName?

> `protected` `static` `optional` **tableName**: `string`

Defined in: [models/model.ts:46](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/models/model.ts#L46)

Optional explicit table name. If not set, table name is derived from class name.

## Methods

### getTableName()

> `protected` `static` **getTableName**(): `string`

Defined in: [models/model.ts:55](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/models/model.ts#L55)

**`Internal`**

Gets the table name for this model.
If tableName is set explicitly, returns that; otherwise generates from class name.

#### Returns

`string`

The table name

***

### convertFromSQLite()

> `private` `static` **convertFromSQLite**(`value`, `type`): `any`

Defined in: [models/model.ts:74](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/models/model.ts#L74)

**`Internal`**

Converts SQLite values to TypeScript types.

#### Parameters

##### value

`any`

The value from SQLite

##### type

`string`

The target type ('string', 'number', 'boolean', 'date')

#### Returns

`any`

The converted value

***

### create()

> `static` **create**\<`T`\>(`this`, `data`): `Promise`\<`T`\>

Defined in: [models/model.ts:105](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/models/model.ts#L105)

Creates a new record in the database and returns a model instance.

#### Type Parameters

##### T

`T` *extends* `Model`

The model type extending Model

#### Parameters

##### this

() => `T`

##### data

`Record`\<`string`, `any`\>

Object containing column names and values

#### Returns

`Promise`\<`T`\>

A promise resolving to the created model instance

#### Example

```typescript
const user = await User.create({
    name: 'John Doe',
    email: 'john@example.com',
    active: true
});
```

***

### find()

> `static` **find**\<`T`\>(`this`, `id`): `Promise`\<`T`\>

Defined in: [models/model.ts:141](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/models/model.ts#L141)

Finds a single record by its ID.

#### Type Parameters

##### T

`T` *extends* `Model`

The model type extending Model

#### Parameters

##### this

() => `T`

##### id

`string`

The record ID to find

#### Returns

`Promise`\<`T`\>

A promise resolving to the found model instance

#### Throws

If no record is found with the given ID

#### Example

```typescript
const user = await User.find('1');
console.log(user.name.get());
```

***

### findAll()

> `static` **findAll**\<`T`\>(`this`): `Promise`\<`T`[]\>

Defined in: [models/model.ts:190](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/models/model.ts#L190)

Finds all records in the table.

#### Type Parameters

##### T

`T` *extends* `Model`

The model type extending Model

#### Parameters

##### this

() => `T`

#### Returns

`Promise`\<`T`[]\>

A promise resolving to an array of model instances

#### Example

```typescript
const users = await User.findAll();
users.forEach(user => console.log(user.name.get()));
```

***

### getId()

> `abstract` **getId**(): `string` \| `number`

Defined in: [models/model.ts:227](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/models/model.ts#L227)

Gets the ID of this model instance.
Must be implemented by subclasses.

#### Returns

`string` \| `number`

The model ID

***

### save()

> **save**(): `Promise`\<`void`\>

Defined in: [models/model.ts:242](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/models/model.ts#L242)

Saves the current model instance to the database.
If the model has an ID, updates the existing record; otherwise creates a new one.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the save is complete

#### Example

```typescript
const user = await User.find('1');
user.name.set('New Name');
await user.save();
```

***

### delete()

> **delete**(): `Promise`\<`void`\>

Defined in: [models/model.ts:307](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/models/model.ts#L307)

Deletes this model instance from the database.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the deletion is complete

#### Throws

If the model hasn't been saved to the database yet

#### Example

```typescript
const user = await User.find('1');
await user.delete();
```

***

### toData()

> `private` **toData**(): `Record`\<`string`, `any`\>

Defined in: [models/model.ts:330](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/models/model.ts#L330)

**`Internal`**

Converts the model instance to a plain object.

#### Returns

`Record`\<`string`, `any`\>

An object containing all column values
