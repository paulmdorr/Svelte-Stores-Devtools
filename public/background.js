const pages = new Map()
const devtools = new Map()

chrome.runtime.onConnect.addListener(listenerPort => {
  listenerPort.onMessage.addListener((msg, senderPort) => {
    const { type, storeData, name } = msg

    if (type === 'SVELTE_STORES_ADDON') {
      console.log(msg)
      const { stores, ...currentPage } =
        pages.get(senderPort.sender.tab.id) || {}
      const updatedStores = stores
        ? {
            ...stores,
            [name]: stores[name] ? [...stores[name], storeData] : [storeData],
          }
        : { [name]: [storeData] }

      pages.set(senderPort.sender.tab.id, {
        ...currentPage,
        updatedStores,
      })
    } else if (type === 'SVELTE_STORES_ADDON_REQUEST') {
      console.log(msg)
      senderPort.postMessage(pages.get(msg.tabId))
    }
    listenerPort.onDisconnect.addListener(listenerPort =>
      pages.delete(listenerPort.sender.tab.id)
    )
  })
})
