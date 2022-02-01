const wrapperCode = `<script>
import App from "./App.svelte";
import { connect, disconnect, svelteStore } from "./store";

let inspecting = false;
</script>

<main id="wrap">
  <div>
    <div class="toolbar">
      <label>
        <input type="radio" name="sync" checked on:change={connect} />
        Online (enable sync)
      </label>
      <label>
        <input type="radio" name="sync" on:change={disconnect} /> Offline
        (disable sync)
      </label>
      {#if inspecting}
        <button on:click={() => inspecting = false}>Back</button>
      {:else}
        <button on:click={() => inspecting = true}>Inspect</button>
      {/if}
    </div>
    <div className="wrapper">
    {#if inspecting}
      <pre >{ JSON.stringify($svelteStore, undefined, 2) }</pre>
    {:else}
      <App />
    {/if}
    </div>
  </div>
</main>

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

const indexCode = `import Wrap from "./Wrap.svelte";

const app = new Wrap({
  target: document.body
});

export default app;`;

export const SVELTE_TEMPLATE = {
  files: {
    "/Wrap.svelte": {
      code: wrapperCode,
      hidden: true,
    },
    "/index.js": {
      code: indexCode,
      hidden: true,
    },
  },
};
