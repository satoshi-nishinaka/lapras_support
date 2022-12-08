import { Storage } from './Storage';
import { TalentPoolChecker } from './ContentScripts/TalentPoolChecker';

const url = location.href;
const storage = new Storage();

console.info(`Lapras Support Start ${url}`);

const isCandidatePage = (url: string): boolean => {
  return url.startsWith('https://scout.lapras.com/talent_pool/candidates/');
};

const isTalentPage = (url: string): boolean => {
  return url.startsWith('https://scout.lapras.com/talent_pool');
};

storage.load(() => {
  if (isTalentPage(url)) {
    console.warn('Lapras タレントプール画面です');
    if (isCandidatePage(url)) {
      // 既読にする
      const matches = new RegExp('/candidates/(\\d+)').exec(url);
      const id = parseInt(matches[1]);
      if (!storage.checkedCandidateIds.includes(id)) {
        console.log('既読化', matches);
        storage.checkedCandidateIds.push(id);
        storage.save();
      }
    }
    setInterval(() => {
      new TalentPoolChecker(storage).scrapeCandidatesIds().save();
      console.info('読み込み完了しました');
    }, storage.loadDelay);
  }
});
