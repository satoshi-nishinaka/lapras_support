import { Storage } from '../Storage';
import { State } from '../content_script';

export class CandidatePageHelper {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  /**
   * タレントプールのページかどうかを判定します
   *
   * @param url
   */
  static isTalentPage = (url: string): boolean => {
    return url.startsWith('https://scout.lapras.com/talent_pool');
  };

  /**
   * URLからIDを取得します
   *
   * @param url
   */
  static parseId = (url: string): number => {
    const matches = new RegExp('/candidates/(\\d+)').exec(url);
    if (!matches) {
      return -1;
    }
    return parseInt(matches[1]);
  };

  /**
   * タレントプールのページかどうかを判定します
   *
   * @param url
   */
  static isCandidatePage = (url: string): boolean => {
    return url.startsWith('https://scout.lapras.com/talent_pool/candidates/');
  };

  addCheckedCandidate = (url: string): CandidatePageHelper => {
    if (CandidatePageHelper.isCandidatePage(url)) {
      // 既読にする
      const id = CandidatePageHelper.parseId(url);
      if (!this.storage.checkedCandidateIds.includes(id)) {
        console.log('既読化', id);
        this.storage.checkedCandidateIds.push(id);
        this.storage.save();
      }
    }

    return this;
  };

  addBookmarkButton = (state: State): void => {
    const id = CandidatePageHelper.parseId(state.url);
    const modal = document.getElementsByClassName('modal-body');
    if (
      id === -1 ||
      state.hasBookmarkButton ||
      modal.length === 0 ||
      this.storage.bookmarkIds.includes(id)
    ) {
      return;
    }

    const button = document.createElement('div');
    button.classList.add('btn', 'btn-sm', 'bookmark');
    button.innerText = '後で見る';
    button.addEventListener('click', () => {
      this.storage.bookmarkIds.push(id);
      this.storage.save(() => {
        button.remove();
        state.hasBookmarkButton = false;
      });
    });
    modal[0].appendChild(button);

    state.hasBookmarkButton = true;
  };
}
