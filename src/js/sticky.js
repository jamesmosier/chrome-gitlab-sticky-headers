class Sticky  {
  constructor() {

  }

  init() {
    var prToolbarHeight;
    var fileContainers = document.getElementsByClassName('file-holder');
    var fileHeaders = document.getElementsByClassName('file-title');
    var toggleButtons = [];
    var collapseText = 'Collapse';
    var expandText = 'Expand';

    const getPrToolbarHeight = () => {
      const toolbars = document.getElementsByClassName('merge-request-tabs');
      let height = 0;
      for (let i = 0; i < toolbars.length; i++) {
        height = Math.max(height, toolbars[0].getBoundingClientRect().height);
      }

      return height + 50;
    };

    const setHeaderTop = function(fileHeader, topPosition) {
      fileHeader.style.top = topPosition + 'px';
    };

    const resetHeadersFrom = function(firstIndex) {
      for (let i = firstIndex; i < fileHeaders.length; i++) {
        setHeaderTop(fileHeaders[i], 0);
      }
    };

    const resetAllHeaders = function() {
      for (let i = 0; i < fileHeaders.length; i++) {
        fileHeaders[i].style.top = '0px';
        fileHeaders[i].style.position = 'absolute';
        fileHeaders[i].style.width = '100%';
        fileHeaders[i].style.zIndex = 1;
      }
    };

    const setFileContainersPadding = function() {
      for (let i = 0; i < fileContainers.length; i++) {
        var headerHeight = fileHeaders[i].getBoundingClientRect().height;
        fileContainers[i].style.paddingTop = headerHeight + 'px';
      }
    };

    const getCurrentFileContainerIndex = function() {
      var maxBerofeZero = -1000000;
      var maxBerofeZeroIndex = -1;
      for(let i=0; i<fileContainers.length; i++) {
        var currentTop = fileContainers[i].getBoundingClientRect().top;
        if (currentTop > maxBerofeZero && currentTop < prToolbarHeight) {
          maxBerofeZero = currentTop;
          maxBerofeZeroIndex = i;
        }
      }
      return maxBerofeZeroIndex;
    };

    var makeCurrentHeaderSticky = function() {
      var maxBerofeZeroIndex = getCurrentFileContainerIndex();
      if (maxBerofeZeroIndex === -1) {
        // reset the headers if we scroll back before the first one
        resetAllHeaders();
        return;
      }

      var currentfileContent = fileContainers[maxBerofeZeroIndex];
      var currentFileHeader = fileHeaders[maxBerofeZeroIndex];
      var headerHeight = currentFileHeader.getBoundingClientRect().height;
      var newHeaderTop = (currentfileContent.getBoundingClientRect().top * -1) -1;

      if (newHeaderTop < prToolbarHeight * -1) {
        // We reached the top of the file scrolling up
        return;
      }
      if (newHeaderTop + headerHeight + prToolbarHeight > currentfileContent.getBoundingClientRect().height) {
        // We reached the bottom of the file scrolling down
        setHeaderTop(currentFileHeader, currentfileContent.getBoundingClientRect().height - headerHeight + 'px');
        return;
      }

      setHeaderTop(currentFileHeader, newHeaderTop + prToolbarHeight);

      resetHeadersFrom(maxBerofeZeroIndex + 1);
    };

    const init = () => {
      let diffFile = document.getElementsByClassName('diff-file');
      for (let i = 0; i < diffFile.length; i++) {
        diffFile[i].style.position = 'relative';
      }

      prToolbarHeight = getPrToolbarHeight();
      if (fileContainers.length !== 0) {
        resetAllHeaders();
        setFileContainersPadding();
        document.onscroll = makeCurrentHeaderSticky;
      } else {
        // remove onscroll listener if no file is present in the current page
        document.onscroll = null;
      }
    };

    init();

  }
}

export default Sticky;
