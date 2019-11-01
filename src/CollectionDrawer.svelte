<script>
  import ArrayDrawer from './ArrayDrawer.svelte'
  import ObjectDrawer from './ObjectDrawer.svelte'

  export let label = ''
  export let collection
  export let openingSymbol
  export let closingSymbol

  let collapsed

  const toggleCollapse = () => {
    collapsed = !collapsed
  }
</script>

<span class="collapsible" on:click={toggleCollapse}>
  {label ? `${label}: ` : ''}{openingSymbol}
</span>
<ul class:collapsed>
  {#if Array.isArray(collection)}
    <ArrayDrawer {collection} />
  {:else if typeof collection === 'object'}
    <ObjectDrawer {collection} />
  {/if}
</ul>
<span>{closingSymbol}</span>

<style>
  span.collapsible:hover {
    cursor: pointer;
    background: darkslategray;
  }

  span.collapsible:hover + ul,
  span.collapsible:hover ~ span {
    background: darkslategray;
  }

  .collapsed {
    display: none;
  }
</style>
