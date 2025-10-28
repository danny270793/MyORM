[**@danny270793/myorm v1.0.0**](../README.md)

***

[@danny270793/myorm](../globals.md) / WhereCondition

# Interface: WhereCondition

Defined in: [basics/query.ts:4](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/query.ts#L4)

Represents a WHERE clause condition in a SQL query.

## Properties

### field

> **field**: `string`

Defined in: [basics/query.ts:6](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/query.ts#L6)

The field/column name

***

### operator

> **operator**: `string`

Defined in: [basics/query.ts:8](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/query.ts#L8)

The comparison operator (=, <, >, LIKE, etc.)

***

### value

> **value**: `any`

Defined in: [basics/query.ts:10](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/query.ts#L10)

The value to compare against

***

### separator?

> `optional` **separator**: `"and"` \| `"or"`

Defined in: [basics/query.ts:12](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/basics/query.ts#L12)

The separator to use before this condition (AND or OR)
