<script>
  import TreeDrawer from './TreeDrawer.svelte'

  export let collection
</script>

{#each Object.keys(collection) as key}
  <li>
    <TreeDrawer value={collection[key]} label={key} />
  </li>
{/each}
