let port = chrome.runtime.connect()

window.addEventListener(
  'message',
  function(event) {
    port.postMessage(event.data)
  },
  false
)
