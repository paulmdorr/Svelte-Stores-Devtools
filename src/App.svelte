<script>
  import { onMount } from 'svelte'
  import { runtime, devtools } from 'chrome'

  import TreeDrawer from './TreeDrawer.svelte'

  export let name

  let stores
  let currentStore
  let state = 0

  onMount(async () => {
    let port = runtime.connect()

    port.postMessage({
      type: 'SVELTE_STORES_ADDON_REQUEST',
      tabId: devtools.inspectedWindow.tabId,
    })
    port.onMessage.addListener(event => {
      stores = { ...event }
    })
  })

  const selectStore = e => {
    currentStore = e.target.value
  }

  $: firstState = currentStore && state === 0
  $: lastState = currentStore && state === stores[currentStore].length - 1
</script>

<main>
  {#if stores}
    <div class="select">
      <label for="stores">Stores:</label>
      <select name="stores" on:change={selectStore}>
        {#if !currentStore}
          <option>-- Please select an store --</option>
        {/if}
        {#each Object.keys(stores) as key}
          <option selected={currentStore === key}>{key}</option>
        {/each}
      </select>
    </div>
    <div class="buttons">
      <button on:click={() => (state -= 1)} disabled={firstState}>Prev</button>
      <button on:click={() => (state += 1)} disabled={lastState}>Next</button>
    </div>
    <div>
      {#if currentStore}
        <TreeDrawer value={stores[currentStore][state]} />
      {/if}
    </div>
  {:else}
    <div>Loading...</div>
  {/if}
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 30px 30px auto;
    width: 100%;
  }

  div.select {
    display: grid;
    grid-template-columns: 10% 90%;
  }

  select {
    height: 30px;
  }

  div.buttons {
    display: grid;
    grid-template-columns: 50% 50%;
  }

  :global(html) {
    height: 100%;
  }
  :global(body) {
    display: flex;
    margin: 0;
    height: 100%;
    color: #b1b1b3;
    background-color: #2a2a2e;
    scrollbar-color: #737373 #3c3c3d;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
      'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 12px;
  }
  :global(body ::-webkit-scrollbar) {
    width: 14px;
    height: 14px;
    background-color: transparent;
    box-shadow: inset 0 0 1px #ffffff80;
  }
  :global(body ::-webkit-scrollbar-thumb) {
    background-color: #333333;
    box-shadow: inset 0 0 1px #ffffff80;
  }
  :global(body.chrome) {
    background-color: #242424;
  }
  :global(ul) {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
