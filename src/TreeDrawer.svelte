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
    <div>
      <span class="label">{label ? `${label}: ` : ''}</span>
      <span class="string">{`'${value}'`}</span>
    </div>
  {:else}
    <div>
      <span class="label">{label ? `${label}: ` : ''}</span>
      <span class="number">{value}</span>
    </div>
  {/if}
{/if}

<style>
  div {
    font-family: monospace;
    font-size: 12px;
    padding-left: 10px;
  }

  :global(span.label) {
    color: #85acd8;
  }

  span.string {
    color: #a6ce6b;
  }

  span.number {
    color: #ca7fb1;
  }
</style>
