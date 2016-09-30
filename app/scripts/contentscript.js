(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _sticky = require('./sticky');

var _sticky2 = _interopRequireDefault(_sticky);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listener = function listener(request) {
  if (request.type === 'init') {
    var target = document.getElementById('diffs');

    // wait for the diff files (#diffs) to load
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        var diffsFiles = document.querySelector('.merge-request-tabs');
        if (diffsFiles && !/sticky-init/g.test(diffsFiles.className)) {
          diffsFiles.className += ' sticky-init';
          new _sticky2.default().init();
        }
      });
    });

    var config = { attributes: true, childList: true, characterData: true };
    observer.observe(target, config);
  }
};

chrome.runtime.onMessage.addListener(listener);

},{"./sticky":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sticky = function () {
  function Sticky() {
    _classCallCheck(this, Sticky);
  }

  _createClass(Sticky, [{
    key: 'init',
    value: function init() {
      var prToolbarHeight = void 0;
      var fileContainers = document.querySelectorAll('[data-blob-diff-path]');
      var fileHeaders = document.querySelectorAll('[id^="file-path-"]');

      var getPrToolbarHeight = function getPrToolbarHeight() {
        var toolbars = document.getElementsByClassName('merge-request-tabs');
        var height = 0;

        for (var i = 0; i < toolbars.length; i++) {
          height = Math.max(height, toolbars[0].getBoundingClientRect().height);
        }

        return height + 50;
      };

      var setHeaderTop = function setHeaderTop(fileHeader, topPosition) {
        fileHeader.style.top = topPosition + 'px';
      };

      var resetHeadersFrom = function resetHeadersFrom(firstIndex) {
        for (var i = firstIndex; i < fileHeaders.length; i++) {
          setHeaderTop(fileHeaders[i], 0);
        }
      };

      var resetAllHeaders = function resetAllHeaders() {
        for (var i = 0; i < fileHeaders.length; i++) {
          fileHeaders[i].style.top = '0px';
          fileHeaders[i].style.position = 'absolute';
          fileHeaders[i].style.width = '100%';
          fileHeaders[i].style.zIndex = 9;
        }
      };

      var setFileContainersPadding = function setFileContainersPadding() {
        for (var i = 0; i < fileContainers.length; i++) {
          var headerHeight = fileHeaders[i].getBoundingClientRect().height;
          fileContainers[i].style.paddingTop = headerHeight + 'px';
        }
      };

      var getCurrentFileContainerIndex = function getCurrentFileContainerIndex() {
        var maxBeforeZero = -1000000;
        var maxBeforeZeroIndex = -1;

        for (var i = 0; i < fileContainers.length; i++) {
          var currentTop = fileContainers[i].getBoundingClientRect().top;
          if (currentTop > maxBeforeZero && currentTop < prToolbarHeight) {
            maxBeforeZero = currentTop;
            maxBeforeZeroIndex = i;
          }
        }

        return maxBeforeZeroIndex;
      };

      var makeCurrentHeaderSticky = function makeCurrentHeaderSticky() {
        var maxBeforeZeroIndex = getCurrentFileContainerIndex();
        if (maxBeforeZeroIndex === -1) {
          // reset the headers if we scroll back before the first one
          resetAllHeaders();
          return;
        }

        var currentfileContent = fileContainers[maxBeforeZeroIndex];
        var currentFileHeader = fileHeaders[maxBeforeZeroIndex];
        var headerHeight = currentFileHeader.getBoundingClientRect().height;
        var newHeaderTop = currentfileContent.getBoundingClientRect().top * -1 - 1;

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

        resetHeadersFrom(maxBeforeZeroIndex + 1);
      };

      (function () {
        var diffFile = document.getElementsByClassName('diff-file');
        for (var i = 0; i < diffFile.length; i++) {
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
  }]);

  return Sticky;
}();

exports.default = Sticky;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9zdGlja3kuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFNLFdBQVcsU0FBWCxRQUFXLENBQUMsT0FBRCxFQUFhO0FBQzVCLE1BQUksUUFBUSxJQUFSLEtBQWlCLE1BQXJCLEVBQTZCO0FBQzNCLFFBQU0sU0FBUyxTQUFTLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBZjs7QUFFQTtBQUNBLFFBQU0sV0FBVyxJQUFJLGdCQUFKLENBQXFCLFVBQUMsU0FBRCxFQUFlO0FBQ25ELGdCQUFVLE9BQVYsQ0FBa0IsVUFBQyxRQUFELEVBQWM7QUFDOUIsWUFBTSxhQUFhLFNBQVMsYUFBVCxDQUF1QixxQkFBdkIsQ0FBbkI7QUFDQSxZQUFJLGNBQWMsQ0FBQyxlQUFlLElBQWYsQ0FBb0IsV0FBVyxTQUEvQixDQUFuQixFQUE4RDtBQUM1RCxxQkFBVyxTQUFYLElBQXdCLGNBQXhCO0FBQ0EsaUNBQWEsSUFBYjtBQUNEO0FBQ0YsT0FORDtBQU9ELEtBUmdCLENBQWpCOztBQVVBLFFBQU0sU0FBUyxFQUFFLFlBQVksSUFBZCxFQUFvQixXQUFXLElBQS9CLEVBQXFDLGVBQWUsSUFBcEQsRUFBZjtBQUNBLGFBQVMsT0FBVCxDQUFpQixNQUFqQixFQUF5QixNQUF6QjtBQUNEO0FBQ0YsQ0FsQkQ7O0FBb0JBLE9BQU8sT0FBUCxDQUFlLFNBQWYsQ0FBeUIsV0FBekIsQ0FBcUMsUUFBckM7Ozs7Ozs7Ozs7Ozs7SUN0Qk0sTTtBQUNKLG9CQUFjO0FBQUE7QUFDYjs7OzsyQkFFTTtBQUNMLFVBQUksd0JBQUo7QUFDQSxVQUFJLGlCQUFpQixTQUFTLGdCQUFULENBQTBCLHVCQUExQixDQUFyQjtBQUNBLFVBQUksY0FBYyxTQUFTLGdCQUFULENBQTBCLG9CQUExQixDQUFsQjs7QUFFQSxVQUFNLHFCQUFxQixTQUFyQixrQkFBcUIs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MkMsTUFBL0YsRUFBdUc7QUFDckc7QUFDQSx1QkFDRSxpQkFERixFQUVFLG1CQUFtQixxQkFBbkIsR0FBMkMsTUFBM0MsR0FBb0QsWUFBcEQsR0FBbUUsSUFGckU7O0FBS0E7QUFDRDs7QUFFRCxxQkFBYSxpQkFBYixFQUFnQyxlQUFlLGVBQS9DOztBQUVBLHlCQUFpQixxQkFBcUIsQ0FBdEM7QUFDRCxPQS9CRDs7QUFpQ0EsT0FBQyxZQUFNO0FBQ0wsWUFBSSxXQUFXLFNBQVMsc0JBQVQsQ0FBZ0MsV0FBaEMsQ0FBZjtBQUNBLGFBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxTQUFTLE1BQTdCLEVBQXFDLEdBQXJDLEVBQTBDO0FBQ3hDLG1CQUFTLENBQVQsRUFBWSxLQUFaLENBQWtCLFFBQWxCLEdBQTZCLFVBQTdCO0FBQ0Q7O0FBRUQsMEJBQWtCLG9CQUFsQjtBQUNBLFlBQUksZUFBZSxNQUFuQixFQUEyQjtBQUN6QjtBQUNBO0FBQ0EsbUJBQVMsUUFBVCxHQUFvQix1QkFBcEI7QUFDRCxTQUpELE1BSU87QUFDTDtBQUNBLG1CQUFTLFFBQVQsR0FBb0IsSUFBcEI7QUFDRDtBQUNGLE9BZkQ7QUFpQkQ7Ozs7OztrQkFHWSxNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBTdGlja3kgZnJvbSAnLi9zdGlja3knO1xuXG5jb25zdCBsaXN0ZW5lciA9IChyZXF1ZXN0KSA9PiB7XG4gIGlmIChyZXF1ZXN0LnR5cGUgPT09ICdpbml0Jykge1xuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWZmcycpO1xuXG4gICAgLy8gd2FpdCBmb3IgdGhlIGRpZmYgZmlsZXMgKCNkaWZmcykgdG8gbG9hZFxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xuICAgICAgbXV0YXRpb25zLmZvckVhY2goKG11dGF0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpZmZzRmlsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVyZ2UtcmVxdWVzdC10YWJzJyk7XG4gICAgICAgIGlmIChkaWZmc0ZpbGVzICYmICEvc3RpY2t5LWluaXQvZy50ZXN0KGRpZmZzRmlsZXMuY2xhc3NOYW1lKSkge1xuICAgICAgICAgIGRpZmZzRmlsZXMuY2xhc3NOYW1lICs9ICcgc3RpY2t5LWluaXQnO1xuICAgICAgICAgIG5ldyBTdGlja3koKS5pbml0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgY29uZmlnID0geyBhdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIGNoYXJhY3RlckRhdGE6IHRydWUgfTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwgY29uZmlnKTtcbiAgfVxufTtcblxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGxpc3RlbmVyKTtcbiIsImNsYXNzIFN0aWNreSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBsZXQgcHJUb29sYmFySGVpZ2h0O1xuICAgIGxldCBmaWxlQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWJsb2ItZGlmZi1wYXRoXScpO1xuICAgIGxldCBmaWxlSGVhZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tpZF49XCJmaWxlLXBhdGgtXCJdJyk7XG5cbiAgICBjb25zdCBnZXRQclRvb2xiYXJIZWlnaHQgPSAoKSA9PiB7XG4gICAgICBjb25zdCB0b29sYmFycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lcmdlLXJlcXVlc3QtdGFicycpO1xuICAgICAgbGV0IGhlaWdodCA9IDA7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9vbGJhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaGVpZ2h0ID0gTWF0aC5tYXgoaGVpZ2h0LCB0b29sYmFyc1swXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGVpZ2h0ICsgNTA7XG4gICAgfTtcblxuICAgIGNvbnN0IHNldEhlYWRlclRvcCA9IChmaWxlSGVhZGVyLCB0b3BQb3NpdGlvbikgPT4ge1xuICAgICAgZmlsZUhlYWRlci5zdHlsZS50b3AgPSB0b3BQb3NpdGlvbiArICdweCc7XG4gICAgfTtcblxuICAgIGNvbnN0IHJlc2V0SGVhZGVyc0Zyb20gPSAoZmlyc3RJbmRleCkgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IGZpcnN0SW5kZXg7IGkgPCBmaWxlSGVhZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzZXRIZWFkZXJUb3AoZmlsZUhlYWRlcnNbaV0sIDApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCByZXNldEFsbEhlYWRlcnMgPSAoKSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVIZWFkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZpbGVIZWFkZXJzW2ldLnN0eWxlLnRvcCA9ICcwcHgnO1xuICAgICAgICBmaWxlSGVhZGVyc1tpXS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIGZpbGVIZWFkZXJzW2ldLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICBmaWxlSGVhZGVyc1tpXS5zdHlsZS56SW5kZXggPSA5O1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBzZXRGaWxlQ29udGFpbmVyc1BhZGRpbmcgPSAoKSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVDb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlckhlaWdodCA9IGZpbGVIZWFkZXJzW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgICAgZmlsZUNvbnRhaW5lcnNbaV0uc3R5bGUucGFkZGluZ1RvcCA9IGhlYWRlckhlaWdodCArICdweCc7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGdldEN1cnJlbnRGaWxlQ29udGFpbmVySW5kZXggPSAoKSA9PiB7XG4gICAgICBsZXQgbWF4QmVmb3JlWmVybyA9IC0xMDAwMDAwO1xuICAgICAgbGV0IG1heEJlZm9yZVplcm9JbmRleCA9IC0xO1xuXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZmlsZUNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VycmVudFRvcCA9IGZpbGVDb250YWluZXJzW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgICAgaWYgKGN1cnJlbnRUb3AgPiBtYXhCZWZvcmVaZXJvICYmIGN1cnJlbnRUb3AgPCBwclRvb2xiYXJIZWlnaHQpIHtcbiAgICAgICAgICBtYXhCZWZvcmVaZXJvID0gY3VycmVudFRvcDtcbiAgICAgICAgICBtYXhCZWZvcmVaZXJvSW5kZXggPSBpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtYXhCZWZvcmVaZXJvSW5kZXg7XG4gICAgfTtcblxuICAgIGNvbnN0IG1ha2VDdXJyZW50SGVhZGVyU3RpY2t5ID0gKCkgPT4ge1xuICAgICAgY29uc3QgbWF4QmVmb3JlWmVyb0luZGV4ID0gZ2V0Q3VycmVudEZpbGVDb250YWluZXJJbmRleCgpO1xuICAgICAgaWYgKG1heEJlZm9yZVplcm9JbmRleCA9PT0gLTEpIHtcbiAgICAgICAgLy8gcmVzZXQgdGhlIGhlYWRlcnMgaWYgd2Ugc2Nyb2xsIGJhY2sgYmVmb3JlIHRoZSBmaXJzdCBvbmVcbiAgICAgICAgcmVzZXRBbGxIZWFkZXJzKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY3VycmVudGZpbGVDb250ZW50ID0gZmlsZUNvbnRhaW5lcnNbbWF4QmVmb3JlWmVyb0luZGV4XTtcbiAgICAgIGNvbnN0IGN1cnJlbnRGaWxlSGVhZGVyID0gZmlsZUhlYWRlcnNbbWF4QmVmb3JlWmVyb0luZGV4XTtcbiAgICAgIGNvbnN0IGhlYWRlckhlaWdodCA9IGN1cnJlbnRGaWxlSGVhZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgIGNvbnN0IG5ld0hlYWRlclRvcCA9IChjdXJyZW50ZmlsZUNvbnRlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICogLTEpIC0xO1xuXG4gICAgICBpZiAobmV3SGVhZGVyVG9wIDwgcHJUb29sYmFySGVpZ2h0ICogLTEpIHtcbiAgICAgICAgLy8gV2UgcmVhY2hlZCB0aGUgdG9wIG9mIHRoZSBmaWxlIHNjcm9sbGluZyB1cFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdIZWFkZXJUb3AgKyBoZWFkZXJIZWlnaHQgKyBwclRvb2xiYXJIZWlnaHQgPiBjdXJyZW50ZmlsZUNvbnRlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0KSB7XG4gICAgICAgIC8vIFdlIHJlYWNoZWQgdGhlIGJvdHRvbSBvZiB0aGUgZmlsZSBzY3JvbGxpbmcgZG93blxuICAgICAgICBzZXRIZWFkZXJUb3AoXG4gICAgICAgICAgY3VycmVudEZpbGVIZWFkZXIsXG4gICAgICAgICAgY3VycmVudGZpbGVDb250ZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCAtIGhlYWRlckhlaWdodCArICdweCdcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNldEhlYWRlclRvcChjdXJyZW50RmlsZUhlYWRlciwgbmV3SGVhZGVyVG9wICsgcHJUb29sYmFySGVpZ2h0KTtcblxuICAgICAgcmVzZXRIZWFkZXJzRnJvbShtYXhCZWZvcmVaZXJvSW5kZXggKyAxKTtcbiAgICB9O1xuXG4gICAgKCgpID0+IHtcbiAgICAgIGxldCBkaWZmRmlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RpZmYtZmlsZScpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWZmRmlsZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBkaWZmRmlsZVtpXS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICB9XG5cbiAgICAgIHByVG9vbGJhckhlaWdodCA9IGdldFByVG9vbGJhckhlaWdodCgpO1xuICAgICAgaWYgKGZpbGVDb250YWluZXJzLmxlbmd0aCkge1xuICAgICAgICByZXNldEFsbEhlYWRlcnMoKTtcbiAgICAgICAgc2V0RmlsZUNvbnRhaW5lcnNQYWRkaW5nKCk7XG4gICAgICAgIGRvY3VtZW50Lm9uc2Nyb2xsID0gbWFrZUN1cnJlbnRIZWFkZXJTdGlja3k7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyByZW1vdmUgb25zY3JvbGwgbGlzdGVuZXIgaWYgbm8gZmlsZSBpcyBwcmVzZW50IGluIHRoZSBjdXJyZW50IHBhZ2VcbiAgICAgICAgZG9jdW1lbnQub25zY3JvbGwgPSBudWxsO1xuICAgICAgfVxuICAgIH0pKCk7XG5cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGlja3k7XG4iXX0=
