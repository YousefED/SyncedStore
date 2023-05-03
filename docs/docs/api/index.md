---
id: "index"
title: "@syncedstore/core"
slug: "/api/"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## References

### default

Renames and re-exports [syncedStore](#syncedstore)

## Functions

### areSame

▸ **areSame**(`objectA`, `objectB`): `boolean`

Check whether two objects represent the same value.
A strict equality (===) check doesn't always work,
because SyncedStore can wrap the object with a Proxy depending on where you retrieved it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `objectA` | `any` | Object to compare with objectB |
| `objectB` | `any` | Object to compare with objectA |

#### Returns

`boolean`

true if they represent the same object, false otherwise

#### Defined in

[packages/core/src/index.ts:102](https://github.com/YousefED/SyncedStore/blob/3824e9a/packages/core/src/index.ts#L102)

___

### boxed

▸ **boxed**<`T`\>(`value`): `Box`<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `JSONValue` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`Box`<`T`\>

#### Defined in

[packages/core/src/boxed.ts:10](https://github.com/YousefED/SyncedStore/blob/3824e9a/packages/core/src/boxed.ts#L10)

___

### enableMobxBindings

▸ **enableMobxBindings**(`mobx`): `void`

Enable MobX integration

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mobx` | `any` | An instance of mobx, e.g. import * as mobx from "mobx"; |

#### Returns

`void`

#### Defined in

[packages/yjs-reactive-bindings/src/observableProvider.ts:46](https://github.com/YousefED/SyncedStore/blob/3824e9a/packages/yjs-reactive-bindings/src/observableProvider.ts#L46)

___

### enableVueBindings

▸ **enableVueBindings**(`vue`): `void`

Enable Vue3 integration

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vue` | `any` | An instance of Vue or Vue reactivity, e.g. import * as Vue from "vue"; |

#### Returns

`void`

#### Defined in

[packages/yjs-reactive-bindings/src/observableProvider.ts:56](https://github.com/YousefED/SyncedStore/blob/3824e9a/packages/yjs-reactive-bindings/src/observableProvider.ts#L56)

___

### filterArray

▸ **filterArray**<`T`\>(`arr`, `filter`): `void`

Filter a SyncedStore array

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `T`[] | array to filter |
| `filter` | (`obj`: `T`) => `boolean` | predicate to filter the array `arr` by |

#### Returns

`void`

#### Defined in

[packages/core/src/util.ts:6](https://github.com/YousefED/SyncedStore/blob/3824e9a/packages/core/src/util.ts#L6)

___

### getYjsDoc

▸ **getYjsDoc**<`T`\>(`store`): `Y.Doc`

Access the internal Yjs Doc.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `store` | `T` | a store returned by |

#### Returns

`Y.Doc`

the Yjs doc (Y.Doc) underneath.

#### Defined in

[packages/core/src/index.ts:67](https://github.com/YousefED/SyncedStore/blob/3824e9a/packages/core/src/index.ts#L67)

___

### getYjsValue

▸ **getYjsValue**(`object`): `Y.Doc` \| `Y.AbstractType`<`any`\> \| `undefined`

Access the internal Yjs value that backs the syncing of the passed in object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `any` | a value retrieved from the store |

#### Returns

`Y.Doc` \| `Y.AbstractType`<`any`\> \| `undefined`

the Yjs value underneath. This can be a Y.Doc, Y.Array, Y.Map or other Y-type based on the value passed in

#### Defined in

[packages/core/src/index.ts:81](https://github.com/YousefED/SyncedStore/blob/3824e9a/packages/core/src/index.ts#L81)

___

### observeDeep

▸ **observeDeep**(`object`, `handler`): () => `void`

Register a listener for when any changes to `object` or its nested objects occur.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `any` | the synced object (store, object, map, or Yjs value to observe) |
| `handler` | () => `void` | the callback to be raised. |

#### Returns

`fn`

a function to dispose (unregister) the handler

▸ (): `void`

Register a listener for when any changes to `object` or its nested objects occur.

##### Returns

`void`

a function to dispose (unregister) the handler

#### Defined in

[packages/core/src/index.ts:42](https://github.com/YousefED/SyncedStore/blob/3824e9a/packages/core/src/index.ts#L42)

___

### syncedStore

▸ **syncedStore**<`T`\>(`shape`, `doc?`): `MappedTypeDescription`<`T`\>

Create a SyncedStore store

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `DocTypeDescription` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shape` | `T` | an object that describes the root types of the store. e.g.:  const shape = {    exampleArrayData: [],    exampleObjectData: {},    exampleXMLData: "xml",    exampleTextData: "text", }; |
| `doc` | `Doc` | (optional) a Y.Doc to use as the backing system |

#### Returns

`MappedTypeDescription`<`T`\>

a SyncedStore store

#### Defined in

[packages/core/src/index.ts:130](https://github.com/YousefED/SyncedStore/blob/3824e9a/packages/core/src/index.ts#L130)
