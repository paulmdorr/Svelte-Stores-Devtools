<script>
  import CollectionDrawer from './CollectionDrawer.svelte'

  export let value
  export let label = ''
</script>

{#if Array.isArray(value)}
  <div>
    <CollectionDrawer
      collection={value}
      {label}
      openingSymbol="&lbrack;"
      closingSymbol="&rbrack;" />
  </div>
{:else if typeof value === 'object'}
  <div>
    <CollectionDrawer
      collection={value}
      {label}
      openingSymbol="&lbrace;"
      closingSymbol="&rbrace;" />
  </div>
{:else}
  {#if typeof value === 'string'}
    <div>{label ? `${label}: ` : ''}{`'${value}'`}</div>
  {:else}
    <div>{label ? `${label}: ` : ''}{value}</div>
  {/if}
{/if}

<style>
  div {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
      'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 14px;
    padding-left: 10px;
  }
</style>
