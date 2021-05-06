// Full spec-compliant TodoMVC with localStorage persistence
// and hash-based routing in ~120 effective lines of JavaScript.

import * as Vue from "vue";
import App from "./App.vue";
import { useVueBindings } from "@reactivedata/reactive-crdt";

// make reactive-crdt use Vuejs internally
useVueBindings(Vue);

const app = Vue.createApp(App);
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
