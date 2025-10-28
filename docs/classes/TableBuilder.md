[**@danny270793/myorm**](../README.md)

***

[@danny270793/myorm](../README.md) / TableBuilder

# Class: TableBuilder

Defined in: [migrations/tableBuilder.ts:1](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/migrations/tableBuilder.ts#L1)

## Constructors

### Constructor

> **new TableBuilder**(`tableName`): `TableBuilder`

Defined in: [migrations/tableBuilder.ts:5](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/migrations/tableBuilder.ts#L5)

#### Parameters

##### tableName

`string`

#### Returns

`TableBuilder`

## Methods

### column()

> **column**(`name`, `type`): [`ColumnBuilder`](ColumnBuilder.md)

Defined in: [migrations/tableBuilder.ts:9](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/migrations/tableBuilder.ts#L9)

#### Parameters

##### name

`string`

##### type

`string`

#### Returns

[`ColumnBuilder`](ColumnBuilder.md)

***

### getColumns()

> **getColumns**(): [`ColumnDefinition`](../interfaces/ColumnDefinition.md)[]

Defined in: [migrations/tableBuilder.ts:15](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/migrations/tableBuilder.ts#L15)

#### Returns

[`ColumnDefinition`](../interfaces/ColumnDefinition.md)[]

***

### getTableName()

> **getTableName**(): `string`

Defined in: [migrations/tableBuilder.ts:19](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/migrations/tableBuilder.ts#L19)

#### Returns

`string`

***

### toSQL()

> **toSQL**(): `string`

Defined in: [migrations/tableBuilder.ts:23](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/migrations/tableBuilder.ts#L23)

#### Returns

`string`
