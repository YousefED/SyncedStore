// TODO: implement a svelte version of this:
const wrapperCode = `
<template>
  <main id="wrap">
    <div>
      <div class="toolbar">
        <label>
          <input type="radio" name="sync" checked @change="connect" />
          Online (enable sync)
        </label>
        <label>
          <input type="radio" name="sync" @change="disconnect" /> Offline
          (disable sync)
        </label>
        <button v-if="inspecting" @click="inspecting = false">Back</button>
        <button v-if="!inspecting" @click="inspecting = true">Inspect</button>
      </div>
      <div className="wrapper">
        <pre v-if="inspecting">{{ JSON.stringify(store, undefined, 2) }}</pre>
        <app v-if="!inspecting" />
      </div>
    </div>
  </main>
</template>

<script>
import App from "./App";
import { connect, disconnect, store } from "./store";

export default {
  name: "Wrap",
  data() {
    return {
      store,
      inspecting: false,
    };
  },
  methods: {
    connect,
    disconnect,
  },
};
</script>

<style>

body {
    margin:0;
    padding:0;
}

.toolbar {
  border-bottom: 1px solid #e4e7eb;
  padding: 5px;
  background: #f8f9fb;
  font-size: 13px;
}

.toolbar input {
  position:relative;
  top:1px;
}

pre {
  text-align: left;
}
</style>
`;

// TODO: implement a svelte version of this:
const indexCode = `import { createApp } from "vue";
import Wrap from "./Wrap.vue";
import App from "./App.vue";

createApp(Wrap).component("app", App).mount("#app");`;

export const SVELTE_TEMPLATE = {
  files: {
    // "/src/Wrap.vue": {
    //   code: wrapperCode,
    //   hidden: true,
    // },
    // "/src/main.js": {
    //   code: indexCode,
    //   hidden: true,
    // },
  },
};
