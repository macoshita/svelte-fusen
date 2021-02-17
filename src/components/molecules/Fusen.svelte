<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import { pannable } from "../../actions/pannable";
  import { fusenMinHeight, fusenMinWidth } from "../../consts";
  import type { FusenType } from "../../stores"; // https://github.com/pyoner/svelte-typescript/issues/23
  import DeleteFusenButton from "../atoms/DeleteFusenButton.svelte";

  export let data: FusenType;

  function handlePanMove({ detail }) {
    // 編集中は付箋を動かせない
    if (editing) {
      return;
    }
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

  let editableDiv: HTMLElement;
  let editing = false;
  let ignoreClick = false;

  function handleFusenMousedown() {
    ignoreClick = false;
  }

  function handleFusenMousemove() {
    // mousedown 後に動かしていたら無視
    ignoreClick = true;
  }

  function handleFusenClick() {
    if (ignoreClick) {
      return;
    }
    editing = true;
    setTimeout(() => {
      editableDiv.focus();
    }, 100);
  }

  function handleBlur() {
    editing = false;
  }
</script>

<div
  class="fusen"
  style="
    background-color: {data.color};
    --min-width: {fusenMinWidth}px;
    --min-height: {fusenMinHeight}px;
  "
  transition:fly={{ y: -32 }}
  use:pannable
  on:panmove={handlePanMove}
  on:mouseenter={showDeleteButton}
  on:mouseleave={hideDeleteButton}
>
  {#if editing}
    <div
      bind:this={editableDiv}
      class="content"
      role="textbox"
      contenteditable
      bind:innerHTML={data.description}
      on:blur={handleBlur}
    />
  {:else}
    <div
      class="content"
      on:mousedown={handleFusenMousedown}
      on:mousemove={handleFusenMousemove}
      on:click={handleFusenClick}
    >
      {@html data.description}
    </div>
  {/if}

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
    /* inline-block でないと改行が div になってしまう */
    display: inline-block;
    padding: 16px;
    box-sizing: border-box;
    min-width: var(--min-width);
    min-height: var(--min-height);
    vertical-align: middle;
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
