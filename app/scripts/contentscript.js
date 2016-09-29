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
    }, 2500);
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
      var prToolbarHeight;
      var fileContainers = document.getElementsByClassName('file-holder');
      var fileHeaders = document.getElementsByClassName('file-title');
      var toggleButtons = [];
      var collapseText = 'Collapse';
      var expandText = 'Expand';

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
          fileHeaders[i].style.zIndex = 1;
        }
      };

      var setFileContainersPadding = function setFileContainersPadding() {
        for (var i = 0; i < fileContainers.length; i++) {
          var headerHeight = fileHeaders[i].getBoundingClientRect().height;
          fileContainers[i].style.paddingTop = headerHeight + 'px';
        }
      };

      var getCurrentFileContainerIndex = function getCurrentFileContainerIndex() {
        var maxBerofeZero = -1000000;
        var maxBerofeZeroIndex = -1;
        for (var i = 0; i < fileContainers.length; i++) {
          var currentTop = fileContainers[i].getBoundingClientRect().top;
          if (currentTop > maxBerofeZero && currentTop < prToolbarHeight) {
            maxBerofeZero = currentTop;
            maxBerofeZeroIndex = i;
          }
        }
        return maxBerofeZeroIndex;
      };

      var makeCurrentHeaderSticky = function makeCurrentHeaderSticky() {
        var maxBerofeZeroIndex = getCurrentFileContainerIndex();
        if (maxBerofeZeroIndex === -1) {
          // reset the headers if we scroll back before the first one
          resetAllHeaders();
          return;
        }

        var currentfileContent = fileContainers[maxBerofeZeroIndex];
        var currentFileHeader = fileHeaders[maxBerofeZeroIndex];
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

        resetHeadersFrom(maxBerofeZeroIndex + 1);
      };

      var init = function init() {
        var diffFile = document.getElementsByClassName('diff-file');
        for (var i = 0; i < diffFile.length; i++) {
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
  }]);

  return Sticky;
}();

