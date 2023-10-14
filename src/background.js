BROWSER_SDK.storage.sync.get("domains", function(items) {
  var patterns = null;
  if (items.domains) {
    patterns = items.domains.split('|');
  } else {
    patterns = MD_TO_JIRA_DEFAULT_DOMAINS.split('|');
  }

  function handleClick(info, tab) {
    if (info.menuItemId == "md_to_jira") {
      BROWSER_SDK.tabs.sendMessage(tab.id, {
        "action": 'context-click',
        "event": "md_to_jira"
      });
      return;

    } else if (info.menuItemId == "jira_to_md") {
      BROWSER_SDK.tabs.sendMessage(tab.id, {
        "action": 'context-click',
        "event": "jira_to_md"
      });
      return;

    }
  }

  BROWSER_SDK.contextMenus.removeAll(function() {
    BROWSER_SDK.contextMenus.create({
      "title" : "MD to JIRA",
      "contexts" : ["editable"],
      "documentUrlPatterns": patterns,
      "id": "md_to_jira"
    });

    BROWSER_SDK.contextMenus.create({
      "title" : "JIRA to MD",
      "contexts" : ["editable"],
      "documentUrlPatterns": patterns,
      "id": "jira_to_md"
    });
  });


  BROWSER_SDK.contextMenus.onClicked.addListener(handleClick);
});
