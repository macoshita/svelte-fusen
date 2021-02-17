<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import { pannable } from "../../actions/pannable";
  import { fusenMinHeight, fusenMinWidth } from "../../consts";
  import type { FusenType } from "../../stores"; // https://github.com/pyoner/svelte-typescript/issues/23
  import DeleteFusenButton from "../atoms/DeleteFusenButton.svelte";

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
</script>

<div
  class="fusen"
  style="background-color: {data.color};"
  transition:fly={{ y: -32 }}
  use:pannable
  on:panmove={handlePanMove}
  on:mouseenter={showDeleteButton}
  on:mouseleave={hideDeleteButton}
>
  <div
    class="content"
    style="
      min-width: {fusenMinWidth}px;
      min-height: {fusenMinHeight}px;
    "
    role="textbox"
    contenteditable
    bind:textContent={data.description}
  />

  {#if isShowDeleteButton}
    <div class="delete-button-wrapper" transition:fade>
      <DeleteFusenButton id={data.id} />
    </div>
  {/if}
</div>

<style>
  .fusen {
    position: relative;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  }

  .content {
    padding: 16px;
    box-sizing: border-box;
  }

  .delete-button-wrapper {
    position: absolute;
    right: -16px;
    top: -16px;
    transition: transform 0.2s ease-in-out;
  }

  .delete-button-wrapper:hover {
    transform: scale(1.2);
  }
</style>
