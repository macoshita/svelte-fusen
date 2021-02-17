<script lang="ts">
  import { fusens } from "../../stores";

  export let id: string;

  function deleteFusen() {
    fusens.update((v) => v.filter((fusen) => fusen.id !== id));
  }
</script>

<ion-icon class="button" name="close-circle-outline" on:click={deleteFusen} />

<style>
  .button {
    font-size: 32px;
    border-radius: 50%;
    background-color: white;
  }
</style>
