<script>
  import { onMount } from 'svelte'
  import { runtime, devtools } from 'chrome'
  export let name

  let stuff = 'nothing'

  onMount(async () => {
    stuff = 'something'
    let port = runtime.connect()

    port.postMessage({
      type: 'SVELTE_STORES_ADDON_REQUEST',
      tabId: devtools.inspectedWindow.tabId,
    })
    port.onMessage.addListener(event => {
      console.log(event)
      stuff = JSON.stringify(event)
    })
  })
</script>

<pre>{stuff}</pre>

<style>
  :global(html) {
    height: 100%;
  }
  :global(body) {
    display: flex;
    margin: 0;
    height: 100%;
    color: rgb(74, 74, 79);
    font-size: 11px;
    font-family: monospace;
  }
  :global(body.dark) {
    color: rgb(177, 177, 179);
    background-color: rgb(42, 42, 46);
    scrollbar-color: rgb(115, 115, 115) rgb(60, 60, 61);
  }
  :global(body.dark ::-webkit-scrollbar) {
    width: 14px;
    height: 14px;
    background-color: transparent;
    box-shadow: inset 0 0 1px rgba(255, 255, 255, 0.5);
  }
  :global(body.dark ::-webkit-scrollbar-thumb) {
    background-color: rgb(51, 51, 51);
    box-shadow: inset 0 0 1px rgba(255, 255, 255, 0.5);
  }
  :global(body.dark.chrome) {
    background-color: rgb(36, 36, 36);
  }
  :global(ul) {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
