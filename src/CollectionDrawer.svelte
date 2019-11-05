<script>
  import ArrayDrawer from './ArrayDrawer.svelte'
  import ObjectDrawer from './ObjectDrawer.svelte'

  export let label = ''
  export let collection
  export let openingSymbol
  export let closingSymbol

  const MAX_LENGTH = 50
  let collapsed
  let stringCollection = (function() {
    let result = ''
    let length = MAX_LENGTH

    const stringObject = JSON.stringify(collection)
    length =
      MAX_LENGTH < stringObject.length - 1
        ? MAX_LENGTH
        : stringObject.length - 2

    result = stringObject.substr(1, length)

    return length === MAX_LENGTH ? `${result}…` : result
  })()

  const toggleCollapse = () => {
    collapsed = !collapsed
  }
</script>

<span class="collapsible" on:click={toggleCollapse}>
  <span>
    {#if collapsed}&#9658;{:else}&#9660;{/if}
  </span>
  <span class="label">{label ? `${label}: ` : ''}</span>
</span>
<span>{openingSymbol}</span>
{#if !collapsed}
  <ul>
    {#if Array.isArray(collection)}
      <ArrayDrawer {collection} />
    {:else}
      <ObjectDrawer {collection} />
    {/if}
  </ul>
{:else}
  <span>{stringCollection}</span>
{/if}
<span>{closingSymbol}</span>

<style>
  span.collapsible:hover {
    cursor: pointer;
    background: #4f4f57;
  }

  span.collapsible:hover + ul,
  span.collapsible:hover ~ span {
    background: #4f4f57;
  }
</style>
