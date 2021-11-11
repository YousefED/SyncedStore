---
id: "modules"
title: "@syncedstore/core"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [Box](classes/Box)

## References

### syncedStore

Renames and re-exports [default](modules#default)

## Type aliases

### NestedSchemaType

Ƭ **NestedSchemaType**: `JSONValue` \| [`ObjectSchemaType`](modules#objectschematype) \| [`Box`](classes/Box)<`any`\> \| `Y.AbstractType`<`any`\> \| [`NestedSchemaType`](modules#nestedschematype)[]

#### Defined in

[packages/core/src/index.ts:86](https://github.com/YousefED/reactive-crdt/blob/c37674d/packages/core/src/index.ts#L86)

___

### ObjectSchemaType

Ƭ **ObjectSchemaType**: `Object`

#### Index signature

▪ [key: `string`]: [`NestedSchemaType`](modules#nestedschematype)

#### Defined in

[packages/core/src/index.ts:88](https://github.com/YousefED/reactive-crdt/blob/c37674d/packages/core/src/index.ts#L88)

## Variables

### INTERNAL\_SYMBOL

• **INTERNAL\_SYMBOL**: typeof [`INTERNAL_SYMBOL`](modules#internal_symbol)

#### Defined in

[packages/core/src/index.ts:19](https://github.com/YousefED/reactive-crdt/blob/c37674d/packages/core/src/index.ts#L19)

___

### SyncedArray

• **SyncedArray**: typeof `YArray` = `Y.Array`

#### Defined in

[packages/core/src/index.ts:99](https://github.com/YousefED/reactive-crdt/blob/c37674d/packages/core/src/index.ts#L99)

___

### SyncedDoc

• **SyncedDoc**: typeof `Doc` = `Y.Doc`

#### Defined in

[packages/core/src/index.ts:97](https://github.com/YousefED/reactive-crdt/blob/c37674d/packages/core/src/index.ts#L97)

___

### SyncedMap

• **SyncedMap**: typeof `YMap` = `Y.Map`

#### Defined in

[packages/core/src/index.ts:98](https://github.com/YousefED/reactive-crdt/blob/c37674d/packages/core/src/index.ts#L98)

___

### SyncedText

• **SyncedText**: typeof `YText` = `Y.Text`

#### Defined in

[packages/core/src/index.ts:100](https://github.com/YousefED/reactive-crdt/blob/c37674d/packages/core/src/index.ts#L100)

___

### SyncedXml

• **SyncedXml**: typeof `YXmlFragment` = `Y.XmlFragment`

#### Defined in

[packages/core/src/index.ts:101](https://github.com/YousefED/reactive-crdt/blob/c37674d/packages/core/src/index.ts#L101)

## Functions

### areSame

▸ **areSame**(`objectA`, `objectB`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `objectA` | `any` |
| `objectB` | `any` |

#### Returns

`boolean`

#### Defined in

[packages/core/src/index.ts:30](https://github.com/YousefED/reactive-crdt/blob/c37674d/packages/core/src/index.ts#L30)

___

### boxed

▸ **boxed**<`T`\>(`value`): [`Box`](classes/Box)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `JSONValue` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

[`Box`](classes/Box)<`T`\>

#### Defined in

[packages/core/src/boxed.ts:6](https://github.com/YousefED/reactive-crdt/blob/c37674d/packages/core/src/boxed.ts#L6)

___

### crdtValue

▸ **crdtValue**<`T`\>(`value`): `CRDTArray`<`any`\> \| `T` & `string` \| `T` & `YXmlFragment` \| `T` & `YXmlHook` \| `T` & `YText` \| `T` & [`Box`](classes/Box)<`any`\> \| `CRDTObject`<`any`\> \| `T` & `number` \| `T` & ``false`` & `T` & ``true``

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`NestedSchemaType`](modules#nestedschematype) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` \| `YArray`<`any`\> \| `YMap`<`any`\> |

#### Returns

`CRDTArray`<`any`\> \| `T` & `string` \| `T` & `YXmlFragment` \| `T` & `YXmlHook` \| `T` & `YText` \| `T` & [`Box`](classes/Box)<`any`\> \| `CRDTObject`<`any`\> \| `T` & `number` \| `T` & ``false`` & `T` & ``true``

#### Defined in

[packages/core/src/index.ts:46](https://github.com/YousefED/reactive-crdt/blob/c37674d/packages/core/src/index.ts#L46)

___

### default

▸ **default**<`T`\>(`shape`, `doc?`): `MappedTypeDescription`<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `DocTypeDescription` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `shape` | `T` |
| `doc` | `Doc` |

#### Returns

`MappedTypeDescription`<`T`\>

#### Defined in

[packages/core/src/index.ts:78](https://github.com/YousefED/reactive-crdt/blob/c37674d/packages/core/src/index.ts#L78)

___

### enableMobxBindings

▸ **enableMobxBindings**(`mobx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mobx` | `any` |

#### Returns

`void`

#### Defined in

[packages/yjs-reactive-bindings/src/observableProvider.ts:41](https://github.com/YousefED/reactive-crdt/blob/c37674d/packages/yjs-reactive-bindings/src/observableProvider.ts#L41)

___

### enableVueBindings

▸ **enableVueBindings**(`vue`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vue` | `any` |

#### Returns

`void`

#### Defined in

[packages/yjs-reactive-bindings/src/observableProvider.ts:46](https://github.com/YousefED/reactive-crdt/blob/c37674d/packages/yjs-reactive-bindings/src/observableProvider.ts#L46)

___

### filterArray

▸ **filterArray**<`T`\>(`arr`, `filter`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |
| `filter` | (`obj`: `T`) => `boolean` |

#### Returns

`void`

#### Defined in

[packages/core/src/util.ts:1](https://github.com/YousefED/reactive-crdt/blob/c37674d/packages/core/src/util.ts#L1)

___

### getYjsValue

▸ **getYjsValue**(`object`): `Y.Doc` \| `Y.AbstractType`<`any`\> \| `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `any` |

#### Returns

`Y.Doc` \| `Y.AbstractType`<`any`\> \| `undefined`

#### Defined in

[packages/core/src/index.ts:21](https://github.com/YousefED/reactive-crdt/blob/c37674d/packages/core/src/index.ts#L21)
