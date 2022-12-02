import { Storage } from './Storage';

const storage = new Storage();

// ショートカットキーのハンドリング
chrome.commands.onCommand.addListener((command) => {
  function getCandidateIds(storage: Storage) {
    const id = storage.candidateHighIds.shift();
    if (!id) {
      return storage.candidateLowIds.shift();
    }
    return id;
  }

  switch (command) {
    case 'redirect_to_next_candidate': {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        const url = currentTab.url;
        console.log(url);
        // Laprasのページを開いている場合は保存してあるCandidateIdsを元にページを開く
        if (url.startsWith('https://scout.lapras.com/')) {
          const id = getCandidateIds(storage);
          console.log(id)
          if (!id) {
            if (confirm('プールされているIDがありません')) {
              storage.save(() => {
                chrome.tabs.update(currentTab.id, {
                  url: 'https://scout.lapras.com/talent_pool/',
                });
              });

              return;
            }
          }
          storage.checkedCandidateIds.push(id);
          storage.save(() => {
            chrome.tabs.update(currentTab.id, {
              url: `https://scout.lapras.com/talent_pool/candidates/${id}`,
            });
          });
          return;
        }
      });
      break;
    }
  }
});
