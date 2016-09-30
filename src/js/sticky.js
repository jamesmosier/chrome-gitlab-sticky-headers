class Sticky {
  constructor() {
  }

  init() {
    let prToolbarHeight;
    let fileContainers = document.querySelectorAll('[data-blob-diff-path]');
    let fileHeaders = document.querySelectorAll('[id^="file-path-"]');

    const getPrToolbarHeight = () => {
      const toolbars = document.getElementsByClassName('merge-request-tabs');
      let height = 0;

      for (let i = 0; i < toolbars.length; i++) {
        height = Math.max(height, toolbars[0].getBoundingClientRect().height);
      }

      return height + 50;
    };

    const setHeaderTop = (fileHeader, topPosition) => {
      fileHeader.style.top = topPosition + 'px';
    };

    const resetHeadersFrom = (firstIndex) => {
      for (let i = firstIndex; i < fileHeaders.length; i++) {
        setHeaderTop(fileHeaders[i], 0);
      }
    };

    const resetAllHeaders = () => {
      for (let i = 0; i < fileHeaders.length; i++) {
        fileHeaders[i].style.top = '0px';
        fileHeaders[i].style.position = 'absolute';
        fileHeaders[i].style.width = '100%';
        fileHeaders[i].style.zIndex = 9;
      }
    };

    const setFileContainersPadding = () => {
      for (let i = 0; i < fileContainers.length; i++) {
        const headerHeight = fileHeaders[i].getBoundingClientRect().height;
        fileContainers[i].style.paddingTop = headerHeight + 'px';
      }
    };

    const getCurrentFileContainerIndex = () => {
      let maxBeforeZero = -1000000;
      let maxBeforeZeroIndex = -1;

      for(let i = 0; i < fileContainers.length; i++) {
        const currentTop = fileContainers[i].getBoundingClientRect().top;
        if (currentTop > maxBeforeZero && currentTop < prToolbarHeight) {
          maxBeforeZero = currentTop;
          maxBeforeZeroIndex = i;
        }
      }

      return maxBeforeZeroIndex;
    };

    const makeCurrentHeaderSticky = () => {
      const maxBeforeZeroIndex = getCurrentFileContainerIndex();
      if (maxBeforeZeroIndex === -1) {
        // reset the headers if we scroll back before the first one
        resetAllHeaders();
        return;
      }

      const currentfileContent = fileContainers[maxBeforeZeroIndex];
      const currentFileHeader = fileHeaders[maxBeforeZeroIndex];
      const headerHeight = currentFileHeader.getBoundingClientRect().height;
      const newHeaderTop = (currentfileContent.getBoundingClientRect().top * -1) -1;

      if (newHeaderTop < prToolbarHeight * -1) {
        // We reached the top of the file scrolling up
        return;
      }

      if (newHeaderTop + headerHeight + prToolbarHeight > currentfileContent.getBoundingClientRect().height) {
        // We reached the bottom of the file scrolling down
        setHeaderTop(
          currentFileHeader,
          currentfileContent.getBoundingClientRect().height - headerHeight + 'px'
        );

        return;
      }

      setHeaderTop(currentFileHeader, newHeaderTop + prToolbarHeight);

      resetHeadersFrom(maxBeforeZeroIndex + 1);
    };

    (() => {
      let diffFile = document.getElementsByClassName('diff-file');
      for (let i = 0; i < diffFile.length; i++) {
        diffFile[i].style.position = 'relative';
      }

      prToolbarHeight = getPrToolbarHeight();
      if (fileContainers.length) {
        resetAllHeaders();
        setFileContainersPadding();
        document.onscroll = makeCurrentHeaderSticky;
      } else {
        // remove onscroll listener if no file is present in the current page
        document.onscroll = null;
      }
    })();

  }
}

export default Sticky;
