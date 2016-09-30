import Sticky from './sticky';

const listener = (request) => {
  if (request.type === 'init') {
    // loading spinner mr-loading-status
    setTimeout(() => {
      const diffsFiles = document.querySelector('.merge-request-tabs');
      if (diffsFiles && !/sticky-init/g.test(diffsFiles.className)) {
        diffsFiles.className += ' sticky-init';
        new Sticky().init();
      }
    }, 4000);
  }
};

chrome.runtime.onMessage.addListener(listener);


