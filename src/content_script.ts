import { Storage } from './Storage';
import { TalentPoolChecker } from './ContentScripts/TalentPoolChecker';
import { ProfilePageHelper } from './ContentScripts/ProfilePageHelper';
import { CandidatePageHelper } from './ContentScripts/CandidatePageHelper';

const storage = new Storage();

export type State = {
  hasBookmarkButton: boolean;
  url: string;
};

const state: State = {
  hasBookmarkButton: false,
  url: location.href,
};

console.info(`Lapras Support Start ${location.href}`);

storage.load(() => {
  state.url = location.href;

  if (ProfilePageHelper.isProfilePage(state.url)) {
    console.warn('Lapras プロフィールページです');
    setInterval(() => {
      new ProfilePageHelper(storage).addBookmarkButton(state.url);
    }, storage.loadDelay);
    return;
  }
  if (CandidatePageHelper.isTalentPage(state.url)) {
    console.warn('Lapras タレントプール画面です');
    const helper = new CandidatePageHelper(storage);
    helper.addCheckedCandidate(state.url).addBookmarkButton(state);
    setInterval(() => {
      new TalentPoolChecker(storage).scrapeCandidatesIds().save();
      console.info('読み込み完了しました');

      // 再度既読チェック
      helper.addCheckedCandidate(location.href).addBookmarkButton(state);
    }, storage.loadDelay);
  }
});
