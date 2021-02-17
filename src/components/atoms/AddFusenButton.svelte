<script lang="ts">
  import { fusenStore } from "../../stores";
  import { v4 as uuidv4 } from "uuid";

  function addFusen() {
    fusenStore.update((fusens) => [
      ...fusens,
      { id: uuidv4(), x: 10, y: 10, description: "", color: "yellow" },
    ]);
  }
</script>

<button on:click={addFusen}>Add</button>
