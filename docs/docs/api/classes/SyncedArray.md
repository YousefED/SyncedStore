---
id: "SyncedArray"
title: "Class: SyncedArray<T>"
sidebar_label: "SyncedArray"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- `Array`<`T`\>

  ↳ **`SyncedArray`**

## Constructors

### constructor

• **new SyncedArray**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

#### Inherited from

Y.Array<T\>.constructor

## Properties

### \_dEH

• **\_dEH**: `EventHandler`<`YEvent`[], `Transaction`\>

Deep event handlers

#### Inherited from

Y.Array.\_dEH

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:46

___

### \_eH

• **\_eH**: `EventHandler`<`YArrayEvent`<`T`\>, `Transaction`\>

Event handlers

#### Inherited from

Y.Array.\_eH

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:41

___

### \_item

• **\_item**: ``null`` \| `Item`

#### Inherited from

Y.Array.\_item

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:23

___

### \_length

• **\_length**: `number`

#### Inherited from

Y.Array.\_length

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:36

___

### \_map

• **\_map**: `Map`<`string`, `Item`\>

#### Inherited from

Y.Array.\_map

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:27

___

### \_searchMarker

• **\_searchMarker**: ``null`` \| `ArraySearchMarker`[]

#### Inherited from

Y.Array.\_searchMarker

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:50

___

### \_start

• **\_start**: ``null`` \| `Item`

#### Inherited from

Y.Array.\_start

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:31

___

### doc

• **doc**: ``null`` \| `Doc`

#### Inherited from

Y.Array.doc

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:35

## Accessors

### \_first

• `get` **_first**(): ``null`` \| `Item`

The first non-deleted item

#### Returns

``null`` \| `Item`

#### Inherited from

Y.Array.\_first

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:81

___

### length

• `get` **length**(): `number`

#### Returns

`number`

#### Inherited from

Y.Array.length

#### Defined in

node_modules/yjs/dist/src/types/YArray.d.ts:32

___

### parent

• `get` **parent**(): ``null`` \| `AbstractType`<`any`\>

#### Returns

``null`` \| `AbstractType`<`any`\>

#### Inherited from

Y.Array.parent

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:54

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`<`T`\>

#### Returns

`IterableIterator`<`T`\>

#### Inherited from

Y.Array.\_\_@iterator@81

#### Defined in

node_modules/yjs/dist/src/types/YArray.d.ts:109

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

Y.Array.\_callObserver

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:89

___

### \_copy

▸ **_copy**(): `AbstractType`<`YArrayEvent`<`T`\>\>

#### Returns

`AbstractType`<`YArrayEvent`<`T`\>\>

#### Inherited from

Y.Array.\_copy

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

Y.Array.\_integrate

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

Y.Array.\_write

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:77

___

### clone

▸ **clone**(): `AbstractType`<`YArrayEvent`<`T`\>\>

#### Returns

`AbstractType`<`YArrayEvent`<`T`\>\>

#### Inherited from

Y.Array.clone

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:73

___

### delete

▸ **delete**(`index`, `length?`): `void`

Deletes elements starting from an index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Index at which to start deleting elements |
| `length?` | `number` | The number of elements to remove. Defaults to 1. |

#### Returns

`void`

#### Inherited from

Y.Array.delete

#### Defined in

node_modules/yjs/dist/src/types/YArray.d.ts:68

___

### forEach

▸ **forEach**(`f`): `void`

Executes a provided function on once on overy element of this YArray.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`arg0`: `T`, `arg1`: `number`, `arg2`: `YArray`<`T`\>) => `void` | A function to execute on every element of this YArray. |

#### Returns

`void`

#### Inherited from

Y.Array.forEach

#### Defined in

node_modules/yjs/dist/src/types/YArray.d.ts:105

___

### get

▸ **get**(`index`): `T`

Returns the i-th element from a YArray.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the element to return from the YArray |

#### Returns

`T`

#### Inherited from

Y.Array.get

#### Defined in

node_modules/yjs/dist/src/types/YArray.d.ts:75

___

### insert

▸ **insert**(`index`, `content`): `void`

Inserts new content at an index.

Important: This function expects an array of content. Not just a content
object. The reason for this "weirdness" is that inserting several elements
is very efficient when it is done as a single operation.

**`example`**
 // Insert character 'a' at position 0
 yarray.insert(0, ['a'])
 // Insert numbers 1, 2 at position 1
 yarray.insert(1, [1, 2])

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index to insert content at. |
| `content` | `T`[] | The array of content |

#### Returns

`void`

#### Inherited from

Y.Array.insert

#### Defined in

node_modules/yjs/dist/src/types/YArray.d.ts:49

___

### map

▸ **map**<`M`\>(`f`): `M`[]

Returns an Array with the result of calling a provided function on every
element of this YArray.

#### Type parameters

| Name |
| :------ |
| `M` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`arg0`: `T`, `arg1`: `number`, `arg2`: `YArray`<`T`\>) => `M` | Function that produces an element of the new Array |

#### Returns

`M`[]

A new array with each element being the result of the
                callback function

#### Inherited from

Y.Array.map

#### Defined in

node_modules/yjs/dist/src/types/YArray.d.ts:99

___

### observe

▸ **observe**(`f`): `void`

Observe all events that are created on this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`arg0`: `YArrayEvent`<`T`\>, `arg1`: `Transaction`) => `void` | Observer function |

#### Returns

`void`

#### Inherited from

Y.Array.observe

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

Y.Array.observeDeep

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:101

___

### push

▸ **push**(`content`): `void`

Appends content to this YArray.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `T`[] | Array of content to append. |

#### Returns

`void`

#### Inherited from

Y.Array.push

#### Defined in

node_modules/yjs/dist/src/types/YArray.d.ts:55

___

### slice

▸ **slice**(`start?`, `end?`): `T`[]

Transforms this YArray to a JavaScript Array.

#### Parameters

| Name | Type |
| :------ | :------ |
| `start?` | `number` |
| `end?` | `number` |

#### Returns

`T`[]

#### Inherited from

Y.Array.slice

#### Defined in

node_modules/yjs/dist/src/types/YArray.d.ts:89

___

### toArray

▸ **toArray**(): `T`[]

Transforms this YArray to a JavaScript Array.

#### Returns

`T`[]

#### Inherited from

Y.Array.toArray

#### Defined in

node_modules/yjs/dist/src/types/YArray.d.ts:81

___

### toJSON

▸ **toJSON**(): `any`

**`abstract`**

#### Returns

`any`

#### Inherited from

Y.Array.toJSON

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:118

___

### unobserve

▸ **unobserve**(`f`): `void`

Unregister an observer function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`arg0`: `YArrayEvent`<`T`\>, `arg1`: `Transaction`) => `void` | Observer function |

#### Returns

`void`

#### Inherited from

Y.Array.unobserve

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

Y.Array.unobserveDeep

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:113

___

### unshift

▸ **unshift**(`content`): `void`

Preppends content to this YArray.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `T`[] | Array of content to preppend. |

#### Returns

`void`

#### Inherited from

Y.Array.unshift

#### Defined in

node_modules/yjs/dist/src/types/YArray.d.ts:61

___

### from

▸ `Static` **from**<`T_1`\>(`items`): `YArray`<`T_1`\>

Construct a new YArray containing the specified items.

#### Type parameters

| Name |
| :------ |
| `T_1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `T_1`[] |

#### Returns

`YArray`<`T_1`\>

#### Inherited from

Y.Array.from

#### Defined in

node_modules/yjs/dist/src/types/YArray.d.ts:26
