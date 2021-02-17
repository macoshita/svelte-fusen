<script lang="ts">
  export let description: string;
</script>

<div
  class="content"
  role="textbox"
  contenteditable
  bind:textContent={description}
/>

<style>
  .content {
    padding: 16px;
    min-width: 160px;
    min-height: 80px;
  }
</style>
