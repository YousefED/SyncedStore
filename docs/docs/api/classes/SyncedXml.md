---
id: "SyncedXml"
title: "Class: SyncedXml"
sidebar_label: "SyncedXml"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `XmlFragment`

  ↳ **`SyncedXml`**

## Constructors

### constructor

• **new SyncedXml**()

#### Inherited from

Y.XmlFragment.constructor

#### Defined in

node_modules/yjs/dist/src/types/YXmlFragment.d.ts:62

## Properties

### \_dEH

• **\_dEH**: `EventHandler`<`YEvent`[], `Transaction`\>

Deep event handlers

#### Inherited from

Y.XmlFragment.\_dEH

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:46

___

### \_eH

• **\_eH**: `EventHandler`<`YXmlEvent`, `Transaction`\>

Event handlers

#### Inherited from

Y.XmlFragment.\_eH

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:41

___

### \_item

• **\_item**: ``null`` \| `Item`

#### Inherited from

Y.XmlFragment.\_item

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:23

___

### \_length

• **\_length**: `number`

#### Inherited from

Y.XmlFragment.\_length

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:36

___

### \_map

• **\_map**: `Map`<`string`, `Item`\>

#### Inherited from

Y.XmlFragment.\_map

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:27

___

### \_prelimContent

• **\_prelimContent**: ``null`` \| `any`[]

#### Inherited from

Y.XmlFragment.\_prelimContent

#### Defined in

node_modules/yjs/dist/src/types/YXmlFragment.d.ts:66

___

### \_searchMarker

• **\_searchMarker**: ``null`` \| `ArraySearchMarker`[]

#### Inherited from

Y.XmlFragment.\_searchMarker

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:50

___

### \_start

• **\_start**: ``null`` \| `Item`

#### Inherited from

Y.XmlFragment.\_start

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:31

___

### doc

• **doc**: ``null`` \| `Doc`

#### Inherited from

Y.XmlFragment.doc

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:35

## Accessors

### \_first

• `get` **_first**(): ``null`` \| `Item`

The first non-deleted item

#### Returns

``null`` \| `Item`

#### Inherited from

Y.XmlFragment.\_first

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:81

___

### firstChild

• `get` **firstChild**(): ``null`` \| `YXmlElement` \| `YXmlText`

#### Returns

``null`` \| `YXmlElement` \| `YXmlText`

#### Inherited from

Y.XmlFragment.firstChild

#### Defined in

node_modules/yjs/dist/src/types/YXmlFragment.d.ts:70

___

### length

• `get` **length**(): `number`

#### Returns

`number`

#### Inherited from

Y.XmlFragment.length

#### Defined in

node_modules/yjs/dist/src/types/YXmlFragment.d.ts:71

___

### parent

• `get` **parent**(): ``null`` \| `AbstractType`<`any`\>

#### Returns

``null`` \| `AbstractType`<`any`\>

#### Inherited from

Y.XmlFragment.parent

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

Y.XmlFragment.\_callObserver

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:89

___

### \_copy

▸ **_copy**(): `AbstractType`<`YXmlEvent`\>

#### Returns

`AbstractType`<`YXmlEvent`\>

#### Inherited from

Y.XmlFragment.\_copy

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

Y.XmlFragment.\_integrate

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

Y.XmlFragment.\_write

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:77

___

### clone

▸ **clone**(): `AbstractType`<`YXmlEvent`\>

#### Returns

`AbstractType`<`YXmlEvent`\>

#### Inherited from

Y.XmlFragment.clone

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:73

___

### createTreeWalker

▸ **createTreeWalker**(`filter`): `YXmlTreeWalker`

Create a subtree of childNodes.

**`example`**
const walker = elem.createTreeWalker(dom => dom.nodeName === 'div')
for (let node in walker) {
  // `node` is a div node
  nop(node)
}

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | (`arg0`: `AbstractType`<`any`\>) => `boolean` | Function that is called on each child element and                          returns a Boolean indicating whether the child                          is to be included in the subtree. |

#### Returns

`YXmlTreeWalker`

A subtree and a position within it.

#### Inherited from

Y.XmlFragment.createTreeWalker

#### Defined in

node_modules/yjs/dist/src/types/YXmlFragment.d.ts:89

___

### delete

▸ **delete**(`index`, `length?`): `void`

Deletes elements starting from an index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Index at which to start deleting elements |
| `length?` | `number` | - |

#### Returns

`void`

#### Inherited from

Y.XmlFragment.delete

#### Defined in

node_modules/yjs/dist/src/types/YXmlFragment.d.ts:164

___

### get

▸ **get**(`index`): `YXmlElement` \| `YXmlText`

Returns the i-th element from a YArray.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the element to return from the YArray |

#### Returns

`YXmlElement` \| `YXmlText`

#### Inherited from

Y.XmlFragment.get

#### Defined in

node_modules/yjs/dist/src/types/YXmlFragment.d.ts:189

___

### insert

▸ **insert**(`index`, `content`): `void`

Inserts new content at an index.

**`example`**
 // Insert character 'a' at position 0
 xml.insert(0, [new Y.XmlText('text')])

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index to insert content at |
| `content` | (`YXmlElement` \| `YXmlText`)[] | The array of content |

