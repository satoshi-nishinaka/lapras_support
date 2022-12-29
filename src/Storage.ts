export class Storage {
  public enablePooling = true;
  public candidateHighIds: number[] = [];
  public candidateLowIds: number[] = [];
  public checkedCandidateIds: number[] = [];
  /** タレントプールのIDのリスト **/
  public bookmarkIds: number[] = [];
  /** プロフィールページのIDのリスト **/
  public profileBookmarkIds: number[] = [];
  /** 既読プロフィールページのIDのリスト **/
  public checkedProfileIds: number[] = [];
  public loadDelay = 4000;

  getCandidateIds(): number {
    const id = this.candidateHighIds.shift();
    if (!id) {
      return this.candidateLowIds.shift();
    }
    return id;
  }

  load(): Promise<void> {
    return new Promise((resolve, reject) => {
      // candidateIdはそれぞれ271件までしか保存できないっぽい
      const values = [
        'enablePooling',
        'candidateHighIds0',
        'candidateHighIds1',
        'candidateHighIds2',
        'candidateHighIds3',
        'candidateLowIds0',
        'candidateLowIds1',
        'candidateLowIds2',
        'candidateLowIds3',
        'checkedCandidateIds0',
        'checkedCandidateIds1',
        'checkedCandidateIds2',
        'checkedCandidateIds3',
        'bookmarkIds0',
        'bookmarkIds1',
        'bookmarkIds2',
        'bookmarkIds3',
        'profileBookmarkIds0',
        'profileBookmarkIds1',
        'profileBookmarkIds2',
        'profileBookmarkIds3',
        'checkedProfileIds0',
        'checkedProfileIds1',
        'checkedProfileIds2',
        'checkedProfileIds3',
        'loadDelay',
      ];
      chrome.storage.local.get(values, (items) => {
        // LocalStorageから設定情報を取得
        console.debug('Lapras Support: load storage values ----');
        console.debug('Lapras Support', items);
        this.enablePooling = items.enablePooling ?? true;
        this.candidateHighIds = [].concat(
          items.candidateHighIds0 ?? [],
          items.candidateHighIds1 ?? [],
          items.candidateHighIds2 ?? [],
          items.candidateHighIds3 ?? []
        );
        this.candidateLowIds = [].concat(
          items.candidateLowIds0 ?? [],
          items.candidateLowIds1 ?? [],
          items.candidateLowIds2 ?? [],
          items.candidateLowIds3 ?? []
        );
        this.checkedCandidateIds = [].concat(
          items.checkedCandidateIds0 ?? [],
          items.checkedCandidateIds1 ?? [],
          items.checkedCandidateIds2 ?? [],
          items.checkedCandidateIds3 ?? []
        );
        this.bookmarkIds = [].concat(
          items.bookmarkIds0 ?? [],
          items.bookmarkIds1 ?? [],
          items.bookmarkIds2 ?? [],
          items.bookmarkIds3 ?? []
        );
        this.profileBookmarkIds = [].concat(
          items.profileBookmarkIds0 ?? [],
          items.profileBookmarkIds1 ?? [],
          items.profileBookmarkIds2 ?? [],
          items.profileBookmarkIds3 ?? []
        );
        this.checkedProfileIds = [].concat(
          items.checkedProfileIds0 ?? [],
          items.checkedProfileIds1 ?? [],
          items.checkedProfileIds2 ?? [],
          items.checkedProfileIds3 ?? []
        );
        this.loadDelay = items.loadDelay ?? 4000;

        if (resolve) {
          resolve();
        }
      });
    });
  }

  /**
   * ローカルストレージに設定内容を保存します
   */
  save(): Promise<void> {
    return new Promise((resolve, reject) => {
      const step = 200;
      const candidateHighIds = [
        this.candidateHighIds.slice(0, step),
        this.candidateHighIds.slice(step, step * 2),
        this.candidateHighIds.slice(step * 2, step * 3),
        this.candidateHighIds.slice(step * 3, step * 4),
      ];
      const candidateLowIds = [
        this.candidateLowIds.slice(0, 200),
        this.candidateLowIds.slice(step, step * 2),
        this.candidateLowIds.slice(step * 2, step * 3),
        this.candidateLowIds.slice(step * 3, step * 4),
      ];
      const checkedCandidateIds = [
        this.checkedCandidateIds.slice(0, step),
        this.checkedCandidateIds.slice(step, step * 2),
        this.checkedCandidateIds.slice(step * 2, step * 3),
        this.checkedCandidateIds.slice(step * 3, step * 4),
      ];
      const bookmarkIds = [
        this.bookmarkIds.slice(0, step),
        this.bookmarkIds.slice(step, step * 2),
        this.bookmarkIds.slice(step * 2, step * 3),
        this.bookmarkIds.slice(step * 3, step * 4),
      ];
      const profileBookmarkIds = [
        this.profileBookmarkIds.slice(0, step),
        this.profileBookmarkIds.slice(step, step * 2),
        this.profileBookmarkIds.slice(step * 2, step * 3),
        this.profileBookmarkIds.slice(step * 3, step * 4),
      ];
      const checkedProfileIds = [
        this.checkedProfileIds.slice(0, step),
        this.checkedProfileIds.slice(step, step * 2),
        this.checkedProfileIds.slice(step * 2, step * 3),
        this.checkedProfileIds.slice(step * 3, step * 4),
      ];

      const values = {
        enablePooling: this.enablePooling,
        candidateHighIds0: candidateHighIds[0],
        candidateHighIds1: candidateHighIds[1],
        candidateHighIds2: candidateHighIds[2],
        candidateHighIds3: candidateHighIds[3],
        candidateLowIds0: candidateLowIds[0],
        candidateLowIds1: candidateLowIds[1],
        candidateLowIds2: candidateLowIds[2],
        candidateLowIds3: candidateLowIds[3],
        checkedCandidateIds0: checkedCandidateIds[0],
        checkedCandidateIds1: checkedCandidateIds[1],
        checkedCandidateIds2: checkedCandidateIds[2],
        checkedCandidateIds3: checkedCandidateIds[3],
        bookmarkIds0: bookmarkIds[0],
        bookmarkIds1: bookmarkIds[1],
        bookmarkIds2: bookmarkIds[2],
        bookmarkIds3: bookmarkIds[3],
        profileBookmarkIds0: profileBookmarkIds[0],
        profileBookmarkIds1: profileBookmarkIds[1],
        profileBookmarkIds2: profileBookmarkIds[2],
        profileBookmarkIds3: profileBookmarkIds[3],
        checkedProfileIds0: checkedProfileIds[0],
        checkedProfileIds1: checkedProfileIds[1],
        checkedProfileIds2: checkedProfileIds[2],
        checkedProfileIds3: checkedProfileIds[3],
        loadDelay: this.loadDelay,
      };
      console.log('Lapras Support: saveValuesForLocalStorage -----');
      console.log('Lapras Support', values);
      chrome.storage.local.set(values);

      if (resolve) {
        resolve();
      }
    });
  }

  /**
   * 既に閲覧済みのIDかどうかを返却します
   *
   * @param id
   * @private
   */
  existsInChecked(id: number): boolean {
    return this.checkedCandidateIds.includes(id);
  }
}
