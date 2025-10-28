[**@danny270793/myorm**](../README.md)

***

[@danny270793/myorm](../README.md) / WhereCondition

# Interface: WhereCondition

Defined in: [basics/query.ts:4](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/basics/query.ts#L4)

Represents a WHERE clause condition in a SQL query.

## Properties

### field

> **field**: `string`

Defined in: [basics/query.ts:6](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/basics/query.ts#L6)

The field/column name

***

### operator

> **operator**: `string`

Defined in: [basics/query.ts:8](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/basics/query.ts#L8)

The comparison operator (=, <, >, LIKE, etc.)

***

### separator?

> `optional` **separator**: `"and"` \| `"or"`

Defined in: [basics/query.ts:12](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/basics/query.ts#L12)

The separator to use before this condition (AND or OR)

***

### value

> **value**: `any`

Defined in: [basics/query.ts:10](https://github.com/danny270793/MyORM/blob/0fac4c292463a918ab1d9675c2a165a9298cb0ae/src/libraries/basics/query.ts#L10)

The value to compare against
