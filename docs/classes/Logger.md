[**@danny270793/myorm v1.0.0**](../README.md)

***

[@danny270793/myorm](../globals.md) / Logger

# Class: Logger

Defined in: [logger.ts:1](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/logger.ts#L1)

## Constructors

### Constructor

> **new Logger**(`name`): `Logger`

Defined in: [logger.ts:3](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/logger.ts#L3)

#### Parameters

##### name

`string`

#### Returns

`Logger`

## Properties

### name

> `private` `readonly` **name**: `string`

Defined in: [logger.ts:2](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/logger.ts#L2)

## Methods

### write()

> **write**(`tag`, ...`messages`): `void`

Defined in: [logger.ts:7](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/logger.ts#L7)

#### Parameters

##### tag

`string`

##### messages

...`any`[]

#### Returns

`void`

***

### info()

> **info**(...`messages`): `void`

Defined in: [logger.ts:15](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/logger.ts#L15)

#### Parameters

##### messages

...`any`[]

#### Returns

`void`

***

### debug()

> **debug**(...`messages`): `void`

Defined in: [logger.ts:19](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/logger.ts#L19)

#### Parameters

##### messages

...`any`[]

#### Returns

`void`

***

### warn()

> **warn**(...`messages`): `void`

Defined in: [logger.ts:23](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/logger.ts#L23)

#### Parameters

##### messages

...`any`[]

#### Returns

`void`

***

### error()

> **error**(...`messages`): `void`

Defined in: [logger.ts:27](https://github.com/danny270793/MyORM/blob/9faec68ed1d5f8ec030994851f3cd734dd1ff811/src/libraries/logger.ts#L27)

#### Parameters

##### messages

...`any`[]

#### Returns

`void`
