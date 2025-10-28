[**@danny270793/myorm**](../README.md)

***

[@danny270793/myorm](../README.md) / Query

# Abstract Class: Query

Defined in: [basics/query.ts:28](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/basics/query.ts#L28)

Abstract base class for all query builders.

## Extended by

- [`FiltrableQuery`](FiltrableQuery.md)

## Constructors

### Constructor

> **new Query**(`tableName?`): `Query`

Defined in: [basics/query.ts:31](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/basics/query.ts#L31)

#### Parameters

##### tableName?

`string`

#### Returns

`Query`

## Properties

### tableName

> `protected` **tableName**: `string` = `''`

Defined in: [basics/query.ts:29](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/basics/query.ts#L29)

## Methods

### toPreparedStatement()

> `abstract` **toPreparedStatement**(): [`PreparedStatement`](../interfaces/PreparedStatement.md)

Defined in: [basics/query.ts:41](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/basics/query.ts#L41)

Converts the query to a prepared statement with SQL and parameters.

#### Returns

[`PreparedStatement`](../interfaces/PreparedStatement.md)

The prepared statement
