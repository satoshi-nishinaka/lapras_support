import { Storage } from './Storage';
import { TransitionTo, TransitionToUrl } from './Functions/Transition';

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
          storage.load(() => {
            const id = getCandidateIds(storage);
            console.log(id);
            if (!id && confirm('プールされているIDがありません')) {
              storage.save(() => {
                TransitionToUrl('https://scout.lapras.com/talent_pool/', false);
              });

              return;
            }
            storage.checkedCandidateIds.push(id);
            storage.save(() => {
              TransitionTo(id, false);
            });
          });
        }
      });
      break;
    }
  }
});