#### Returns

`void`

#### Inherited from

Y.XmlFragment.insert

#### Defined in

node_modules/yjs/dist/src/types/YXmlFragment.d.ts:146

___

### insertAfter

▸ **insertAfter**(`ref`, `content`): `void`

Inserts new content at an index.

**`example`**
 // Insert character 'a' at position 0
 xml.insert(0, [new Y.XmlText('text')])

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ref` | ``null`` \| `Item` \| `YXmlElement` \| `YXmlText` | The index to insert content at |
| `content` | (`YXmlElement` \| `YXmlText`)[] | The array of content |

#### Returns

`void`

#### Inherited from

Y.XmlFragment.insertAfter

#### Defined in

node_modules/yjs/dist/src/types/YXmlFragment.d.ts:157

___

### observe

▸ **observe**(`f`): `void`

Observe all events that are created on this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`arg0`: `YXmlEvent`, `arg1`: `Transaction`) => `void` | Observer function |

#### Returns

`void`

#### Inherited from

Y.XmlFragment.observe

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

Y.XmlFragment.observeDeep

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:101

___

### push

▸ **push**(`content`): `void`

Appends content to this YArray.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | (`YXmlElement` \| `YXmlText`)[] | Array of content to append. |

#### Returns

`void`

#### Inherited from

Y.XmlFragment.push

#### Defined in

node_modules/yjs/dist/src/types/YXmlFragment.d.ts:176

___

### querySelector

▸ **querySelector**(`query`): ``null`` \| `YXmlElement` \| `YXmlText` \| `YXmlHook`

Returns the first YXmlElement that matches the query.
Similar to DOM's [querySelector](SyncedXml#queryselector).

Query support:
  - tagname
TODO:
  - id
  - attribute

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `string` | The query on the children. |

#### Returns

``null`` \| `YXmlElement` \| `YXmlText` \| `YXmlHook`

The first element that matches the query or null.

#### Inherited from

Y.XmlFragment.querySelector

#### Defined in

node_modules/yjs/dist/src/types/YXmlFragment.d.ts:105

___

### querySelectorAll

▸ **querySelectorAll**(`query`): (``null`` \| `YXmlElement` \| `YXmlText` \| `YXmlHook`)[]

Returns all YXmlElements that match the query.
Similar to Dom's [querySelectorAll](SyncedXml#queryselectorall).

**`todo`** Does not yet support all queries. Currently only query by tagName.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `string` | The query on the children |

#### Returns

(``null`` \| `YXmlElement` \| `YXmlText` \| `YXmlHook`)[]

The elements that match this query.

#### Inherited from

Y.XmlFragment.querySelectorAll

#### Defined in

node_modules/yjs/dist/src/types/YXmlFragment.d.ts:117

___

### slice

▸ **slice**(`start?`, `end?`): (`YXmlElement` \| `YXmlText`)[]

Transforms this YArray to a JavaScript Array.

#### Parameters

| Name | Type |
| :------ | :------ |
| `start?` | `number` |
| `end?` | `number` |

#### Returns

(`YXmlElement` \| `YXmlText`)[]

#### Inherited from

Y.XmlFragment.slice

#### Defined in

node_modules/yjs/dist/src/types/YXmlFragment.d.ts:197

___

### toArray

▸ **toArray**(): (`YXmlElement` \| `YXmlText` \| `YXmlHook`)[]

Transforms this YArray to a JavaScript Array.

#### Returns

(`YXmlElement` \| `YXmlText` \| `YXmlHook`)[]

#### Inherited from

Y.XmlFragment.toArray

#### Defined in

node_modules/yjs/dist/src/types/YXmlFragment.d.ts:170

___

### toDOM

▸ **toDOM**(`_document?`, `hooks?`, `binding?`): `Node`

Creates a Dom Element that mirrors this YXmlElement.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_document?` | `Document` |
| `hooks?` | `Object` |
| `binding?` | `any` |

#### Returns

`Node`

The [Dom Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)

#### Inherited from

Y.XmlFragment.toDOM

#### Defined in

node_modules/yjs/dist/src/types/YXmlFragment.d.ts:133

___

### toJSON

▸ **toJSON**(): `any`

**`abstract`**

#### Returns

`any`

#### Inherited from

Y.XmlFragment.toJSON

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:118

___

### unobserve

▸ **unobserve**(`f`): `void`

Unregister an observer function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`arg0`: `YXmlEvent`, `arg1`: `Transaction`) => `void` | Observer function |

#### Returns

`void`

#### Inherited from

Y.XmlFragment.unobserve

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

Y.XmlFragment.unobserveDeep

#### Defined in

node_modules/yjs/dist/src/types/AbstractType.d.ts:113

___

### unshift

▸ **unshift**(`content`): `void`

Preppends content to this YArray.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | (`YXmlElement` \| `YXmlText`)[] | Array of content to preppend. |

#### Returns

`void`

#### Inherited from

Y.XmlFragment.unshift

#### Defined in

node_modules/yjs/dist/src/types/YXmlFragment.d.ts:182
