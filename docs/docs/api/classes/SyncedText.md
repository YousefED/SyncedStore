---
id: "SyncedText"
title: "Class: SyncedText"
sidebar_label: "SyncedText"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Text`

  ↳ **`SyncedText`**

## Constructors

### constructor

• **new SyncedText**(`string?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `string?` | `string` |

#### Inherited from

Y.Text.constructor

#### Defined in

node_modules/yjs/dist/src/types/YText.d.ts:79

## Properties

### \_dEH

• **\_dEH**: `EventHandler`<`YEvent`[], `Transaction`\>

Deep event handlers

#### Inherited from

Y.Text.\_dEH

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:46

___

### \_eH

• **\_eH**: `EventHandler`<`YTextEvent`, `Transaction`\>

Event handlers

#### Inherited from

Y.Text.\_eH

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:41

___

### \_item

• **\_item**: ``null`` \| `Item`

#### Inherited from

Y.Text.\_item

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:23

___

### \_length

• **\_length**: `number`

#### Inherited from

Y.Text.\_length

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:36

___

### \_map

• **\_map**: `Map`<`string`, `Item`\>

#### Inherited from

Y.Text.\_map

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:27

___

### \_pending

• **\_pending**: ``null`` \| () => `void`[]

Array of pending operations on this type

#### Inherited from

Y.Text.\_pending

#### Defined in

node_modules/yjs/dist/src/types/YText.d.ts:84

___

### \_searchMarker

• **\_searchMarker**: ``null`` \| `ArraySearchMarker`[]

#### Inherited from

Y.Text.\_searchMarker

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:50

___

### \_start

• **\_start**: ``null`` \| `Item`

#### Inherited from

Y.Text.\_start

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:31

___

### doc

• **doc**: ``null`` \| `Doc`

#### Inherited from

Y.Text.doc

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:35

## Accessors

### \_first

• `get` **_first**(): ``null`` \| `Item`

The first non-deleted item

#### Returns

``null`` \| `Item`

#### Inherited from

Y.Text.\_first

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:81

___

### length

• `get` **length**(): `number`

Number of characters of this text type.

#### Returns

`number`

#### Inherited from

Y.Text.length

#### Defined in

node_modules/yjs/dist/src/types/YText.d.ts:90

___

### parent

• `get` **parent**(): ``null`` \| `AbstractType`<`any`\>

#### Returns

``null`` \| `AbstractType`<`any`\>

#### Inherited from

Y.Text.parent

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:54

## Methods

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

Y.Text.\_callObserver

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:89

___

### \_copy

▸ **_copy**(): `AbstractType`<`YTextEvent`\>

#### Returns

`AbstractType`<`YTextEvent`\>

#### Inherited from

Y.Text.\_copy

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

Y.Text.\_integrate

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

Y.Text.\_write

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:77

___

### applyDelta

▸ **applyDelta**(`delta`, `[opts]?`): `void`

Apply a {@link Delta} on this shared YText type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `delta` | `any` | The changes to apply on this element. |
| `[opts]?` | `Object` |  |
| `[opts].sanitize?` | `boolean` | - |

#### Returns

`void`

#### Inherited from

Y.Text.applyDelta

#### Defined in

node_modules/yjs/dist/src/types/YText.d.ts:101

___

### clone

▸ **clone**(): `AbstractType`<`YTextEvent`\>

#### Returns

`AbstractType`<`YTextEvent`\>

#### Inherited from

Y.Text.clone

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:73

___

### delete

▸ **delete**(`index`, `length`): `void`

Deletes text starting from an index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Index at which to start deleting. |
| `length` | `number` | The number of characters to remove. Defaults to 1. |

#### Returns

`void`

#### Inherited from

Y.Text.delete

#### Defined in

node_modules/yjs/dist/src/types/YText.d.ts:145

___

### format

▸ **format**(`index`, `length`, `attributes`): `void`

Assigns properties to a range of text.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The position where to start formatting. |
| `length` | `number` | The amount of characters to assign properties to. |
| `attributes` | `Object` | Attribute information to apply on the                                    text. |

