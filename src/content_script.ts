import { Storage } from './Storage';
import { TalentPoolChecker } from './ContentScripts/TalentPoolChecker';

const storage = new Storage();
let hasBookmarkButton = false;

console.info(`Lapras Support Start ${location.href}`);

const getId = (url: string): number => {
  const matches = new RegExp('/candidates/(\\d+)').exec(url);
  return parseInt(matches[1]);
};

const isCandidatePage = (url: string): boolean => {
  return url.startsWith('https://scout.lapras.com/talent_pool/candidates/');
};

const isTalentPage = (url: string): boolean => {
  return url.startsWith('https://scout.lapras.com/talent_pool');
};

const addCheckedCandidate = (url: string): void => {
  if (isCandidatePage(url)) {
    // 既読にする
    const id = getId(url);
    if (!storage.checkedCandidateIds.includes(id)) {
      console.log('既読化', id);
      storage.checkedCandidateIds.push(id);
      storage.save();
    }
  }
};

const addBookmarkButton = (url: string): void => {
  const id = getId(url);
  const modal = document.getElementsByClassName('modal-body');
  if (
    hasBookmarkButton ||
    modal.length === 0 ||
    storage.bookmarkIds.includes(id)
  ) {
    return;
  }

  const button = document.createElement('div');
  button.classList.add('btn', 'btn-sm', 'bookmark');
  button.innerText = '後で見る';
  button.addEventListener('click', () => {
    console.log(1);
    storage.bookmarkIds.push(id);
    storage.save(() => {
      button.remove();
      hasBookmarkButton = false;
    });
  });
  modal[0].appendChild(button);

  hasBookmarkButton = true;
};

storage.load(() => {
  const url = location.href;

  if (isTalentPage(url)) {
    console.warn('Lapras タレントプール画面です');
    addCheckedCandidate(url);
    addBookmarkButton(url);
    setInterval(() => {
      new TalentPoolChecker(storage).scrapeCandidatesIds().save();
      console.info('読み込み完了しました');

      // 再度既読チェック
      addCheckedCandidate(location.href);
      addBookmarkButton(url);
    }, storage.loadDelay);
  }
});
