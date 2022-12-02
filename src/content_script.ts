import { Storage } from './Storage';
import { Lapras } from './ContentScripts/Lapras';

const url = location.href;
const storage = new Storage();

console.info(`Lapras Support Start ${url}`);

const execute = (): void => {
  storage.load(() => {
    if (url.startsWith('https://scout.lapras.com/talent_pool')) {
      console.warn('Lapras タレントプール画面です');
      setTimeout(() => {
        new Lapras().scrapeCandidatesIds().save();
        console.info('読み込み完了しました');
      }, 3000);
    }
  });
};

if (storage.loadTiming === 'onload') {
  window.onload = () => {
    execute();
  };
} else {
  execute();
}
