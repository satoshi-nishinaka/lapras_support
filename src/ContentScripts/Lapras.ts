import { Storage } from '../Storage';

/** 転職意欲 **/
type Will = 'High' | 'Low';

export class Lapras {
  /** 転職意欲高 **/
  private candidateHighIds: string[] = [];
  /** 転職意欲低 **/
  private candidateLowIds: string[] = [];

  scrapeCandidatesIds(): Lapras {
    const xpath =
      '//*[@id="intersection-observer-root"]/div/section/div/div/div/div/div/div';
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.ORDERED_NODE_ITERATOR_TYPE,
      null
    );
    console.warn('xpath', result);
    let element: Node;

    while ((element = result.iterateNext())) {
      this.add(element);
    }
    return this;
  }

  save(): Lapras {
    const storage = new Storage();
    storage.load(() => {
      // 既存のIDとmergeしてUniqueにする
      storage.candidateLowIds = Array.from(
        new Set(storage.candidateLowIds.concat(this.candidateLowIds))
      );
      storage.candidateHighIds = Array.from(
        new Set(storage.candidateHighIds.concat(this.candidateHighIds))
      );
      storage.save();
    });

    return this;
  }

  private add(element: Node): void {
    const textContent = element.textContent;
    let will: Will = undefined;
    if (textContent.includes('転職意欲： 高')) {
      will = 'High';
    } else if (textContent.includes('転職意欲： 中')) {
      will = 'Low';
    } else {
      return;
    }

    const attributes = (element as HTMLElement).attributes;
    for (let i = 0; i < attributes.length; i++) {
      const attribute = attributes[i];
      if (attribute.name === 'id') {
        switch (will) {
          case 'High':
            this.candidateHighIds.push(attribute.value);
            return;
          case 'Low':
            this.candidateLowIds.push(attribute.value);
            return;
        }
        return;
      }
    }
  }
}
