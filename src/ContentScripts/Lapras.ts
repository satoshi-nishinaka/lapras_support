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
    let i = 0;
    while ((element = result.iterateNext())) {
      const textContent = element.textContent;
      let will: Will = undefined;
      if (textContent.includes('転職意欲： 高')) {
        will = 'High';
      } else if (textContent.includes('転職意欲： 中')) {
        will = 'Low';
      } else {
        continue;
      }

      console.log(textContent);
      const attributes = (element as HTMLElement).attributes;
      console.log(i, element.textContent, attributes);
      for (let j = 0; j < attributes.length; j++) {
        const attribute = attributes[j];
        if (attribute.name === 'id') {
          switch (will) {
            case 'High':
              this.candidateHighIds.push(attribute.value);
              break;
            case 'Low':
              this.candidateLowIds.push(attribute.value);
              break;
          }
          break;
        }
      }
      i++;
    }
    return this;
  }

  save(): Lapras {
    const storage = new Storage();
    // 既存のIDとmergeしてUniqueにする
    storage.candidateLowIds = Array.from(
      new Set(storage.candidateLowIds.concat(this.candidateLowIds))
    );
    storage.candidateHighIds = Array.from(
      new Set(storage.candidateHighIds.concat(this.candidateHighIds))
    );
    storage.save();

    return this;
  }
}
