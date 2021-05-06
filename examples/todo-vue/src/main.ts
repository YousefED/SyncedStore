// Full spec-compliant TodoMVC with localStorage persistence
// and hash-based routing in ~120 effective lines of JavaScript.

import * as Vue from "vue";
import App from "./App.vue";

import { setObservableFunctions } from "@reactivedata/yjs-reactive-bindings";
import { reactive } from "vue";
import { crdt, Y } from "@reactivedata/reactive-crdt";

setObservableFunctions(
  function(name: any, obo: any) {
    let id = 0;
    const data = reactive({ data: id });
    const atom = {
      reportObserved() {
        return (data.data as any) as boolean;
      },
      reportChanged() {
        data.data = ++id;
      }
    };
    if (obo) {
      obo();
    }
    return atom;
  },
  () => {}
);
const app = Vue.createApp(App);

// mount
const vm = app.mount("#app") as any;

function onHashChange() {
  const visibility = window.location.hash.replace(/#\/?/, "");
  if (["all", "active", "completed"].includes(visibility)) {
    vm.visibility = visibility;
  } else {
    window.location.hash = "";
    vm.visibility = "all";
  }
}

window.addEventListener("hashchange", onHashChange);
onHashChange();
