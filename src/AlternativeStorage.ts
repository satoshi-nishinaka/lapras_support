export class AlternativeStorage {
  checkedCandidateIds: number[];
  private candidateHighIds: number[];
  private candidateLowIds: number[];

  load(): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log('load');
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
        console.debug('Lapras Support: load storage values ----');
        console.debug('Lapras Support', items);
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
        if (resolve) {
          resolve();
        }
      });
    });
  }

  getCandidateIds(): number {
    const id = this.candidateHighIds.shift();
    if (!id) {
      return this.candidateLowIds.shift();
    }
    return id;
  }
  pushCheckedCandidateIds(id: number) {
    console.log('pushCheckedCandidateIds');
    this.checkedCandidateIds.push(id);
  }

  save(): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log('save');
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

      const values = {
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
      };
      console.log('Lapras Support: saveValuesForLocalStorage -----');
      console.log('Lapras Support', values);
      chrome.storage.local.set(values);

      if (resolve) {
        resolve();
      }
    });
  }
}
