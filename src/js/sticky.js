class Sticky {
  constructor() {
    this.prToolbarHeight = Sticky.getPrToolbarHeight();
    this.fileContainers = document.querySelectorAll('[data-blob-diff-path]');
    this.fileHeaders = document.querySelectorAll('[id^="file-path-"]');
  }

  static getPrToolbarHeight() {
    const toolbar = document.querySelector('.merge-request-tabs');
    const height = toolbar.getBoundingClientRect().height;
    return height + 50;
  }

  static setHeaderTop(fileHeader, topPosition) {
    fileHeader.style.top = `${topPosition}px`;
  }

  resetHeadersFrom(firstIndex) {
    for (let i = firstIndex; i < this.fileHeaders.length; i++) {
      Sticky.setHeaderTop(this.fileHeaders[i], 0);
    }
  }

  resetAllHeaders() {
    for (let i = 0; i < this.fileHeaders.length; i++) {
      this.fileHeaders[i].style.top = '0px';
      this.fileHeaders[i].style.position = 'absolute';
      this.fileHeaders[i].style.width = '100%';
      this.fileHeaders[i].style.zIndex = 11;
    }
  }

  setFileContainersPadding() {
    for (let i = 0; i < this.fileContainers.length; i++) {
      const headerHeight = this.fileHeaders[i].getBoundingClientRect().height;
      this.fileContainers[i].style.paddingTop = `${headerHeight}px`;
    }
  }

  getCurrentFileContainerIndex() {
    let maxBeforeZero = -1000000;
    let maxBeforeZeroIndex = -1;

    this.fileContainers.forEach((fileContainer, i) => {
      const currentTop = fileContainer.getBoundingClientRect().top;
      if (currentTop > maxBeforeZero && currentTop < this.prToolbarHeight) {
        maxBeforeZero = currentTop;
        maxBeforeZeroIndex = i;
      }
    });

    return maxBeforeZeroIndex;
  }

  makeCurrentHeaderSticky() {
    const maxBeforeZeroIndex = this.getCurrentFileContainerIndex();
    if (maxBeforeZeroIndex === -1) {
      // reset the headers if we scroll back before the first one
      this.resetAllHeaders();
      return;
    }

    const currentfileContent = this.fileContainers[maxBeforeZeroIndex];
    const currentFileHeader = this.fileHeaders[maxBeforeZeroIndex];
    const headerHeight = currentFileHeader.getBoundingClientRect().height;
    const newHeaderTop = (currentfileContent.getBoundingClientRect().top * -1) - 1;

    if (newHeaderTop < this.prToolbarHeight * -1) {
      // We reached the top of the file scrolling up
      return;
    }

    if (newHeaderTop + headerHeight + this.prToolbarHeight
      > currentfileContent.getBoundingClientRect().height) {
      // We reached the bottom of the file scrolling down
      Sticky.setHeaderTop(
        currentFileHeader,
        currentfileContent.getBoundingClientRect().height - headerHeight
      );

      return;
    }

    Sticky.setHeaderTop(currentFileHeader, newHeaderTop + this.prToolbarHeight);

    this.resetHeadersFrom(maxBeforeZeroIndex + 1);
  }

  init() {
    const diffFile = document.getElementsByClassName('diff-file');
    for (let i = 0; i < diffFile.length; i++) {
      diffFile[i].style.position = 'relative';
    }

    if (this.fileContainers.length) {
      this.resetAllHeaders();
      this.setFileContainersPadding();
      document.onscroll = this.makeCurrentHeaderSticky.bind(this);
    } else {
      // remove onscroll listener if no file is present in the current page
      document.onscroll = null;
    }
  }
}

export default Sticky;
