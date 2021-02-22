/*
    Pioneer Platform
      Browser Extension



 */

/*
    OnStart()
 */



chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    bridge.send('browserTabUpdated', { tab, changeInfo })
  }
})

// Background code goes here
chrome.browserAction.onClicked.addListener((/* tab */) => {
  // Opens our extension in a new browser window.
  // Only if a popup isn't defined in the manifest.
  chrome.tabs.create({
    url: chrome.extension.getURL('www/index.html')
  }, (/* newTab */) => {
    // Tab opened.
  })
})
