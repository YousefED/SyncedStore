---
id: "SyncedMap"
title: "Class: SyncedMap<T>"
sidebar_label: "SyncedMap"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- `Map`<`T`\>

  ↳ **`SyncedMap`**

## Constructors

### constructor

• **new SyncedMap**<`T`\>(`entries?`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entries?` | `Iterable`<readonly [`string`, `any`]\> | an optional iterable to initialize the YMap |

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/YMap.d.ts:26

## Properties

### \_dEH

• **\_dEH**: `EventHandler`<`YEvent`[], `Transaction`\>

Deep event handlers

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:46

___

### \_eH

• **\_eH**: `EventHandler`<`YMapEvent`<`T`\>, `Transaction`\>

Event handlers

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:41

___

### \_item

• **\_item**: ``null`` \| `Item`

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:23

___

### \_length

• **\_length**: `number`

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:36

___

### \_map

• **\_map**: `Map`<`string`, `Item`\>

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:27

___

### \_searchMarker

• **\_searchMarker**: ``null`` \| `ArraySearchMarker`[]

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:50

___

### \_start

• **\_start**: ``null`` \| `Item`

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:31

___

### doc

• **doc**: ``null`` \| `Doc`

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:35

## Accessors

### \_first

• `get` **_first**(): ``null`` \| `Item`

The first non-deleted item

#### Returns

``null`` \| `Item`

#### Inherited from

Y.Map.\_first

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:81

___

### parent

• `get` **parent**(): ``null`` \| `AbstractType`<`any`\>

#### Returns

``null`` \| `AbstractType`<`any`\>

#### Inherited from

Y.Map.parent

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:54

___

### size

• `get` **size**(): `number`

Returns the size of the YMap (count of key/value pairs)

#### Returns

`number`

#### Inherited from

Y.Map.size

#### Defined in

node_modules/yjs/dist/src/types/YMap.d.ts:37

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`<`T`\>

#### Returns

`IterableIterator`<`T`\>

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/YMap.d.ts:98

___

### \_callObserver

▸ **_callObserver**(`transaction`, `parentSubs`): `void`

Creates YEvent and calls all type observers.
Must be implemented by each type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transaction` | `Transaction` |  |
| `parentSubs` | `Set`<``null`` \| `string`\> | Keys changed on this type. `null` if list was modified. |

#### Returns

`void`

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:89

___

### \_copy

▸ **_copy**(): `AbstractType`<`YMapEvent`<`T`\>\>

#### Returns

`AbstractType`<`YMapEvent`<`T`\>\>

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:69

___

### \_integrate

▸ **_integrate**(`y`, `item`): `void`

Integrate this type into the Yjs instance.

* Save this struct in the os
* This type is sent to other client
* Observer functions are fired

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `y` | `Doc` | The Yjs instance |
| `item` | ``null`` \| `Item` |  |

#### Returns

`void`

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:65

___

### \_write

▸ **_write**(`encoder`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoder` | `UpdateEncoderV1` \| `UpdateEncoderV2` |

#### Returns

`void`

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:77

___

### clear

▸ **clear**(): `void`

Removes all elements from this YMap.

#### Returns

`void`

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/YMap.d.ts:94

___

### clone

▸ **clone**(): `AbstractType`<`YMapEvent`<`T`\>\>

#### Returns

`AbstractType`<`YMapEvent`<`T`\>\>

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:73

___

### delete

▸ **delete**(`key`): `void`

Remove a specified element from this YMap.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key of the element to remove. |

#### Returns

`void`

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/YMap.d.ts:69

___

### entries

▸ **entries**(): `IterableIterator`<`any`\>

Returns an Iterator of [key, value] pairs

#### Returns

`IterableIterator`<`any`\>

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/YMap.d.ts:55

___

### forEach

▸ **forEach**(`f`): `Object`

Executes a provided function on once on every key-value pair.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`arg0`: `T`, `arg1`: `string`, `arg2`: `YMap`<`T`\>) => `void` | A function to execute on every element of this YArray. |

#### Returns

`Object`

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/YMap.d.ts:61

___

### get

▸ **get**(`key`): `undefined` \| `T`

Returns a specified element from this YMap.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` \| `T`

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/YMap.d.ts:83

___

### has

▸ **has**(`key`): `boolean`

Returns a boolean indicating whether the specified key exists or not.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key to test. |

#### Returns

`boolean`

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/YMap.d.ts:90

___

### keys

▸ **keys**(): `IterableIterator`<`string`\>

Returns the keys for each element in the YMap Type.

#### Returns

`IterableIterator`<`string`\>

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/YMap.d.ts:43

___

### observe

▸ **observe**(`f`): `void`

Observe all events that are created on this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`arg0`: `YMapEvent`<`T`\>, `arg1`: `Transaction`) => `void` | Observer function |

#### Returns

`void`

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:95

___

### observeDeep

▸ **observeDeep**(`f`): `void`

Observe all events that are created by this type and its children.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`arg0`: `YEvent`[], `arg1`: `Transaction`) => `void` | Observer function |

#### Returns

`void`

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:101

___

### set

▸ **set**(`key`, `value`): `T`

Adds or updates an element with a specified key and value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key of the element to add to this YMap |
| `value` | `T` | The value of the element to add |

#### Returns

`T`

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/YMap.d.ts:76

___

### toJSON

▸ **toJSON**(): `any`

**`abstract`**

#### Returns

`any`

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:118

___

### unobserve

▸ **unobserve**(`f`): `void`

Unregister an observer function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`arg0`: `YMapEvent`<`T`\>, `arg1`: `Transaction`) => `void` | Observer function |

#### Returns

`void`

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:107

___

### unobserveDeep

▸ **unobserveDeep**(`f`): `void`

Unregister an observer function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`arg0`: `YEvent`[], `arg1`: `Transaction`) => `void` | Observer function |

#### Returns

`void`

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:113

___

### values

▸ **values**(): `IterableIterator`<`any`\>

Returns the values for each element in the YMap Type.

#### Returns

`IterableIterator`<`any`\>

#### Inherited from

#### Defined in

node_modules/yjs/dist/src/types/YMap.d.ts:49
