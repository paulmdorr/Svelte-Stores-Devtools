const pages = new Map()
const devtools = new Map()

chrome.runtime.onConnect.addListener(listenerPort => {
  listenerPort.onMessage.addListener((msg, senderPort) => {
    const { type, storeData, name } = msg

    if (type === 'SVELTE_STORES_ADDON') {
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
        stores: updatedStores,
      })
      if (devtools.get(senderPort.sender.tab.id)) {
        devtools.get(senderPort.sender.tab.id).postMessage(updatedStores)
      }
    } else if (type === 'SVELTE_STORES_ADDON_REQUEST') {
      devtools.set(msg.tabId, senderPort)
      senderPort.postMessage(pages.get(msg.tabId).stores)
    }
    listenerPort.onDisconnect.addListener(listenerPort =>
      pages.delete(listenerPort.sender.tab.id)
    )
  })
})
