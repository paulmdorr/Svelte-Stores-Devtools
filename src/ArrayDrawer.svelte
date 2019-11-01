<script>
  import TreeDrawer from './TreeDrawer.svelte'

  export let collection
</script>

{#each collection as element}
  <li>
    <TreeDrawer value={element} />
  </li>
{/each}
