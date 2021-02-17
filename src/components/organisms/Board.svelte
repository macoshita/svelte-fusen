<script lang="ts">
  import { fusenStore } from "../../stores";
  import Fusen from "../molecules/Fusen.svelte";
</script>

<div
  class="board"
  on:dblclick|self={(e) => fusenStore.add(e.clientX, e.clientY)}
>
  {#each $fusenStore as fusen (fusen.id)}
    <div
      class="fusen-wrapper"
      style="
        left: {fusen.x}px;
        top: {fusen.y}px;
      "
    >
      <Fusen bind:data={fusen} />
    </div>
  {/each}

  <div class="debug">
    <ul>
      {#each $fusenStore as fusen (fusen.id)}
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

  .fusen-wrapper {
    position: absolute;
  }

  .debug {
    position: absolute;
    bottom: 10px;
    left: 10px;
    background-color: #ccc;
  }
</style>
