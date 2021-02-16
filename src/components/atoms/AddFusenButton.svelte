<script lang="ts">
  import { fusens } from "../../stores";
  import { v4 as uuidv4 } from "uuid";

  function addFusen() {
    fusens.update((v) => [
      ...v,
      { id: uuidv4(), x: 10, y: 10, description: "", color: "yellow" },
    ]);
  }
</script>

<button on:click={addFusen}>Add</button>
