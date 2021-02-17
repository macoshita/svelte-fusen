<script lang="ts">
  import { fusenStore } from "../../stores";

  export let id: string;
</script>

<ion-icon
  class="button"
  name="close-circle-outline"
  on:click={fusenStore.delete(id)}
/>

<style>
  .button {
    font-size: 32px;
    border-radius: 50%;
    background-color: white;
  }
</style>
