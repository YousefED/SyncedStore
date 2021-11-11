<script>
  import { createEventDispatcher } from "svelte";

  let reloadVar = false;

  const reload = () => {
    console.log("saotehusaotehu");
    reloadVar = !reloadVar;
  };
</script>

<div on:yjs={reload}>{reloadVar}</div>
<button on:click={reload}>saoetnuhsonaethusnaotehusnh</button>
