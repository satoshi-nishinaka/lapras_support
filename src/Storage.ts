export class Storage {
  public enablePooling = true;
  public candidateHighIds: number[] = [];
  public candidateLowIds: number[] = [];
  public checkedCandidateIds: number[] = [];
  public bookmarkIds: number[] = [];
  public loadDelay = 4000;

  load(callBack?: () => void): void {
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
      'loadDelay',
    ];
    chrome.storage.local.get(values, (items) => {
      // LocalStorageから設定情報を取得
      console.debug('load storage values ----');
      console.debug(items);
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
      this.loadDelay = items.loadDelay ?? 4000;

      if (callBack) {
        callBack();
      }
    });
  }

  /**
   * ローカルストレージに設定内容を保存します
   */
  save(callback?: () => void): void {
    const candidateHighIds = [
      this.candidateHighIds.slice(0, 200),
      this.candidateHighIds.slice(200, 400),
      this.candidateHighIds.slice(400, 600),
      this.candidateHighIds.slice(600, 800),
    ];
    const candidateLowIds = [
      this.candidateLowIds.slice(0, 200),
      this.candidateLowIds.slice(200, 400),
      this.candidateLowIds.slice(400, 600),
      this.candidateLowIds.slice(600, 800),
    ];
    const checkedCandidateIds = [
      this.checkedCandidateIds.slice(0, 200),
      this.checkedCandidateIds.slice(200, 400),
      this.checkedCandidateIds.slice(400, 600),
      this.checkedCandidateIds.slice(600, 800),
    ];
    const bookmarkIds = [
      this.bookmarkIds.slice(0, 200),
      this.bookmarkIds.slice(200, 400),
      this.bookmarkIds.slice(400, 600),
      this.bookmarkIds.slice(600, 800),
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
      loadDelay: this.loadDelay,
    };
    console.log('saveValuesForLocalStorage -----');
    console.log(values);
    chrome.storage.local.set(values);

    if (callback) {
      callback();
    }
  }
}
