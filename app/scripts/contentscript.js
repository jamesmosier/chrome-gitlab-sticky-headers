(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _sticky = require('./sticky');

var _sticky2 = _interopRequireDefault(_sticky);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listener = function listener(request) {
  if (request.type === 'init') {
    // loading spinner mr-loading-status
    setTimeout(function () {
      var diffsFiles = document.querySelector('.merge-request-tabs');
      if (diffsFiles && !/sticky-init/g.test(diffsFiles.className)) {
        diffsFiles.className += ' sticky-init';
        new _sticky2.default().init();
      }
    }, 4000);
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
      var fileHeaders = document.querySelectorAll("[id^='file-path-']");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9zdGlja3kuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFNLFdBQVcsU0FBWCxRQUFXLENBQUMsT0FBRCxFQUFhO0FBQzVCLE1BQUksUUFBUSxJQUFSLEtBQWlCLE1BQXJCLEVBQTZCO0FBQzNCO0FBQ0EsZUFBVyxZQUFNO0FBQ2YsVUFBTSxhQUFhLFNBQVMsYUFBVCxDQUF1QixxQkFBdkIsQ0FBbkI7QUFDQSxVQUFJLGNBQWMsQ0FBQyxlQUFlLElBQWYsQ0FBb0IsV0FBVyxTQUEvQixDQUFuQixFQUE4RDtBQUM1RCxtQkFBVyxTQUFYLElBQXdCLGNBQXhCO0FBQ0EsK0JBQWEsSUFBYjtBQUNEO0FBQ0YsS0FORCxFQU1HLElBTkg7QUFPRDtBQUNGLENBWEQ7O0FBYUEsT0FBTyxPQUFQLENBQWUsU0FBZixDQUF5QixXQUF6QixDQUFxQyxRQUFyQzs7Ozs7Ozs7Ozs7OztJQ2ZNLE07QUFDSixvQkFBYztBQUFBO0FBQ2I7Ozs7MkJBRU07QUFDTCxVQUFJLHdCQUFKO0FBQ0EsVUFBSSxpQkFBaUIsU0FBUyxnQkFBVCxDQUEwQix1QkFBMUIsQ0FBckI7QUFDQSxVQUFJLGNBQWMsU0FBUyxnQkFBVCxDQUEwQixvQkFBMUIsQ0FBbEI7O0FBRUEsVUFBTSxxQkFBcUIsU0FBckIsa0JBQXFCLEdBQU07QUFDL0IsWUFBTSxXQUFXLFNBQVMsc0JBQVQsQ0FBZ0Msb0JBQWhDLENBQWpCO0FBQ0EsWUFBSSxTQUFTLENBQWI7O0FBRUEsYUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFNBQVMsTUFBN0IsRUFBcUMsR0FBckMsRUFBMEM7QUFDeEMsbUJBQVMsS0FBSyxHQUFMLENBQVMsTUFBVCxFQUFpQixTQUFTLENBQVQsRUFBWSxxQkFBWixHQUFvQyxNQUFyRCxDQUFUO0FBQ0Q7O0FBRUQsZUFBTyxTQUFT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QWY7QUFDQSxhQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksU0FBUyxNQUE3QixFQUFxQyxHQUFyQyxFQUEwQztBQUN4QyxtQkFBUyxDQUFULEVBQVksS0FBWixDQUFrQixRQUFsQixHQUE2QixVQUE3QjtBQUNEOztBQUVELDBCQUFrQixvQkFBbEI7QUFDQSxZQUFJLGVBQWUsTUFBbkIsRUFBMkI7QUFDekI7QUFDQTtBQUNBLG1CQUFTLFFBQVQsR0FBb0IsdUJBQXBCO0FBQ0QsU0FKRCxNQUlPO0FBQ0w7QUFDQSxtQkFBUyxRQUFULEdBQW9CLElBQXBCO0FBQ0Q7QUFDRixPQWZEO0FBaUJEOzs7Ozs7a0JBR1ksTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgU3RpY2t5IGZyb20gJy4vc3RpY2t5JztcblxuY29uc3QgbGlzdGVuZXIgPSAocmVxdWVzdCkgPT4ge1xuICBpZiAocmVxdWVzdC50eXBlID09PSAnaW5pdCcpIHtcbiAgICAvLyBsb2FkaW5nIHNwaW5uZXIgbXItbG9hZGluZy1zdGF0dXNcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IGRpZmZzRmlsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVyZ2UtcmVxdWVzdC10YWJzJyk7XG4gICAgICBpZiAoZGlmZnNGaWxlcyAmJiAhL3N0aWNreS1pbml0L2cudGVzdChkaWZmc0ZpbGVzLmNsYXNzTmFtZSkpIHtcbiAgICAgICAgZGlmZnNGaWxlcy5jbGFzc05hbWUgKz0gJyBzdGlja3ktaW5pdCc7XG4gICAgICAgIG5ldyBTdGlja3koKS5pbml0KCk7XG4gICAgICB9XG4gICAgfSwgNDAwMCk7XG4gIH1cbn07XG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihsaXN0ZW5lcik7XG5cblxuIiwiY2xhc3MgU3RpY2t5ICB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBsZXQgcHJUb29sYmFySGVpZ2h0O1xuICAgIGxldCBmaWxlQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWJsb2ItZGlmZi1wYXRoXScpO1xuICAgIGxldCBmaWxlSGVhZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbaWRePSdmaWxlLXBhdGgtJ11cIik7XG5cbiAgICBjb25zdCBnZXRQclRvb2xiYXJIZWlnaHQgPSAoKSA9PiB7XG4gICAgICBjb25zdCB0b29sYmFycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lcmdlLXJlcXVlc3QtdGFicycpO1xuICAgICAgbGV0IGhlaWdodCA9IDA7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9vbGJhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaGVpZ2h0ID0gTWF0aC5tYXgoaGVpZ2h0LCB0b29sYmFyc1swXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGVpZ2h0ICsgNTA7XG4gICAgfTtcblxuICAgIGNvbnN0IHNldEhlYWRlclRvcCA9IChmaWxlSGVhZGVyLCB0b3BQb3NpdGlvbikgPT4ge1xuICAgICAgZmlsZUhlYWRlci5zdHlsZS50b3AgPSB0b3BQb3NpdGlvbiArICdweCc7XG4gICAgfTtcblxuICAgIGNvbnN0IHJlc2V0SGVhZGVyc0Zyb20gPSAoZmlyc3RJbmRleCkgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IGZpcnN0SW5kZXg7IGkgPCBmaWxlSGVhZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzZXRIZWFkZXJUb3AoZmlsZUhlYWRlcnNbaV0sIDApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCByZXNldEFsbEhlYWRlcnMgPSAoKSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVIZWFkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZpbGVIZWFkZXJzW2ldLnN0eWxlLnRvcCA9ICcwcHgnO1xuICAgICAgICBmaWxlSGVhZGVyc1tpXS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIGZpbGVIZWFkZXJzW2ldLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICBmaWxlSGVhZGVyc1tpXS5zdHlsZS56SW5kZXggPSA5O1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBzZXRGaWxlQ29udGFpbmVyc1BhZGRpbmcgPSAoKSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVDb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlckhlaWdodCA9IGZpbGVIZWFkZXJzW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgICAgZmlsZUNvbnRhaW5lcnNbaV0uc3R5bGUucGFkZGluZ1RvcCA9IGhlYWRlckhlaWdodCArICdweCc7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGdldEN1cnJlbnRGaWxlQ29udGFpbmVySW5kZXggPSAoKSA9PiB7XG4gICAgICBsZXQgbWF4QmVmb3JlWmVybyA9IC0xMDAwMDAwO1xuICAgICAgbGV0IG1heEJlZm9yZVplcm9JbmRleCA9IC0xO1xuXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZmlsZUNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VycmVudFRvcCA9IGZpbGVDb250YWluZXJzW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgICAgaWYgKGN1cnJlbnRUb3AgPiBtYXhCZWZvcmVaZXJvICYmIGN1cnJlbnRUb3AgPCBwclRvb2xiYXJIZWlnaHQpIHtcbiAgICAgICAgICBtYXhCZWZvcmVaZXJvID0gY3VycmVudFRvcDtcbiAgICAgICAgICBtYXhCZWZvcmVaZXJvSW5kZXggPSBpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtYXhCZWZvcmVaZXJvSW5kZXg7XG4gICAgfTtcblxuICAgIGNvbnN0IG1ha2VDdXJyZW50SGVhZGVyU3RpY2t5ID0gKCkgPT4ge1xuICAgICAgY29uc3QgbWF4QmVmb3JlWmVyb0luZGV4ID0gZ2V0Q3VycmVudEZpbGVDb250YWluZXJJbmRleCgpO1xuICAgICAgaWYgKG1heEJlZm9yZVplcm9JbmRleCA9PT0gLTEpIHtcbiAgICAgICAgLy8gcmVzZXQgdGhlIGhlYWRlcnMgaWYgd2Ugc2Nyb2xsIGJhY2sgYmVmb3JlIHRoZSBmaXJzdCBvbmVcbiAgICAgICAgcmVzZXRBbGxIZWFkZXJzKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY3VycmVudGZpbGVDb250ZW50ID0gZmlsZUNvbnRhaW5lcnNbbWF4QmVmb3JlWmVyb0luZGV4XTtcbiAgICAgIGNvbnN0IGN1cnJlbnRGaWxlSGVhZGVyID0gZmlsZUhlYWRlcnNbbWF4QmVmb3JlWmVyb0luZGV4XTtcbiAgICAgIGNvbnN0IGhlYWRlckhlaWdodCA9IGN1cnJlbnRGaWxlSGVhZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgIGNvbnN0IG5ld0hlYWRlclRvcCA9IChjdXJyZW50ZmlsZUNvbnRlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICogLTEpIC0xO1xuXG4gICAgICBpZiAobmV3SGVhZGVyVG9wIDwgcHJUb29sYmFySGVpZ2h0ICogLTEpIHtcbiAgICAgICAgLy8gV2UgcmVhY2hlZCB0aGUgdG9wIG9mIHRoZSBmaWxlIHNjcm9sbGluZyB1cFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdIZWFkZXJUb3AgKyBoZWFkZXJIZWlnaHQgKyBwclRvb2xiYXJIZWlnaHQgPiBjdXJyZW50ZmlsZUNvbnRlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0KSB7XG4gICAgICAgIC8vIFdlIHJlYWNoZWQgdGhlIGJvdHRvbSBvZiB0aGUgZmlsZSBzY3JvbGxpbmcgZG93blxuICAgICAgICBzZXRIZWFkZXJUb3AoXG4gICAgICAgICAgY3VycmVudEZpbGVIZWFkZXIsXG4gICAgICAgICAgY3VycmVudGZpbGVDb250ZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCAtIGhlYWRlckhlaWdodCArICdweCdcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNldEhlYWRlclRvcChjdXJyZW50RmlsZUhlYWRlciwgbmV3SGVhZGVyVG9wICsgcHJUb29sYmFySGVpZ2h0KTtcblxuICAgICAgcmVzZXRIZWFkZXJzRnJvbShtYXhCZWZvcmVaZXJvSW5kZXggKyAxKTtcbiAgICB9O1xuXG4gICAgKCgpID0+IHtcbiAgICAgIGxldCBkaWZmRmlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RpZmYtZmlsZScpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWZmRmlsZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBkaWZmRmlsZVtpXS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICB9XG5cbiAgICAgIHByVG9vbGJhckhlaWdodCA9IGdldFByVG9vbGJhckhlaWdodCgpO1xuICAgICAgaWYgKGZpbGVDb250YWluZXJzLmxlbmd0aCkge1xuICAgICAgICByZXNldEFsbEhlYWRlcnMoKTtcbiAgICAgICAgc2V0RmlsZUNvbnRhaW5lcnNQYWRkaW5nKCk7XG4gICAgICAgIGRvY3VtZW50Lm9uc2Nyb2xsID0gbWFrZUN1cnJlbnRIZWFkZXJTdGlja3k7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyByZW1vdmUgb25zY3JvbGwgbGlzdGVuZXIgaWYgbm8gZmlsZSBpcyBwcmVzZW50IGluIHRoZSBjdXJyZW50IHBhZ2VcbiAgICAgICAgZG9jdW1lbnQub25zY3JvbGwgPSBudWxsO1xuICAgICAgfVxuICAgIH0pKCk7XG5cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGlja3k7XG4iXX0=