#### Returns

`void`

#### Inherited from

Y.Text.format

#### Defined in

node_modules/yjs/dist/src/types/YText.d.ts:156

___

### getAttribute

▸ **getAttribute**(`attributeName`): `any`

Returns an attribute value that belongs to the attribute name.

**`note`** Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `attributeName` | `string` | The attribute name that identifies the                               queried value. |

#### Returns

`any`

The queried attribute value.

#### Inherited from

Y.Text.getAttribute

#### Defined in

node_modules/yjs/dist/src/types/YText.d.ts:189

___

### getAttributes

▸ **getAttributes**(`snapshot?`): `Object`

Returns all attribute name/value pairs in a JSON Object.

**`note`** Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.

#### Parameters

| Name | Type |
| :------ | :------ |
| `snapshot?` | `Snapshot` |

#### Returns

`Object`

A JSON Object that describes the attributes.

#### Inherited from

Y.Text.getAttributes

#### Defined in

node_modules/yjs/dist/src/types/YText.d.ts:200

___

### insert

▸ **insert**(`index`, `text`, `attributes?`): `void`

Insert text at a given index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index at which to start inserting. |
| `text` | `string` | The text to insert at the specified position. |
| `attributes?` | `Object` | - |

#### Returns

`void`

#### Inherited from

Y.Text.insert

#### Defined in

node_modules/yjs/dist/src/types/YText.d.ts:125

___

### insertEmbed

▸ **insertEmbed**(`index`, `embed`, `attributes?`): `void`

Inserts an embed at a index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index to insert the embed at. |
| `embed` | `Object` \| `AbstractType`<`any`\> | The Object that represents the embed. |
| `attributes?` | `Object` | Attribute information to apply on the                                    embed |

#### Returns

`void`

#### Inherited from

Y.Text.insertEmbed

#### Defined in

node_modules/yjs/dist/src/types/YText.d.ts:136

___

### observe

▸ **observe**(`f`): `void`

Observe all events that are created on this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`arg0`: `YTextEvent`, `arg1`: `Transaction`) => `void` | Observer function |

#### Returns

`void`

#### Inherited from

Y.Text.observe

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

Y.Text.observeDeep

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:101

___

### removeAttribute

▸ **removeAttribute**(`attributeName`): `void`

Removes an attribute.

**`note`** Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `attributeName` | `string` | The attribute name that is to be removed. |

#### Returns

`void`

#### Inherited from

Y.Text.removeAttribute

#### Defined in

node_modules/yjs/dist/src/types/YText.d.ts:166

___

### setAttribute

▸ **setAttribute**(`attributeName`, `attributeValue`): `void`

Sets or updates an attribute.

**`note`** Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `attributeName` | `string` | The attribute name that is to be set. |
| `attributeValue` | `any` | The attribute value that is to be set. |

#### Returns

`void`

#### Inherited from

Y.Text.setAttribute

#### Defined in

node_modules/yjs/dist/src/types/YText.d.ts:177

___

### toDelta

▸ **toDelta**(`snapshot?`, `prevSnapshot?`, `computeYChange?`): `any`

Returns the Delta representation of this YText type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `snapshot?` | `Snapshot` |
| `prevSnapshot?` | `Snapshot` |
| `computeYChange?` | (`arg0`: ``"removed"`` \| ``"added"``, `arg1`: `ID`) => `any` |

#### Returns

`any`

The Delta representation of this type.

#### Inherited from

Y.Text.toDelta

#### Defined in

node_modules/yjs/dist/src/types/YText.d.ts:114

___

### toJSON

▸ **toJSON**(): `any`

**`abstract`**

#### Returns

`any`

#### Inherited from

Y.Text.toJSON

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:118

___

### unobserve

▸ **unobserve**(`f`): `void`

Unregister an observer function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`arg0`: `YTextEvent`, `arg1`: `Transaction`) => `void` | Observer function |

#### Returns

`void`

#### Inherited from

Y.Text.unobserve

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

Y.Text.unobserveDeep

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:113
