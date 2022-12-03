export const TransitionTo = (id: number, isOpenNewTab: boolean): void => {
  TransitionToUrl(
    `https://scout.lapras.com/talent_pool/candidates/${id}`,
    isOpenNewTab
  );
};

export const TransitionToUrl = (url: string, isOpenNewTab: boolean): void => {
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
