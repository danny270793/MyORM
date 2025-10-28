[**@danny270793/myorm**](../README.md)

***

[@danny270793/myorm](../README.md) / FiltrableQuery

# Abstract Class: FiltrableQuery

Defined in: [basics/query.ts:47](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/basics/query.ts#L47)

Abstract base class for queries that support WHERE clauses.

## Extends

- [`Query`](Query.md)

## Extended by

- [`Select`](Select.md)
- [`Insert`](Insert.md)
- [`Update`](Update.md)
- [`Delete`](Delete.md)

## Constructors

### Constructor

> **new FiltrableQuery**(`tableName?`): `FiltrableQuery`

Defined in: [basics/query.ts:31](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/basics/query.ts#L31)

#### Parameters

##### tableName?

`string`

#### Returns

`FiltrableQuery`

#### Inherited from

[`Query`](Query.md).[`constructor`](Query.md#constructor)

## Properties

### params

> `protected` **params**: `any`[] = `[]`

Defined in: [basics/query.ts:49](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/basics/query.ts#L49)

***

### tableName

> `protected` **tableName**: `string` = `''`

Defined in: [basics/query.ts:29](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/basics/query.ts#L29)

#### Inherited from

[`Query`](Query.md).[`tableName`](Query.md#tablename)

***

### whereClauses

> `protected` **whereClauses**: [`WhereCondition`](../interfaces/WhereCondition.md)[] = `[]`

Defined in: [basics/query.ts:48](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/basics/query.ts#L48)

## Methods

### addParam()

> `protected` **addParam**(`value`): `string`

Defined in: [basics/query.ts:68](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/basics/query.ts#L68)

**`Internal`**

Adds a parameter value and returns the placeholder.
Converts TypeScript types to SQLite-compatible values.

#### Parameters

##### value

`any`

The parameter value

#### Returns

`string`

The SQL placeholder ('?' or 'NULL')

***

### buildWhereClause()

> `protected` **buildWhereClause**(): `string`

Defined in: [basics/query.ts:92](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/basics/query.ts#L92)

**`Internal`**

Builds the WHERE clause SQL from the conditions.

#### Returns

`string`

The WHERE clause string

***

### toPreparedStatement()

> `abstract` **toPreparedStatement**(): [`PreparedStatement`](../interfaces/PreparedStatement.md)

Defined in: [basics/query.ts:41](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/basics/query.ts#L41)

Converts the query to a prepared statement with SQL and parameters.

#### Returns

[`PreparedStatement`](../interfaces/PreparedStatement.md)

The prepared statement

#### Inherited from

[`Query`](Query.md).[`toPreparedStatement`](Query.md#topreparedstatement)

***

### where()

> **where**(...`conditions`): `this`

Defined in: [basics/query.ts:56](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/basics/query.ts#L56)

Adds WHERE conditions to the query.

#### Parameters

##### conditions

...[`WhereCondition`](../interfaces/WhereCondition.md)[]

One or more where conditions

#### Returns

`this`

This query builder for chaining
