import Sticky from './sticky';

const listener = (request) => {
  if (request.type === 'init') {
    const target = document.getElementById('diffs');

    // wait for the diff files (#diffs) to load
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const diffsFiles = document.querySelector('.merge-request-tabs');
        if (diffsFiles && !/sticky-init/g.test(diffsFiles.className)) {
          diffsFiles.className += ' sticky-init';
          new Sticky().init();
        }
      });
    });

    const config = { attributes: true, childList: true, characterData: true };
    observer.observe(target, config);
  }
};

chrome.runtime.onMessage.addListener(listener);
