---
id: "modules"
title: "@syncedstore/core"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Type aliases

### NestedSchemaType

Ƭ **NestedSchemaType**: `JSONValue` \| [`ObjectSchemaType`](modules#objectschematype) \| `Box`<`any`\> \| `Y.AbstractType`<`any`\> \| [`NestedSchemaType`](modules#nestedschematype)[]

#### Defined in

[packages/core/src/index.ts:70](https://github.com/YousefED/syncedstore/blob/7abdad1/packages/core/src/index.ts#L70)

---

### ObjectSchemaType

Ƭ **ObjectSchemaType**: `Object`

#### Index signature

▪ [key: `string`]: [`NestedSchemaType`](modules#nestedschematype)

#### Defined in

[packages/core/src/index.ts:72](https://github.com/YousefED/syncedstore/blob/7abdad1/packages/core/src/index.ts#L72)

## Variables

### INTERNAL_SYMBOL

• **INTERNAL_SYMBOL**: typeof [`INTERNAL_SYMBOL`](modules#internal_symbol)

#### Defined in

[packages/core/src/index.ts:16](https://github.com/YousefED/syncedstore/blob/7abdad1/packages/core/src/index.ts#L16)

## Functions

### crdt

▸ **crdt**<`T`\>(`doc`, `initialValue`): `MappedTypeDescription`<`T`\>

#### Type parameters

| Name | Type                         |
| :--- | :--------------------------- |
| `T`  | extends `DocTypeDescription` |

#### Parameters

| Name           | Type  |
| :------------- | :---- |
| `doc`          | `Doc` |
| `initialValue` | `T`   |

#### Returns

`MappedTypeDescription`<`T`\>

#### Defined in

[packages/core/src/index.ts:64](https://github.com/YousefED/syncedstore/blob/7abdad1/packages/core/src/index.ts#L64)

---

### crdtValue

▸ **crdtValue**<`T`\>(`value`): `CRDTArray`<`any`\> \| `CRDTObject`<`any`\> \| `T` & `string` \| `T` & `YXmlFragment` \| `T` & `YXmlHook` \| `T` & `YText` \| `T` & `Box`<`any`\> \| `T` & `number` \| `T` & `false` & `T` & `true`

#### Type parameters

| Name | Type                                                   |
| :--- | :----------------------------------------------------- |
| `T`  | extends [`NestedSchemaType`](modules#nestedschematype) |

#### Parameters

| Name    | Type                                      |
| :------ | :---------------------------------------- |
| `value` | `T` \| `YArray`<`any`\> \| `YMap`<`any`\> |

#### Returns

`CRDTArray`<`any`\> \| `CRDTObject`<`any`\> \| `T` & `string` \| `T` & `YXmlFragment` \| `T` & `YXmlHook` \| `T` & `YText` \| `T` & `Box`<`any`\> \| `T` & `number` \| `T` & `false` & `T` & `true`

#### Defined in

[packages/core/src/index.ts:32](https://github.com/YousefED/syncedstore/blob/7abdad1/packages/core/src/index.ts#L32)

---

### filterArray

▸ **filterArray**<`T`\>(`arr`, `filter`): `void`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name     | Type                      |
| :------- | :------------------------ |
| `arr`    | `T`[]                     |
| `filter` | (`obj`: `T`) => `boolean` |

#### Returns

`void`

#### Defined in

[packages/core/src/util.ts:1](https://github.com/YousefED/syncedstore/blob/7abdad1/packages/core/src/util.ts#L1)

---

### getYjsValue

▸ **getYjsValue**(`object`): `CRDTArray`<`any`\> \| `CRDTObject`<`any`\> \| `undefined`

#### Parameters

| Name     | Type  |
| :------- | :---- |
| `object` | `any` |

#### Returns

`CRDTArray`<`any`\> \| `CRDTObject`<`any`\> \| `undefined`

#### Defined in

[packages/core/src/index.ts:26](https://github.com/YousefED/syncedstore/blob/7abdad1/packages/core/src/index.ts#L26)

---

### getInternalArray

▸ **getInternalArray**<`T`\>(`object`): `YArray`<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name     | Type              |
| :------- | :---------------- |
| `object` | `CRDTArray`<`T`\> |

#### Returns

`YArray`<`T`\>

#### Defined in

[packages/core/src/index.ts:22](https://github.com/YousefED/syncedstore/blob/7abdad1/packages/core/src/index.ts#L22)

---

### getInternalMap

▸ **getInternalMap**<`T`\>(`object`): `YMap`<`T`\>

#### Type parameters

| Name | Type                                                   |
| :--- | :----------------------------------------------------- |
| `T`  | extends [`ObjectSchemaType`](modules#objectschematype) |

#### Parameters

| Name     | Type               |
| :------- | :----------------- |
| `object` | `CRDTObject`<`T`\> |

#### Returns

`YMap`<`T`\>

#### Defined in

[packages/core/src/index.ts:18](https://github.com/YousefED/syncedstore/blob/7abdad1/packages/core/src/index.ts#L18)

---

### useMobxBindings

▸ **useMobxBindings**(`mobx`): `void`

#### Parameters

| Name   | Type  |
| :----- | :---- |
| `mobx` | `any` |

#### Returns

`void`

#### Defined in

[packages/yjs-reactive-bindings/src/observableProvider.ts:29](https://github.com/YousefED/syncedstore/blob/7abdad1/packages/yjs-reactive-bindings/src/observableProvider.ts#L29)

---

### useVueBindings

▸ **useVueBindings**(`vue`): `void`

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `vue` | `any` |

#### Returns

`void`

#### Defined in

[packages/yjs-reactive-bindings/src/observableProvider.ts:33](https://github.com/YousefED/syncedstore/blob/7abdad1/packages/yjs-reactive-bindings/src/observableProvider.ts#L33)
