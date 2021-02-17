<script lang="ts">
  import { fusenStore } from "../../stores";
  import Fusen from "../molecules/Fusen.svelte";
</script>

<div
  class="board"
  on:dblclick|self={(e) => fusenStore.add(e.clientX, e.clientY)}
>
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
