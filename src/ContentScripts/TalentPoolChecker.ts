import { Storage } from '../Storage';

/** 転職意欲 **/
type Will = 'High' | 'Low';
type AppendClass = 'ls_scraped' | 'ls_checked';

/**
 * 指定したNode(HtmlElement) にクラスを適用します
 *
 * @param node
 * @constructor
 */
function AddClassAtElements(nodes: Node[], appendClass: AppendClass): void {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const element = node as HTMLElement;

    if (!element.classList.contains(appendClass)) {
      element.classList.add(appendClass);
    }
  }
}

export class TalentPoolChecker {
  /** 転職意欲高 **/
  private candidateHighIds: number[] = [];
  /** 転職意欲低 **/
  private candidateLowIds: number[] = [];

  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
    this.storage.load();
  }

  scrapeCandidatesIds(): TalentPoolChecker {
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

    // 読み込んだNodeは後でまとめて指定したクラスをセットする
    const loadedComponents: Node[] = [];
    const checkedComponents: Node[] = [];
    while ((element = result.iterateNext())) {
      if (this.add(element)) {
        loadedComponents.push(element);
      } else {
        checkedComponents.push(element);
      }
    }

    // リストに追加された場合は画面上のコンポーネントに指定したクラスをセット
    AddClassAtElements(loadedComponents, 'ls_scraped');
    AddClassAtElements(checkedComponents, 'ls_checked');
    return this;
  }

  save(): TalentPoolChecker {
    this.storage.load(() => {
      // 既存のIDとmergeしてUniqueにする
      this.storage.candidateLowIds = Array.from(
        new Set(this.storage.candidateLowIds.concat(this.candidateLowIds))
      );
      this.storage.candidateHighIds = Array.from(
        new Set(this.storage.candidateHighIds.concat(this.candidateHighIds))
      );
      this.storage.save();
    });

    return this;
  }

  /**
   * 候補者リストに追加します
   *
   * @param element
   * @private
   */
  private add(element: Node): boolean {
    const textContent = element.textContent;
    let will: Will = undefined;
    if (textContent.includes('転職意欲： 高')) {
      will = 'High';
    } else if (textContent.includes('転職意欲： 中')) {
      will = 'Low';
    } else {
      return false;
    }

    const attributes = (element as HTMLElement).attributes;
    for (let i = 0; i < attributes.length; i++) {
      const attribute = attributes[i];
      if (attribute.name === 'id') {
        if (this.existsInChecked(parseInt(attribute.value))) {
          // チェック済みは対象外
          return false;
        }
        switch (will) {
          case 'High':
            this.candidateHighIds.push(parseInt(attribute.value));
            return true;
          case 'Low':
            this.candidateLowIds.push(parseInt(attribute.value));
            return true;
        }
        return false;
      }
    }

    return false;
  }

  /**
   * 既に閲覧済みのIDかどうかを返却します
   *
   * @param id
   * @private
   */
  private existsInChecked(id: number) {
    return this.storage.checkedCandidateIds.includes(id);
  }
}
