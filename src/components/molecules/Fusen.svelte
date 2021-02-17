<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import { pannable } from "../../actions/pannable";
  import type { FusenType } from "../../stores"; // https://github.com/pyoner/svelte-typescript/issues/23
  import DeleteFusenButton from "../atoms/DeleteFusenButton.svelte";
  import FusenContent from "../atoms/FusenContent.svelte";

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
  <FusenContent bind:description={data.description} />

  {#if isShowDeleteButton}
    <div class="delete-button-position" transition:fade>
      <DeleteFusenButton id={data.id} />
    </div>
  {/if}
</div>

<style>
  .fusen {
    position: absolute;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }

  .delete-button-position {
    position: absolute;
    right: -16px;
    top: -16px;
  }
</style>
