[**@danny270793/myorm**](../README.md)

***

[@danny270793/myorm](../README.md) / DatabaseManager

# Class: DatabaseManager

Defined in: [database.ts:4](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/database.ts#L4)

## Methods

### close()

> **close**(): `void`

Defined in: [database.ts:54](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/database.ts#L54)

#### Returns

`void`

***

### getConnection()

> **getConnection**(): `Database`

Defined in: [database.ts:50](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/database.ts#L50)

#### Returns

`Database`

***

### execute()

> `static` **execute**(`query`): `void`

Defined in: [database.ts:43](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/database.ts#L43)

#### Parameters

##### query

[`Query`](Query.md)

#### Returns

`void`

***

### fetch()

> `static` **fetch**(`query`): `number` \| `bigint`

Defined in: [database.ts:19](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/database.ts#L19)

#### Parameters

##### query

[`Query`](Query.md)

#### Returns

`number` \| `bigint`

***

### getInstance()

> `static` **getInstance**(): `DatabaseManager`

Defined in: [database.ts:12](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/database.ts#L12)

#### Returns

`DatabaseManager`

***

### queryAll()

> `static` **queryAll**(`query`): `any`[]

Defined in: [database.ts:36](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/database.ts#L36)

#### Parameters

##### query

[`Query`](Query.md)

#### Returns

`any`[]

***

### queryOne()

> `static` **queryOne**(`query`): `any`

Defined in: [database.ts:29](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/database.ts#L29)

#### Parameters

##### query

[`Query`](Query.md)

#### Returns

`any`
