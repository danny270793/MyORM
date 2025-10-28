[**@danny270793/myorm**](../README.md)

***

[@danny270793/myorm](../README.md) / ColumnBuilder

# Class: ColumnBuilder

Defined in: [migrations/tableBuilder.ts:105](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/migrations/tableBuilder.ts#L105)

## Constructors

### Constructor

> **new ColumnBuilder**(`name`, `type`): `ColumnBuilder`

Defined in: [migrations/tableBuilder.ts:108](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/migrations/tableBuilder.ts#L108)

#### Parameters

##### name

`string`

##### type

`string`

#### Returns

`ColumnBuilder`

## Methods

### autoIncrement()

> **autoIncrement**(): `this`

Defined in: [migrations/tableBuilder.ts:120](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/migrations/tableBuilder.ts#L120)

#### Returns

`this`

***

### default()

> **default**(`value`): `this`

Defined in: [migrations/tableBuilder.ts:140](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/migrations/tableBuilder.ts#L140)

#### Parameters

##### value

`any`

#### Returns

`this`

***

### getDefinition()

> **getDefinition**(): [`ColumnDefinition`](../interfaces/ColumnDefinition.md)

Defined in: [migrations/tableBuilder.ts:145](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/migrations/tableBuilder.ts#L145)

#### Returns

[`ColumnDefinition`](../interfaces/ColumnDefinition.md)

***

### notNull()

> **notNull**(): `this`

Defined in: [migrations/tableBuilder.ts:130](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/migrations/tableBuilder.ts#L130)

#### Returns

`this`

***

### nullable()

> **nullable**(): `this`

Defined in: [migrations/tableBuilder.ts:135](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/migrations/tableBuilder.ts#L135)

#### Returns

`this`

***

### primaryKey()

> **primaryKey**(): `this`

Defined in: [migrations/tableBuilder.ts:115](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/migrations/tableBuilder.ts#L115)

#### Returns

`this`

***

### unique()

> **unique**(): `this`

Defined in: [migrations/tableBuilder.ts:125](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/migrations/tableBuilder.ts#L125)

#### Returns

`this`
