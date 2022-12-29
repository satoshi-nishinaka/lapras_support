import { AlternativeStorage } from './AlternativeStorage';

console.info('Background: Lapras Support');

// ショートカットキーのハンドリング
chrome.commands.onCommand.addListener((command) => {
  switch (command) {
    case 'redirect_to_next_candidate': {
      console.info('次の候補者を表示');
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        const url = currentTab.url;
        console.info(url);
        // Laprasのページを開いている場合は保存してあるCandidateIdsを元にページを開く
        if (url.startsWith('https://scout.lapras.com/')) {
          const storage = new AlternativeStorage();
          storage.load().then(() => {
            const id = storage.getCandidateIds();
            console.info(id);
            if (!id && confirm('プールされているIDがありません')) {
              storage.save().then(() => {
                TransitionToUrl('https://scout.lapras.com/talent_pool/', false);
              });

              return;
            }
            storage.pushCheckedCandidateIds(id);
            storage.save().then(() => {
              TransitionTo(id, false);
            });
          });
        }
      });
      break;
    }
  }
});

const TransitionTo = (id: number, isOpenNewTab: boolean): void => {
  TransitionToUrl(
    `https://scout.lapras.com/talent_pool/candidates/${id}`,
    isOpenNewTab
  );
};

const TransitionToUrl = (url: string, isOpenNewTab: boolean): void => {
  if (isOpenNewTab) {
    chrome.tabs.create({ url: url });
    return;
  }
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    chrome.tabs.update(currentTab.id, {
      url: url,
    });
  });
};
