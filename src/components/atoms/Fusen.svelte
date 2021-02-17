<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import { pannable } from "../../actions/pannable";
  import { fusens } from "../../stores";
  import type { FusenType } from "../../stores"; // https://github.com/pyoner/svelte-typescript/issues/23

  export let data: FusenType;

  function handlePanMove({ detail }) {
    data = {
      ...data,
      x: data.x + detail.dx,
      y: data.y + detail.dy,
    };
  }

  let isShowDeleteButton = false;

  function showDeleteButton() {
    isShowDeleteButton = true;
  }
  function hideDeleteButton() {
    isShowDeleteButton = false;
  }

  function deleteFusen() {
    fusens.update((v) => v.filter((fusen) => fusen.id !== data.id));
  }
</script>

<div
  class="fusen"
  style="
left: {data.x}px;
top: {data.y}px;
background-color: {data.color};
"
  transition:fly={{ y: -100, duration: 200 }}
  use:pannable
  on:panmove={handlePanMove}
  on:mouseenter={showDeleteButton}
  on:mouseleave={hideDeleteButton}
>
  <div
    class="content"
    role="textbox"
    contenteditable
    bind:textContent={data.description}
  />
  {#if isShowDeleteButton}
    <ion-icon
      transition:fade
      class="close"
      name="close-circle-outline"
      on:click={deleteFusen}
    />
  {/if}
</div>

<style>
  .fusen {
    position: absolute;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }

  .close {
    position: absolute;
    right: -16px;
    top: -16px;
    font-size: 32px;
    border-radius: 50%;
    background-color: white;
  }

  .content {
    padding: 16px;
    min-width: 160px;
    min-height: 80px;
  }
</style>
