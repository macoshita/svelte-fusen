<script lang="ts">
  import { fusenStore } from "../../stores";
  import Fusen from "../molecules/Fusen.svelte";
  import AddFusenButton from "../atoms/AddFusenButton.svelte";
</script>

<div class="board">
  <div class="tools">
    <AddFusenButton />
  </div>

  {#each $fusenStore as fusen}
    <Fusen bind:data={fusen} />
  {/each}

  <div class="debug">
    <ul>
      {#each $fusenStore as fusen}
        <li>ID {fusen.id}<br />{fusen.description}</li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .tools {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  .board {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .debug {
    position: absolute;
    bottom: 10px;
    left: 10px;
    background-color: #ccc;
  }
</style>
