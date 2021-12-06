---
sidebar_position: 2
sidebar_label: Example
---

# Plain javascript example

Let's explore how _SyncedStore_ works using a vanilla Javascript example. It's good to understand the basics, although you might want to skip ahead immediately to the [React](../react) or [Vue](../vue) examples.

In the example below, we create a SyncedStore _store_ with two properties: an array `myArray` and an object `myObject`. These are defined in _store.js_. The example then demonstrates how you can add some (random) values to the array `myArray` (by clicking the first button), or how you can set a property on `myObject` (click the second button).

In the code, you can see that adding a value to an array that is shared across users is as simple as calling `store.myArray.push({ property: "value" });`. And changing / adding a propery is done like a regular property assignment: `store.myObject.property = "value";`.

```javascript live plain
import { observeDeep } from "@syncedstore/core";
import { store } from "./store";

const root = document.getElementById("app");

// Display the contents of the store
const jsonView = document.createElement("pre");
jsonView.innerText = JSON.stringify(store, undefined, 2);
root.appendChild(jsonView);

// Add a button to add some values to store.myArray
const addElementBtn = document.createElement("button");
addElementBtn.innerText = "Add values to array";
addElementBtn.onclick = () => {
  // Add an object to the array
  store.myArray.push({ property: "value" });

  // Add a random number between 0 and 100 to the array
  store.myArray.push(Math.floor(Math.random() * 100));
};
root.appendChild(addElementBtn);

// Add a button to set a property on store.myObject

// Which property to change?
const inputPropertyName = document.createElement("input");
inputPropertyName.value = "myProp";
root.appendChild(inputPropertyName);

// What value to set to the property?
const inputPropertyValue = document.createElement("input");
inputPropertyValue.value = "myValue";
root.appendChild(inputPropertyValue);

// Add the actual button to change a property
const setPropertBtn = document.createElement("button");
setPropertBtn.innerText = "Change a property on the object";
setPropertBtn.onclick = () => {
  // Change a property on myObject
  store.myObject[inputPropertyName.value] = inputPropertyValue.value;
};
root.appendChild(setPropertBtn);

// Automatically update jsonView when the store changes
//
// (note that in most applications, you won't use observeDeep
// but rely on SyncedStore's reactive updating mechanism instead)
observeDeep(store, () => {
  jsonView.innerText = JSON.stringify(store, undefined, 2);
});

// Set the store on the window object
// If you like, you can now play around with the store
// and change values using the Browser inspector
window.store = store;
```

<p></p>

:::tip Tip: Working with the live examples

Throughout the documentation, you'll find live examples that you can edit.
The results of the code are displayed twice (side-by-side) and can be seen as two different "users" using your app.

**Simulating offline behaviour**

You can set one side to _offline_, which simulates an offline user. You can then make changes (on that side or the other side), and set the user to _online_ again. This way, you can experience how changes are synced when users make simultaneous edits to the store.

**Inspecting the store**

Use the _Inspect_ button to inspect the current value of the store and see how the store updates while you make changes.

<small>Note: the example above uses Javascript, most of the other examples on this website are written in Typescript</small>
:::
