[**@danny270793/myorm**](../README.md)

***

[@danny270793/myorm](../README.md) / Column

# Class: Column

Defined in: [models/column.ts:12](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/models/column.ts#L12)

Represents a database column with type information and value storage.
Used by Model instances to store and retrieve column values with type safety.

## Example

```typescript
const nameColumn = new Column('name', 'string');
nameColumn.set('John Doe');
console.log(nameColumn.get()); // 'John Doe'
```

## Constructors

### Constructor

> **new Column**(`name`, `type`): `Column`

Defined in: [models/column.ts:23](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/models/column.ts#L23)

Creates a new Column instance.

#### Parameters

##### name

`string`

The column name in the database

##### type

`string`

The column type ('string', 'number', 'boolean', 'date')

#### Returns

`Column`

## Methods

### get()

> **get**(): `any`

Defined in: [models/column.ts:42](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/models/column.ts#L42)

Gets the current column value.

#### Returns

`any`

The stored column value

***

### getName()

> **getName**(): `string`

Defined in: [models/column.ts:51](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/models/column.ts#L51)

Gets the column name.

#### Returns

`string`

The database column name

***

### getType()

> **getType**(): `string`

Defined in: [models/column.ts:60](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/models/column.ts#L60)

Gets the column type.

#### Returns

`string`

The column type ('string', 'number', 'boolean', 'date')

***

### set()

> **set**(`value`): `void`

Defined in: [models/column.ts:33](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/models/column.ts#L33)

Sets the column value.

#### Parameters

##### value

`any`

The value to store in this column

#### Returns

`void`
