<script lang="ts">
  import { fly } from "svelte/transition";
  import { pannable } from "../../actions/pannable";
  import type { FusenType } from "../../stores"; // https://github.com/pyoner/svelte-typescript/issues/23

  export let data: FusenType;

  function handlePanMove({ detail }) {
    data = {
      ...data,
      x: data.x + detail.dx,
      y: data.y + detail.dy,
    };
  }
</script>

<div
  class="fusen"
  style="
left: {data.x}px;
top: {data.y}px;
background-color: {data.color};
"
  use:pannable
  on:panmove={handlePanMove}
  in:fly={{ y: -100, duration: 200 }}
  role="textbox"
  contenteditable
  bind:textContent={data.description}
/>

<style>
  .fusen {
    position: absolute;
    min-width: 160px;
    min-height: 80px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    padding: 16px;
    box-sizing: border-box;
  }
</style>
