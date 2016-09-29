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
      var prToolbarHeight = void 0;
      var fileContainers = document.getElementsByClassName('file-holder');
      var fileHeaders = document.getElementsByClassName('file-title');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9zdGlja3kuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFNLFdBQVcsU0FBWCxRQUFXLENBQUMsT0FBRCxFQUFhO0FBQzVCLE1BQUksUUFBUSxJQUFSLEtBQWlCLE1BQXJCLEVBQTZCO0FBQzNCO0FBQ0EsZUFBVyxZQUFNO0FBQ2YsVUFBTSxhQUFhLFNBQVMsYUFBVCxDQUF1QixxQkFBdkIsQ0FBbkI7QUFDQSxVQUFJLGNBQWMsQ0FBQyxlQUFlLElBQWYsQ0FBb0IsV0FBVyxTQUEvQixDQUFuQixFQUE4RDtBQUM1RCxtQkFBVyxTQUFYLElBQXdCLGNBQXhCO0FBQ0EsK0JBQWEsSUFBYjtBQUNEO0FBQ0YsS0FORCxFQU1HLElBTkg7QUFPRDtBQUNGLENBWEQ7O0FBYUEsT0FBTyxPQUFQLENBQWUsU0FBZixDQUF5QixXQUF6QixDQUFxQyxRQUFyQzs7Ozs7Ozs7Ozs7OztJQ2ZNLE07QUFDSixvQkFBYztBQUFBO0FBQ2I7Ozs7MkJBRU07QUFDTCxVQUFJLHdCQUFKO0FBQ0EsVUFBSSxpQkFBaUIsU0FBUyxzQkFBVCxDQUFnQyxhQUFoQyxDQUFyQjtBQUNBLFVBQUksY0FBYyxTQUFTLHNCQUFULENBQWdDLFlBQWhDLENBQWxCOztBQUVBLFVBQU0scUJBQXFCLFNBQXJCLGtCQUFxQixHQUFNO0FBQy9CLFlBQU0sV0FBVyxTQUFTLHNCQUFULENBQWdDLG9CQUFoQyxDQUFqQjtBQUNBLFlBQUksU0FBUyxDQUFiOztBQUVBLGFBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxTQUFTLE1BQTdCLEVBQXFDLEdBQXJDLEVBQTBDO0FBQ3hDLG1CQUFTLEtBQUssR0FBTCxDQUFTLE1BQVQsRUFBaUIsU0FBUyxDQUFULEVBQVkscUJBQVosR0FBb0MsTUFBckQsQ0FBVDtBQUNEOztBQUVELGVBQU8sU0FBUyxF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O0FBQ0EsYUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFNBQVMsTUFBN0IsRUFBcUMsR0FBckMsRUFBMEM7QUFDeEMsbUJBQVMsQ0FBVCxFQUFZLEtBQVosQ0FBa0IsUUFBbEIsR0FBNkIsVUFBN0I7QUFDRDs7QUFFRCwwQkFBa0Isb0JBQWxCO0FBQ0EsWUFBSSxlQUFlLE1BQW5CLEVBQTJCO0FBQ3pCO0FBQ0E7QUFDQSxtQkFBUyxRQUFULEdBQW9CLHVCQUFwQjtBQUNELFNBSkQsTUFJTztBQUNMO0FBQ0EsbUJBQVMsUUFBVCxHQUFvQixJQUFwQjtBQUNEO0FBQ0YsT0FmRDtBQWlCRDs7Ozs7O2tCQUdZLE0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFN0aWNreSBmcm9tICcuL3N0aWNreSc7XG5cbmNvbnN0IGxpc3RlbmVyID0gKHJlcXVlc3QpID0+IHtcbiAgaWYgKHJlcXVlc3QudHlwZSA9PT0gJ2luaXQnKSB7XG4gICAgLy8gbG9hZGluZyBzcGlubmVyIG1yLWxvYWRpbmctc3RhdHVzXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCBkaWZmc0ZpbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lcmdlLXJlcXVlc3QtdGFicycpO1xuICAgICAgaWYgKGRpZmZzRmlsZXMgJiYgIS9zdGlja3ktaW5pdC9nLnRlc3QoZGlmZnNGaWxlcy5jbGFzc05hbWUpKSB7XG4gICAgICAgIGRpZmZzRmlsZXMuY2xhc3NOYW1lICs9ICcgc3RpY2t5LWluaXQnO1xuICAgICAgICBuZXcgU3RpY2t5KCkuaW5pdCgpO1xuICAgICAgfVxuICAgIH0sIDI1MDApO1xuICB9XG59O1xuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIobGlzdGVuZXIpO1xuXG5cbiIsImNsYXNzIFN0aWNreSAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgbGV0IHByVG9vbGJhckhlaWdodDtcbiAgICBsZXQgZmlsZUNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmaWxlLWhvbGRlcicpO1xuICAgIGxldCBmaWxlSGVhZGVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZpbGUtdGl0bGUnKTtcblxuICAgIGNvbnN0IGdldFByVG9vbGJhckhlaWdodCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHRvb2xiYXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVyZ2UtcmVxdWVzdC10YWJzJyk7XG4gICAgICBsZXQgaGVpZ2h0ID0gMDtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b29sYmFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBoZWlnaHQgPSBNYXRoLm1heChoZWlnaHQsIHRvb2xiYXJzWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoZWlnaHQgKyA1MDtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2V0SGVhZGVyVG9wID0gKGZpbGVIZWFkZXIsIHRvcFBvc2l0aW9uKSA9PiB7XG4gICAgICBmaWxlSGVhZGVyLnN0eWxlLnRvcCA9IHRvcFBvc2l0aW9uICsgJ3B4JztcbiAgICB9O1xuXG4gICAgY29uc3QgcmVzZXRIZWFkZXJzRnJvbSA9IChmaXJzdEluZGV4KSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gZmlyc3RJbmRleDsgaSA8IGZpbGVIZWFkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNldEhlYWRlclRvcChmaWxlSGVhZGVyc1tpXSwgMCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHJlc2V0QWxsSGVhZGVycyA9ICgpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZUhlYWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZmlsZUhlYWRlcnNbaV0uc3R5bGUudG9wID0gJzBweCc7XG4gICAgICAgIGZpbGVIZWFkZXJzW2ldLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgZmlsZUhlYWRlcnNbaV0uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIGZpbGVIZWFkZXJzW2ldLnN0eWxlLnpJbmRleCA9IDE7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHNldEZpbGVDb250YWluZXJzUGFkZGluZyA9ICgpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZUNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgaGVhZGVySGVpZ2h0ID0gZmlsZUhlYWRlcnNbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgICBmaWxlQ29udGFpbmVyc1tpXS5zdHlsZS5wYWRkaW5nVG9wID0gaGVhZGVySGVpZ2h0ICsgJ3B4JztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0Q3VycmVudEZpbGVDb250YWluZXJJbmRleCA9ICgpID0+IHtcbiAgICAgIGxldCBtYXhCZWZvcmVaZXJvID0gLTEwMDAwMDA7XG4gICAgICBsZXQgbWF4QmVmb3JlWmVyb0luZGV4ID0gLTE7XG5cbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBmaWxlQ29udGFpbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjdXJyZW50VG9wID0gZmlsZUNvbnRhaW5lcnNbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICBpZiAoY3VycmVudFRvcCA+IG1heEJlZm9yZVplcm8gJiYgY3VycmVudFRvcCA8IHByVG9vbGJhckhlaWdodCkge1xuICAgICAgICAgIG1heEJlZm9yZVplcm8gPSBjdXJyZW50VG9wO1xuICAgICAgICAgIG1heEJlZm9yZVplcm9JbmRleCA9IGk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1heEJlZm9yZVplcm9JbmRleDtcbiAgICB9O1xuXG4gICAgY29uc3QgbWFrZUN1cnJlbnRIZWFkZXJTdGlja3kgPSAoKSA9PiB7XG4gICAgICBjb25zdCBtYXhCZWZvcmVaZXJvSW5kZXggPSBnZXRDdXJyZW50RmlsZUNvbnRhaW5lckluZGV4KCk7XG4gICAgICBpZiAobWF4QmVmb3JlWmVyb0luZGV4ID09PSAtMSkge1xuICAgICAgICAvLyByZXNldCB0aGUgaGVhZGVycyBpZiB3ZSBzY3JvbGwgYmFjayBiZWZvcmUgdGhlIGZpcnN0IG9uZVxuICAgICAgICByZXNldEFsbEhlYWRlcnMoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjdXJyZW50ZmlsZUNvbnRlbnQgPSBmaWxlQ29udGFpbmVyc1ttYXhCZWZvcmVaZXJvSW5kZXhdO1xuICAgICAgY29uc3QgY3VycmVudEZpbGVIZWFkZXIgPSBmaWxlSGVhZGVyc1ttYXhCZWZvcmVaZXJvSW5kZXhdO1xuICAgICAgY29uc3QgaGVhZGVySGVpZ2h0ID0gY3VycmVudEZpbGVIZWFkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgY29uc3QgbmV3SGVhZGVyVG9wID0gKGN1cnJlbnRmaWxlQ29udGVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKiAtMSkgLTE7XG5cbiAgICAgIGlmIChuZXdIZWFkZXJUb3AgPCBwclRvb2xiYXJIZWlnaHQgKiAtMSkge1xuICAgICAgICAvLyBXZSByZWFjaGVkIHRoZSB0b3Agb2YgdGhlIGZpbGUgc2Nyb2xsaW5nIHVwXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKG5ld0hlYWRlclRvcCArIGhlYWRlckhlaWdodCArIHByVG9vbGJhckhlaWdodCA+IGN1cnJlbnRmaWxlQ29udGVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQpIHtcbiAgICAgICAgLy8gV2UgcmVhY2hlZCB0aGUgYm90dG9tIG9mIHRoZSBmaWxlIHNjcm9sbGluZyBkb3duXG4gICAgICAgIHNldEhlYWRlclRvcChcbiAgICAgICAgICBjdXJyZW50RmlsZUhlYWRlcixcbiAgICAgICAgICBjdXJyZW50ZmlsZUNvbnRlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IC0gaGVhZGVySGVpZ2h0ICsgJ3B4J1xuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0SGVhZGVyVG9wKGN1cnJlbnRGaWxlSGVhZGVyLCBuZXdIZWFkZXJUb3AgKyBwclRvb2xiYXJIZWlnaHQpO1xuXG4gICAgICByZXNldEhlYWRlcnNGcm9tKG1heEJlZm9yZVplcm9JbmRleCArIDEpO1xuICAgIH07XG5cbiAgICAoKCkgPT4ge1xuICAgICAgbGV0IGRpZmZGaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGlmZi1maWxlJyk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpZmZGaWxlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRpZmZGaWxlW2ldLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAgIH1cblxuICAgICAgcHJUb29sYmFySGVpZ2h0ID0gZ2V0UHJUb29sYmFySGVpZ2h0KCk7XG4gICAgICBpZiAoZmlsZUNvbnRhaW5lcnMubGVuZ3RoKSB7XG4gICAgICAgIHJlc2V0QWxsSGVhZGVycygpO1xuICAgICAgICBzZXRGaWxlQ29udGFpbmVyc1BhZGRpbmcoKTtcbiAgICAgICAgZG9jdW1lbnQub25zY3JvbGwgPSBtYWtlQ3VycmVudEhlYWRlclN0aWNreTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJlbW92ZSBvbnNjcm9sbCBsaXN0ZW5lciBpZiBubyBmaWxlIGlzIHByZXNlbnQgaW4gdGhlIGN1cnJlbnQgcGFnZVxuICAgICAgICBkb2N1bWVudC5vbnNjcm9sbCA9IG51bGw7XG4gICAgICB9XG4gICAgfSkoKTtcblxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0aWNreTtcbiJdfQ==
