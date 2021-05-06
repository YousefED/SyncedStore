---
id: "modules"
title: "@reactivedata/reactive-crdt"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

# @reactivedata/reactive-crdt

## Type aliases

### NestedSchemaType

Ƭ **NestedSchemaType**: JSONValue \| [*ObjectSchemaType*](modules.md#objectschematype) \| *Raw*<any\> \| [*NestedSchemaType*](modules.md#nestedschematype)[]

Defined in: [packages/reactive-crdt/src/index.ts:57](https://github.com/YousefED/reactive-crdt/blob/1db6b21/packages/reactive-crdt/src/index.ts#L57)

___

### ObjectSchemaType

Ƭ **ObjectSchemaType**: *object*

#### Type declaration

Defined in: [packages/reactive-crdt/src/index.ts:59](https://github.com/YousefED/reactive-crdt/blob/1db6b21/packages/reactive-crdt/src/index.ts#L59)

## Variables

### INTERNAL\_SYMBOL

• `Const` **INTERNAL\_SYMBOL**: *typeof* [*INTERNAL\_SYMBOL*](modules.md#internal_symbol)

Defined in: [packages/reactive-crdt/src/index.ts:14](https://github.com/YousefED/reactive-crdt/blob/1db6b21/packages/reactive-crdt/src/index.ts#L14)

## Functions

### crdt

▸ **crdt**<T\>(`doc`: Y.Doc): *CRDTObject*<T\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*ObjectSchemaType*](modules.md#objectschematype) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `doc` | Y.Doc |

**Returns:** *CRDTObject*<T\>

Defined in: [packages/reactive-crdt/src/index.ts:53](https://github.com/YousefED/reactive-crdt/blob/1db6b21/packages/reactive-crdt/src/index.ts#L53)

___

### crdtValue

▸ **crdtValue**<T\>(`value`: T \| *Y.Array*<any\> \| *Y.Map*<any\>): *CRDTArray*<any\> \| *CRDTObject*<any\> \| T & *string* \| T & *Raw*<any\> \| T & *number* \| T & ``false`` \| T & ``true``

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*NestedSchemaType*](modules.md#nestedschematype) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | T \| *Y.Array*<any\> \| *Y.Map*<any\> |

**Returns:** *CRDTArray*<any\> \| *CRDTObject*<any\> \| T & *string* \| T & *Raw*<any\> \| T & *number* \| T & ``false`` \| T & ``true``

Defined in: [packages/reactive-crdt/src/index.ts:30](https://github.com/YousefED/reactive-crdt/blob/1db6b21/packages/reactive-crdt/src/index.ts#L30)

___

### getInternalAny

▸ **getInternalAny**(`object`: *any*): *CRDTArray*<any\> \| *CRDTObject*<any\> \| *undefined*

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | *any* |

**Returns:** *CRDTArray*<any\> \| *CRDTObject*<any\> \| *undefined*

Defined in: [packages/reactive-crdt/src/index.ts:24](https://github.com/YousefED/reactive-crdt/blob/1db6b21/packages/reactive-crdt/src/index.ts#L24)

___

### getInternalArray

▸ **getInternalArray**<T\>(`object`: *CRDTArray*<T\>): *YArray*<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | *CRDTArray*<T\> |

**Returns:** *YArray*<T\>

Defined in: [packages/reactive-crdt/src/index.ts:20](https://github.com/YousefED/reactive-crdt/blob/1db6b21/packages/reactive-crdt/src/index.ts#L20)

___

### getInternalMap

▸ **getInternalMap**<T\>(`object`: *CRDTObject*<T\>): *YMap*<T\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*ObjectSchemaType*](modules.md#objectschematype) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | *CRDTObject*<T\> |

**Returns:** *YMap*<T\>

Defined in: [packages/reactive-crdt/src/index.ts:16](https://github.com/YousefED/reactive-crdt/blob/1db6b21/packages/reactive-crdt/src/index.ts#L16)

___

### useMobxBindings

▸ **useMobxBindings**(`mobx`: *any*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `mobx` | *any* |

**Returns:** *void*

Defined in: [packages/yjs-reactive-bindings/src/observableProvider.ts:29](https://github.com/YousefED/reactive-crdt/blob/1db6b21/packages/yjs-reactive-bindings/src/observableProvider.ts#L29)

___

### useVueBindings

▸ **useVueBindings**(`vue`: *any*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `vue` | *any* |

**Returns:** *void*

Defined in: [packages/yjs-reactive-bindings/src/observableProvider.ts:33](https://github.com/YousefED/reactive-crdt/blob/1db6b21/packages/yjs-reactive-bindings/src/observableProvider.ts#L33)
