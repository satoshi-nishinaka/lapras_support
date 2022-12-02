export class Storage {
  public enablePooling = true;
  public candidateHighIds: string[] = [];
  public candidateLowIds: string[] = [];
  public checkedCandidateIds: string[] = [];
  public loadDelay = 4000;

  load(callBack?: () => void): void {
    const values = [
      'enablePooling',
      'candidateHighIds',
      'candidateLowIds',
      'checkedCandidateIds',
      'loadDelay',
    ];
    chrome.storage.local.get(values, (items) => {
      // LocalStorageから設定情報を取得
      console.log(items);

      this.enablePooling = items.enablePooling;
      this.candidateHighIds = items.candidateHighIds;
      this.candidateLowIds = items.candidateLowIds;
      this.checkedCandidateIds = items.checkedCandidateIds;
      this.loadDelay = items.loadDelay;

      if (callBack) {
        callBack();
      }
    });
  }

  /**
   * ローカルストレージに設定内容を保存します
   */
  save(callback?: () => void): void {
    const values = {
      enablePooling: this.enablePooling,
      candidateHighIds: this.candidateHighIds,
      candidateLowIds: this.candidateLowIds,
      checkedCandidateIds: this.checkedCandidateIds,
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
