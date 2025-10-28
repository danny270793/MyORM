[**@danny270793/myorm v1.0.0**](../README.md)

***

[@danny270793/myorm](../globals.md) / TableBuilder

# Class: TableBuilder

Defined in: [migrations/tableBuilder.ts:1](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/migrations/tableBuilder.ts#L1)

## Constructors

### Constructor

> **new TableBuilder**(`tableName`): `TableBuilder`

Defined in: [migrations/tableBuilder.ts:5](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/migrations/tableBuilder.ts#L5)

#### Parameters

##### tableName

`string`

#### Returns

`TableBuilder`

## Properties

### tableName

> `private` `readonly` **tableName**: `string`

Defined in: [migrations/tableBuilder.ts:2](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/migrations/tableBuilder.ts#L2)

***

### columns

> `private` `readonly` **columns**: [`ColumnDefinition`](../interfaces/ColumnDefinition.md)[] = `[]`

Defined in: [migrations/tableBuilder.ts:3](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/migrations/tableBuilder.ts#L3)

## Methods

### column()

> **column**(`name`, `type`): [`ColumnBuilder`](ColumnBuilder.md)

Defined in: [migrations/tableBuilder.ts:9](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/migrations/tableBuilder.ts#L9)

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

Defined in: [migrations/tableBuilder.ts:15](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/migrations/tableBuilder.ts#L15)

#### Returns

[`ColumnDefinition`](../interfaces/ColumnDefinition.md)[]

***

### getTableName()

> **getTableName**(): `string`

Defined in: [migrations/tableBuilder.ts:19](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/migrations/tableBuilder.ts#L19)

#### Returns

`string`

***

### toSQL()

> **toSQL**(): `string`

Defined in: [migrations/tableBuilder.ts:23](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/migrations/tableBuilder.ts#L23)

#### Returns

`string`

***

### mapTypeToSQL()

> `private` **mapTypeToSQL**(`type`): `string`

Defined in: [migrations/tableBuilder.ts:62](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/migrations/tableBuilder.ts#L62)

#### Parameters

##### type

`string`

#### Returns

`string`

***

### formatDefaultValue()

> `private` **formatDefaultValue**(`value`): `string`

Defined in: [migrations/tableBuilder.ts:77](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/migrations/tableBuilder.ts#L77)

#### Parameters

##### value

`any`

#### Returns

`string`
