import { Storage } from '../Storage';
import { TransitionToUrl } from '../Functions/Transition';

export class ProfilePageHelper {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  /**
   * プロフィールページかどうかを判定します
   *
   * @param url
   */
  static isProfilePage = (url: string): boolean => {
    return url.startsWith('https://scout.lapras.com/person/');
  };

  /**
   * URLからIDを取得します
   *
   * @param url
   */
  static parseId = (url: string): number => {
    const matches = new RegExp('/person/(\\d+)').exec(url);
    return parseInt(matches[1]);
  };

  static TransitionTo = (id: number, isOpenNewTab: boolean): void => {
    TransitionToUrl(`https://scout.lapras.com/person/${id}`, isOpenNewTab);
  };

  addBookmarkButton = (url: string): void => {
    const id = ProfilePageHelper.parseId(url);
    const target = document.getElementsByClassName(
      'p-candidate__head--summary detail'
    );
    if (
      // hasBookmarkButton ||
      target.length === 0 ||
      this.storage.existsProfileBookmarkIds(id)
    ) {
      console.info('Lapras Support: 既にブックマーク済みです', target);
      return;
    }

    const button = document.createElement('div');
    button.classList.add('btn', 'btn-sm', 'bookmark');
    button.innerText = '後で見る';
    button.addEventListener('click', () => {
      this.storage.pushProfileBookmarkIds(id);
      this.storage.save().then(() => {
        button.remove();
      });
    });
    target[0].appendChild(button);
    console.log('Lapras Support: ブックマーク追加ボタンを表示');
  };
}
