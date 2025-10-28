[**@danny270793/myorm v1.0.0**](../README.md)

***

[@danny270793/myorm](../globals.md) / Insert

# Class: Insert

Defined in: [basics/insert.ts:3](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/insert.ts#L3)

Abstract base class for queries that support WHERE clauses.

## Extends

- [`FiltrableQuery`](FiltrableQuery.md)

## Constructors

### Constructor

> **new Insert**(`tableName?`): `Insert`

Defined in: [basics/query.ts:31](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/query.ts#L31)

#### Parameters

##### tableName?

`string`

#### Returns

`Insert`

#### Inherited from

[`FiltrableQuery`](FiltrableQuery.md).[`constructor`](FiltrableQuery.md#constructor)

## Properties

### dataRows

> `private` `readonly` **dataRows**: `Record`\<`string`, `any`\>[] = `[]`

Defined in: [basics/insert.ts:4](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/insert.ts#L4)

***

### tableName

> `protected` **tableName**: `string` = `''`

Defined in: [basics/query.ts:29](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/query.ts#L29)

#### Inherited from

[`FiltrableQuery`](FiltrableQuery.md).[`tableName`](FiltrableQuery.md#tablename)

***

### whereClauses

> `protected` **whereClauses**: [`WhereCondition`](../interfaces/WhereCondition.md)[] = `[]`

Defined in: [basics/query.ts:48](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/query.ts#L48)

#### Inherited from

[`FiltrableQuery`](FiltrableQuery.md).[`whereClauses`](FiltrableQuery.md#whereclauses)

***

### params

> `protected` **params**: `any`[] = `[]`

Defined in: [basics/query.ts:49](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/query.ts#L49)

#### Inherited from

[`FiltrableQuery`](FiltrableQuery.md).[`params`](FiltrableQuery.md#params)

## Methods

### into()

> `static` **into**(`tableName`): `Insert`

Defined in: [basics/insert.ts:6](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/insert.ts#L6)

#### Parameters

##### tableName

`string`

#### Returns

`Insert`

***

### rows()

> **rows**(...`rows`): `this`

Defined in: [basics/insert.ts:10](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/insert.ts#L10)

#### Parameters

##### rows

...`Record`\<`string`, `any`\>[]

#### Returns

`this`

***

### toPreparedStatement()

> **toPreparedStatement**(): [`PreparedStatement`](../interfaces/PreparedStatement.md)

Defined in: [basics/insert.ts:15](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/insert.ts#L15)

Converts the query to a prepared statement with SQL and parameters.

#### Returns

[`PreparedStatement`](../interfaces/PreparedStatement.md)

The prepared statement

#### Overrides

[`FiltrableQuery`](FiltrableQuery.md).[`toPreparedStatement`](FiltrableQuery.md#topreparedstatement)

***

### where()

> **where**(...`conditions`): `this`

Defined in: [basics/query.ts:56](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/query.ts#L56)

Adds WHERE conditions to the query.

#### Parameters

##### conditions

...[`WhereCondition`](../interfaces/WhereCondition.md)[]

One or more where conditions

#### Returns

`this`

This query builder for chaining

#### Inherited from

[`FiltrableQuery`](FiltrableQuery.md).[`where`](FiltrableQuery.md#where)

***

### addParam()

> `protected` **addParam**(`value`): `string`

Defined in: [basics/query.ts:68](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/query.ts#L68)

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

#### Inherited from

[`FiltrableQuery`](FiltrableQuery.md).[`addParam`](FiltrableQuery.md#addparam)

***

### buildWhereClause()

> `protected` **buildWhereClause**(): `string`

Defined in: [basics/query.ts:92](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/query.ts#L92)

**`Internal`**

Builds the WHERE clause SQL from the conditions.

#### Returns

`string`

The WHERE clause string

#### Inherited from

[`FiltrableQuery`](FiltrableQuery.md).[`buildWhereClause`](FiltrableQuery.md#buildwhereclause)
