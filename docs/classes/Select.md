[**@danny270793/myorm v1.0.0**](../README.md)

***

[@danny270793/myorm](../globals.md) / Select

# Class: Select

Defined in: [basics/select.ts:3](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/select.ts#L3)

Abstract base class for queries that support WHERE clauses.

## Extends

- [`FiltrableQuery`](FiltrableQuery.md)

## Constructors

### Constructor

> **new Select**(`tableName?`): `Select`

Defined in: [basics/query.ts:31](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/query.ts#L31)

#### Parameters

##### tableName?

`string`

#### Returns

`Select`

#### Inherited from

[`FiltrableQuery`](FiltrableQuery.md).[`constructor`](FiltrableQuery.md#constructor)

## Properties

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

***

### selectFields

> `private` **selectFields**: `string`[] = `[]`

Defined in: [basics/select.ts:8](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/select.ts#L8)

***

### orderByClause?

> `private` `optional` **orderByClause**: `object`

Defined in: [basics/select.ts:9](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/select.ts#L9)

#### field

> **field**: `string`

#### direction

> **direction**: `string`

***

### limitValue?

> `private` `optional` **limitValue**: `number`

Defined in: [basics/select.ts:10](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/select.ts#L10)

***

### offsetValue?

> `private` `optional` **offsetValue**: `number`

Defined in: [basics/select.ts:11](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/select.ts#L11)

***

### groupByField?

> `private` `optional` **groupByField**: `string`

Defined in: [basics/select.ts:12](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/select.ts#L12)

***

### havingClause?

> `private` `optional` **havingClause**: `object`

Defined in: [basics/select.ts:13](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/select.ts#L13)

#### field

> **field**: `string`

#### operator

> **operator**: `string`

#### value

> **value**: `any`

## Methods

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

***

### from()

> `static` **from**(`tableName`): `Select`

Defined in: [basics/select.ts:4](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/select.ts#L4)

#### Parameters

##### tableName

`string`

#### Returns

`Select`

***

### fields()

> **fields**(...`fields`): `this`

Defined in: [basics/select.ts:15](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/select.ts#L15)

#### Parameters

##### fields

...`string`[]

#### Returns

`this`

***

### orderBy()

> **orderBy**(`field`, `direction`): `this`

Defined in: [basics/select.ts:20](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/select.ts#L20)

#### Parameters

##### field

`string`

##### direction

`string` = `'asc'`

#### Returns

`this`

***

### limit()

> **limit**(`value`): `this`

Defined in: [basics/select.ts:25](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/select.ts#L25)

#### Parameters

##### value

`number`

#### Returns

`this`

***

### offset()

> **offset**(`value`): `this`

Defined in: [basics/select.ts:30](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/select.ts#L30)

#### Parameters

##### value

`number`

#### Returns

`this`

***

### groupBy()

> **groupBy**(`field`): `this`

Defined in: [basics/select.ts:35](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/select.ts#L35)

#### Parameters

##### field

`string`

#### Returns

`this`

***

### having()

> **having**(`field`, `operator`, `value`): `this`

Defined in: [basics/select.ts:40](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/select.ts#L40)

#### Parameters

##### field

`string`

##### operator

`string`

##### value

`any`

#### Returns

`this`

***

### toPreparedStatement()

> **toPreparedStatement**(): [`PreparedStatement`](../interfaces/PreparedStatement.md)

Defined in: [basics/select.ts:45](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/select.ts#L45)

Converts the query to a prepared statement with SQL and parameters.

#### Returns

[`PreparedStatement`](../interfaces/PreparedStatement.md)

The prepared statement

#### Overrides

[`FiltrableQuery`](FiltrableQuery.md).[`toPreparedStatement`](FiltrableQuery.md#topreparedstatement)
