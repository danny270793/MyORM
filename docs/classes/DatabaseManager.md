[**@danny270793/myorm v1.0.0**](../README.md)

***

[@danny270793/myorm](../globals.md) / DatabaseManager

# Class: DatabaseManager

Defined in: [database.ts:4](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/database.ts#L4)

## Constructors

### Constructor

> `private` **new DatabaseManager**(): `DatabaseManager`

Defined in: [database.ts:8](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/database.ts#L8)

#### Returns

`DatabaseManager`

## Properties

### instance

> `private` `static` **instance**: `DatabaseManager`

Defined in: [database.ts:5](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/database.ts#L5)

***

### db

> `private` `readonly` **db**: `Database`

Defined in: [database.ts:6](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/database.ts#L6)

## Methods

### getInstance()

> `static` **getInstance**(): `DatabaseManager`

Defined in: [database.ts:12](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/database.ts#L12)

#### Returns

`DatabaseManager`

***

### fetch()

> `static` **fetch**(`query`): `number` \| `bigint`

Defined in: [database.ts:19](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/database.ts#L19)

#### Parameters

##### query

[`Query`](Query.md)

#### Returns

`number` \| `bigint`

***

### queryOne()

> `static` **queryOne**(`query`): `any`

Defined in: [database.ts:29](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/database.ts#L29)

#### Parameters

##### query

[`Query`](Query.md)

#### Returns

`any`

***

### queryAll()

> `static` **queryAll**(`query`): `any`[]

Defined in: [database.ts:36](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/database.ts#L36)

#### Parameters

##### query

[`Query`](Query.md)

#### Returns

`any`[]

***

### execute()

> `static` **execute**(`query`): `void`

Defined in: [database.ts:43](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/database.ts#L43)

#### Parameters

##### query

[`Query`](Query.md)

#### Returns

`void`

***

### getConnection()

> **getConnection**(): `Database`

Defined in: [database.ts:50](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/database.ts#L50)

#### Returns

`Database`

***

### close()

> **close**(): `void`

Defined in: [database.ts:54](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/database.ts#L54)

#### Returns

`void`