exports.default = Sticky;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9zdGlja3kuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFNLFdBQVcsU0FBWCxRQUFXLENBQUMsT0FBRCxFQUFhO0FBQzVCLE1BQUksUUFBUSxJQUFSLEtBQWlCLE1BQXJCLEVBQTZCO0FBQzNCO0FBQ0EsZUFBVyxZQUFNO0FBQ2YsVUFBTSxhQUFhLFNBQVMsYUFBVCxDQUF1QixxQkFBdkIsQ0FBbkI7QUFDQSxVQUFJLGNBQWMsQ0FBQyxlQUFlLElBQWYsQ0FBb0IsV0FBVyxTQUEvQixDQUFuQixFQUE4RDtBQUM1RCxtQkFBVyxTQUFYLElBQXdCLGNBQXhCO0FBQ0EsK0JBQWEsSUFBYjtBQUNEO0FBQ0YsS0FORCxFQU1HLElBTkg7QUFPRDtBQUNGLENBWEQ7O0FBYUEsT0FBTyxPQUFQLENBQWUsU0FBZixDQUF5QixXQUF6QixDQUFxQyxRQUFyQzs7Ozs7Ozs7Ozs7OztJQ2ZNLE07QUFDSixvQkFBYztBQUFBO0FBRWI7Ozs7MkJBRU07QUFDTCxVQUFJLGVBQUo7QUFDQSxVQUFJLGlCQUFpQixTQUFTLHNCQUFULENBQWdDLGFBQWhDLENBQXJCO0FBQ0EsVUFBSSxjQUFjLFNBQVMsc0JBQVQsQ0FBZ0MsWUFBaEMsQ0FBbEI7QUFDQSxVQUFJLGdCQUFnQixFQUFwQjtBQUNBLFVBQUksZUFBZSxVQUFuQjtBQUNBLFVBQUksYUFBYSxRQUFqQjs7QUFFQSxVQUFNLHFCQUFxQixTQUFyQixrQkFBcUIsR0FBTTtBQUMvQixZQUFNLFdBQVcsU0FBUyxzQkFBVCxDQUFnQyxvQkFBaEMsQ0FBakI7QUFDQSxZQUFJLFNBQVMsQ0FBYjtBQUNBLGFBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxTQUFTLE1BQTdCLEVBQXFDLEdBQXJDLEVBQTBDO0FBQ3hDLG1CQUFTLEtBQUssR0FBTCxDQUFTLE1BQVQsRUFB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QkQ7O0FBNEJBLFVBQU0sT0FBTyxTQUFQLElBQU8sR0FBTTtBQUNqQixZQUFJLFdBQVcsU0FBUyxzQkFBVCxDQUFnQyxXQUFoQyxDQUFmO0FBQ0EsYUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFNBQVMsTUFBN0IsRUFBcUMsR0FBckMsRUFBMEM7QUFDeEMsbUJBQVMsQ0FBVCxFQUFZLEtBQVosQ0FBa0IsUUFBbEIsR0FBNkIsVUFBN0I7QUFDRDs7QUFFRCwwQkFBa0Isb0JBQWxCO0FBQ0EsWUFBSSxlQUFlLE1BQWYsS0FBMEIsQ0FBOUIsRUFBaUM7QUFDL0I7QUFDQTtBQUNBLG1CQUFTLFFBQVQsR0FBb0IsdUJBQXBCO0FBQ0QsU0FKRCxNQUlPO0FBQ0w7QUFDQSxtQkFBUyxRQUFULEdBQW9CLElBQXBCO0FBQ0Q7QUFDRixPQWZEOztBQWlCQTtBQUVEOzs7Ozs7a0JBR1ksTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgU3RpY2t5IGZyb20gJy4vc3RpY2t5JztcblxuY29uc3QgbGlzdGVuZXIgPSAocmVxdWVzdCkgPT4ge1xuICBpZiAocmVxdWVzdC50eXBlID09PSAnaW5pdCcpIHtcbiAgICAvLyBsb2FkaW5nIHNwaW5uZXIgbXItbG9hZGluZy1zdGF0dXNcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IGRpZmZzRmlsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVyZ2UtcmVxdWVzdC10YWJzJyk7XG4gICAgICBpZiAoZGlmZnNGaWxlcyAmJiAhL3N0aWNreS1pbml0L2cudGVzdChkaWZmc0ZpbGVzLmNsYXNzTmFtZSkpIHtcbiAgICAgICAgZGlmZnNGaWxlcy5jbGFzc05hbWUgKz0gJyBzdGlja3ktaW5pdCc7XG4gICAgICAgIG5ldyBTdGlja3koKS5pbml0KCk7XG4gICAgICB9XG4gICAgfSwgMjUwMCk7XG4gIH1cbn07XG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihsaXN0ZW5lcik7XG5cblxuIiwiY2xhc3MgU3RpY2t5ICB7XG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cblxuICBpbml0KCkge1xuICAgIHZhciBwclRvb2xiYXJIZWlnaHQ7XG4gICAgdmFyIGZpbGVDb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZmlsZS1ob2xkZXInKTtcbiAgICB2YXIgZmlsZUhlYWRlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmaWxlLXRpdGxlJyk7XG4gICAgdmFyIHRvZ2dsZUJ1dHRvbnMgPSBbXTtcbiAgICB2YXIgY29sbGFwc2VUZXh0ID0gJ0NvbGxhcHNlJztcbiAgICB2YXIgZXhwYW5kVGV4dCA9ICdFeHBhbmQnO1xuXG4gICAgY29uc3QgZ2V0UHJUb29sYmFySGVpZ2h0ID0gKCkgPT4ge1xuICAgICAgY29uc3QgdG9vbGJhcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZXJnZS1yZXF1ZXN0LXRhYnMnKTtcbiAgICAgIGxldCBoZWlnaHQgPSAwO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b29sYmFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBoZWlnaHQgPSBNYXRoLm1heChoZWlnaHQsIHRvb2xiYXJzWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoZWlnaHQgKyA1MDtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2V0SGVhZGVyVG9wID0gZnVuY3Rpb24oZmlsZUhlYWRlciwgdG9wUG9zaXRpb24pIHtcbiAgICAgIGZpbGVIZWFkZXIuc3R5bGUudG9wID0gdG9wUG9zaXRpb24gKyAncHgnO1xuICAgIH07XG5cbiAgICBjb25zdCByZXNldEhlYWRlcnNGcm9tID0gZnVuY3Rpb24oZmlyc3RJbmRleCkge1xuICAgICAgZm9yIChsZXQgaSA9IGZpcnN0SW5kZXg7IGkgPCBmaWxlSGVhZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzZXRIZWFkZXJUb3AoZmlsZUhlYWRlcnNbaV0sIDApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCByZXNldEFsbEhlYWRlcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZUhlYWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZmlsZUhlYWRlcnNbaV0uc3R5bGUudG9wID0gJzBweCc7XG4gICAgICAgIGZpbGVIZWFkZXJzW2ldLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgZmlsZUhlYWRlcnNbaV0uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIGZpbGVIZWFkZXJzW2ldLnN0eWxlLnpJbmRleCA9IDE7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHNldEZpbGVDb250YWluZXJzUGFkZGluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlQ29udGFpbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaGVhZGVySGVpZ2h0ID0gZmlsZUhlYWRlcnNbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgICBmaWxlQ29udGFpbmVyc1tpXS5zdHlsZS5wYWRkaW5nVG9wID0gaGVhZGVySGVpZ2h0ICsgJ3B4JztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0Q3VycmVudEZpbGVDb250YWluZXJJbmRleCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG1heEJlcm9mZVplcm8gPSAtMTAwMDAwMDtcbiAgICAgIHZhciBtYXhCZXJvZmVaZXJvSW5kZXggPSAtMTtcbiAgICAgIGZvcihsZXQgaT0wOyBpPGZpbGVDb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjdXJyZW50VG9wID0gZmlsZUNvbnRhaW5lcnNbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICBpZiAoY3VycmVudFRvcCA+IG1heEJlcm9mZVplcm8gJiYgY3VycmVudFRvcCA8IHByVG9vbGJhckhlaWdodCkge1xuICAgICAgICAgIG1heEJlcm9mZVplcm8gPSBjdXJyZW50VG9wO1xuICAgICAgICAgIG1heEJlcm9mZVplcm9JbmRleCA9IGk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXhCZXJvZmVaZXJvSW5kZXg7XG4gICAgfTtcblxuICAgIHZhciBtYWtlQ3VycmVudEhlYWRlclN0aWNreSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG1heEJlcm9mZVplcm9JbmRleCA9IGdldEN1cnJlbnRGaWxlQ29udGFpbmVySW5kZXgoKTtcbiAgICAgIGlmIChtYXhCZXJvZmVaZXJvSW5kZXggPT09IC0xKSB7XG4gICAgICAgIC8vIHJlc2V0IHRoZSBoZWFkZXJzIGlmIHdlIHNjcm9sbCBiYWNrIGJlZm9yZSB0aGUgZmlyc3Qgb25lXG4gICAgICAgIHJlc2V0QWxsSGVhZGVycygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBjdXJyZW50ZmlsZUNvbnRlbnQgPSBmaWxlQ29udGFpbmVyc1ttYXhCZXJvZmVaZXJvSW5kZXhdO1xuICAgICAgdmFyIGN1cnJlbnRGaWxlSGVhZGVyID0gZmlsZUhlYWRlcnNbbWF4QmVyb2ZlWmVyb0luZGV4XTtcbiAgICAgIHZhciBoZWFkZXJIZWlnaHQgPSBjdXJyZW50RmlsZUhlYWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICB2YXIgbmV3SGVhZGVyVG9wID0gKGN1cnJlbnRmaWxlQ29udGVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKiAtMSkgLTE7XG5cbiAgICAgIGlmIChuZXdIZWFkZXJUb3AgPCBwclRvb2xiYXJIZWlnaHQgKiAtMSkge1xuICAgICAgICAvLyBXZSByZWFjaGVkIHRoZSB0b3Agb2YgdGhlIGZpbGUgc2Nyb2xsaW5nIHVwXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChuZXdIZWFkZXJUb3AgKyBoZWFkZXJIZWlnaHQgKyBwclRvb2xiYXJIZWlnaHQgPiBjdXJyZW50ZmlsZUNvbnRlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0KSB7XG4gICAgICAgIC8vIFdlIHJlYWNoZWQgdGhlIGJvdHRvbSBvZiB0aGUgZmlsZSBzY3JvbGxpbmcgZG93blxuICAgICAgICBzZXRIZWFkZXJUb3AoY3VycmVudEZpbGVIZWFkZXIsIGN1cnJlbnRmaWxlQ29udGVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgLSBoZWFkZXJIZWlnaHQgKyAncHgnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRIZWFkZXJUb3AoY3VycmVudEZpbGVIZWFkZXIsIG5ld0hlYWRlclRvcCArIHByVG9vbGJhckhlaWdodCk7XG5cbiAgICAgIHJlc2V0SGVhZGVyc0Zyb20obWF4QmVyb2ZlWmVyb0luZGV4ICsgMSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgICBsZXQgZGlmZkZpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkaWZmLWZpbGUnKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlmZkZpbGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZGlmZkZpbGVbaV0uc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgfVxuXG4gICAgICBwclRvb2xiYXJIZWlnaHQgPSBnZXRQclRvb2xiYXJIZWlnaHQoKTtcbiAgICAgIGlmIChmaWxlQ29udGFpbmVycy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgcmVzZXRBbGxIZWFkZXJzKCk7XG4gICAgICAgIHNldEZpbGVDb250YWluZXJzUGFkZGluZygpO1xuICAgICAgICBkb2N1bWVudC5vbnNjcm9sbCA9IG1ha2VDdXJyZW50SGVhZGVyU3RpY2t5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmVtb3ZlIG9uc2Nyb2xsIGxpc3RlbmVyIGlmIG5vIGZpbGUgaXMgcHJlc2VudCBpbiB0aGUgY3VycmVudCBwYWdlXG4gICAgICAgIGRvY3VtZW50Lm9uc2Nyb2xsID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaW5pdCgpO1xuXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RpY2t5O1xuIl19
