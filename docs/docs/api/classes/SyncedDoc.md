---
id: "SyncedDoc"
title: "Class: SyncedDoc"
sidebar_label: "SyncedDoc"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Doc`

  ↳ **`SyncedDoc`**

## Constructors

### constructor

• **new SyncedDoc**(`[opts]?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `[opts]?` | `DocOpts` | configuration |

#### Inherited from

Y.Doc.constructor

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:19

## Properties

### \_item

• **\_item**: ``null`` \| `Item`

If this document is a subdocument - a document integrated into another document - then _item is defined.

#### Inherited from

Y.Doc.\_item

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:46

___

### \_observers

• **\_observers**: `Map`<`string`, `any`\>

Some desc.

#### Inherited from

Y.Doc.\_observers

#### Defined in

node_modules/lib0/observable.d.ts:11

___

### \_transaction

• **\_transaction**: ``null`` \| `Transaction`

#### Inherited from

Y.Doc.\_transaction

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:33

___

### \_transactionCleanups

• **\_transactionCleanups**: `Transaction`[]

#### Inherited from

Y.Doc.\_transactionCleanups

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:37

___

### autoLoad

• **autoLoad**: `boolean`

#### Inherited from

Y.Doc.autoLoad

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:48

___

### clientID

• **clientID**: `number`

#### Inherited from

Y.Doc.clientID

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:22

___

### collectionid

• **collectionid**: ``null`` \| `string`

#### Inherited from

Y.Doc.collectionid

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:24

___

### gc

• **gc**: `boolean`

#### Inherited from

Y.Doc.gc

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:20

___

### gcFilter

• **gcFilter**: (`arg0`: `Item`) => `boolean`

#### Type declaration

▸ (`arg0`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg0` | `Item` |

##### Returns

`boolean`

#### Inherited from

Y.Doc.gcFilter

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:21

___

### guid

• **guid**: `string`

#### Inherited from

Y.Doc.guid

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:23

___

### meta

• **meta**: `any`

#### Inherited from

Y.Doc.meta

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:49

___

### share

• **share**: `Map`<`string`, `AbstractType`<`YEvent`\>\>

#### Inherited from

Y.Doc.share

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:28

___

### shouldLoad

• **shouldLoad**: `boolean`

#### Inherited from

Y.Doc.shouldLoad

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:47

___

### store

• **store**: `StructStore`

#### Inherited from

Y.Doc.store

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:29

___

### subdocs

• **subdocs**: `Set`<`Doc`\>

#### Inherited from

Y.Doc.subdocs

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:41

## Methods

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Inherited from

Y.Doc.destroy

#### Defined in

node_modules/lib0/observable.d.ts:37

___

### emit

▸ **emit**(`name`, `args`): `void`

Emit a named event. All registered event listeners that listen to the
specified name will receive the event.

**`todo`** This should catch exceptions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The event name. |
| `args` | `any`[] | The arguments that are applied to the event listener. |

#### Returns

`void`

#### Inherited from

Y.Doc.emit

#### Defined in

node_modules/lib0/observable.d.ts:36

___

### get

▸ **get**(`name`, `TypeConstructor?`): `AbstractType`<`any`\>

Define a shared data type.

Multiple calls of `y.get(name, TypeConstructor)` yield the same result
and do not overwrite each other. I.e.
`y.define(name, Y.Array) === y.define(name, Y.Array)`

After this method is called, the type is also available on `y.share.get(name)`.

*Best Practices:*
Define all types right after the Yjs instance is created and store them in a separate object.
Also use the typed methods `getText(name)`, `getArray(name)`, ..

**`example`**
  const y = new Y(..)
  const appState = {
    document: y.getText('document')
    comments: y.getArray('comments')
  }

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` |  |
| `TypeConstructor?` | `Function` | The constructor of the type definition. E.g. Y.Text, Y.Array, Y.Map, ... |

#### Returns

`AbstractType`<`any`\>

The created type. Constructed with TypeConstructor

#### Inherited from

Y.Doc.get

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:98

___

### getArray

▸ **getArray**<`T`\>(`name?`): `YArray`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Returns

`YArray`<`T`\>

#### Inherited from

Y.Doc.getArray

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:106

___

### getMap

▸ **getMap**<`T_1`\>(`name?`): `YMap`<`T_1`\>

#### Type parameters

| Name |
| :------ |
| `T_1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Returns

`YMap`<`T_1`\>

#### Inherited from

Y.Doc.getMap

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:121

___

### getSubdocGuids

▸ **getSubdocGuids**(): `Set`<`string`\>

#### Returns

`Set`<`string`\>

#### Inherited from

Y.Doc.getSubdocGuids

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:59

___

### getSubdocs

▸ **getSubdocs**(): `Set`<`Doc`\>

#### Returns

`Set`<`Doc`\>

#### Inherited from

Y.Doc.getSubdocs

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:58

___

### getText

▸ **getText**(`name?`): `YText`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Returns

`YText`

#### Inherited from

Y.Doc.getText

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:113

___

### getXmlFragment

▸ **getXmlFragment**(`name?`): `YXmlFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Returns

`YXmlFragment`

#### Inherited from

Y.Doc.getXmlFragment

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:128

___

### load

▸ **load**(): `void`

Notify the parent document that you request to load data into this subdocument (if it is a subdocument).

`load()` might be used in the future to request any provider to load the most current data.

It is safe to call `load()` multiple times.

#### Returns

`void`

#### Inherited from

Y.Doc.load

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:57

___

### off

▸ **off**(`name`, `f`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `f` | `Function` |

#### Returns

`void`

#### Inherited from

Y.Doc.off

#### Defined in

node_modules/lib0/observable.d.ts:26

___

### on

▸ **on**(`name`, `f`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `f` | `Function` |

#### Returns

`void`

#### Inherited from

Y.Doc.on

#### Defined in

node_modules/lib0/observable.d.ts:16

___

### once

▸ **once**(`name`, `f`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `f` | `Function` |

#### Returns

`void`

#### Inherited from

Y.Doc.once

#### Defined in

node_modules/lib0/observable.d.ts:21

___

### toJSON

▸ **toJSON**(): `Object`

Converts the entire document into a js object, recursively traversing each yjs type
Doesn't log types that have not been defined (using ydoc.getType(..)).

**`deprecated`** Do not use this method and rather call toJSON directly on the shared types.

#### Returns

`Object`

#### Inherited from

Y.Doc.toJSON

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:137

___

### transact

▸ **transact**(`f`, `origin?`): `void`

Changes that happen inside of a transaction are bundled. This means that
the observer fires _after_ the transaction is finished and that all changes
that happened inside of the transaction are sent as one message to the
other peers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`arg0`: `Transaction`) => `void` | The function that should be executed as a transaction |
| `origin?` | `any` | - |

#### Returns

`void`

#### Inherited from

Y.Doc.transact

#### Defined in

node_modules/yjs/dist/src/utils/Doc.d.ts:71
