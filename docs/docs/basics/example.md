---
sidebar_position: 2
sidebar_label: Example
---

# Plain javascript example

Let's explore how _SyncedStore_ works using a vanilla Javascript example. It's good to understand the basics, although you might want to skip ahead immediately to the [React](../react) or [Vue](../vue) examples.

```javascript live plain
import { observeDeep } from "@syncedstore/core";
import { store } from "./store";

const el = document.getElementById("app");

// Display the contents of the store
const jsonView = document.createElement("div");
jsonView.innerText = JSON.stringify(store);
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
  jsonView.innerText = JSON.stringify(store);
});

// Set the store on the window object
// If you like, you can now play around with the store
// and change values using the Browser inspector
window.store = store;
```
