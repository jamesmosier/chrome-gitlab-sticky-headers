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
          console.log('reached TOP');
          return;
        }

        if (newHeaderTop + headerHeight + prToolbarHeight > currentfileContent.getBoundingClientRect().height) {
          console.log('reached BOTTOM');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9zdGlja3kuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFNLFdBQVcsU0FBWCxRQUFXLENBQUMsT0FBRCxFQUFhO0FBQzVCLE1BQUksUUFBUSxJQUFSLEtBQWlCLE1BQXJCLEVBQTZCO0FBQzNCO0FBQ0EsZUFBVyxZQUFNO0FBQ2YsVUFBTSxhQUFhLFNBQVMsYUFBVCxDQUF1QixxQkFBdkIsQ0FBbkI7QUFDQSxVQUFJLGNBQWMsQ0FBQyxlQUFlLElBQWYsQ0FBb0IsV0FBVyxTQUEvQixDQUFuQixFQUE4RDtBQUM1RCxtQkFBVyxTQUFYLElBQXdCLGNBQXhCO0FBQ0EsK0JBQWEsSUFBYjtBQUNEO0FBQ0YsS0FORCxFQU1HLElBTkg7QUFPRDtBQUNGLENBWEQ7O0FBYUEsT0FBTyxPQUFQLENBQWUsU0FBZixDQUF5QixXQUF6QixDQUFxQyxRQUFyQzs7Ozs7Ozs7Ozs7OztJQ2ZNLE07QUFDSixvQkFBYztBQUFBO0FBQ2I7Ozs7MkJBRU07QUFDTCxVQUFJLHdCQUFKO0FBQ0EsVUFBSSxpQkFBaUIsU0FBUyxnQkFBVCxDQUEwQix1QkFBMUIsQ0FBckI7QUFDQSxVQUFJLGNBQWMsU0FBUyxnQkFBVCxDQUEwQixvQkFBMUIsQ0FBbEI7O0FBRUEsVUFBTSxxQkFBcUIsU0FBckIsa0JBQXFCLEdBQU07QUFDL0IsWUFBTSxXQUFXLFNBQVMsc0JBQVQsQ0FBZ0Msb0JBQWhDLENBQWpCO0FBQ0EsWUFBSSxTQUFTLENBQWI7O0FBRUEsYUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFNBQVMsTUFBN0IsRUFBcUMsR0FBckMsRUFBMEM7QUFDeEMsbUJBQVMsS0FBSyxHQUFMLENBQVMsTUFBVCxFQUFpQixTQUFTLENBQVQsRUFBWSxxQkFBWixHQUFvQyxNQUFyRCxDQUFUO0FBQ0Q7O0FBRUQsZUFBTyxTQUFT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Q0EsT0FBQyxZQUFNO0FBQ0wsWUFBSSxXQUFXLFNBQVMsc0JBQVQsQ0FBZ0MsV0FBaEMsQ0FBZjtBQUNBLGFBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxTQUFTLE1BQTdCLEVBQXFDLEdBQXJDLEVBQTBDO0FBQ3hDLG1CQUFTLENBQVQsRUFBWSxLQUFaLENBQWtCLFFBQWxCLEdBQTZCLFVBQTdCO0FBQ0Q7O0FBRUQsMEJBQWtCLG9CQUFsQjtBQUNBLFlBQUksZUFBZSxNQUFuQixFQUEyQjtBQUN6QjtBQUNBO0FBQ0EsbUJBQVMsUUFBVCxHQUFvQix1QkFBcEI7QUFDRCxTQUpELE1BSU87QUFDTDtBQUNBLG1CQUFTLFFBQVQsR0FBb0IsSUFBcEI7QUFDRDtBQUNGLE9BZkQ7QUFpQkQ7Ozs7OztrQkFHWSxNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBTdGlja3kgZnJvbSAnLi9zdGlja3knO1xuXG5jb25zdCBsaXN0ZW5lciA9IChyZXF1ZXN0KSA9PiB7XG4gIGlmIChyZXF1ZXN0LnR5cGUgPT09ICdpbml0Jykge1xuICAgIC8vIGxvYWRpbmcgc3Bpbm5lciBtci1sb2FkaW5nLXN0YXR1c1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgZGlmZnNGaWxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZXJnZS1yZXF1ZXN0LXRhYnMnKTtcbiAgICAgIGlmIChkaWZmc0ZpbGVzICYmICEvc3RpY2t5LWluaXQvZy50ZXN0KGRpZmZzRmlsZXMuY2xhc3NOYW1lKSkge1xuICAgICAgICBkaWZmc0ZpbGVzLmNsYXNzTmFtZSArPSAnIHN0aWNreS1pbml0JztcbiAgICAgICAgbmV3IFN0aWNreSgpLmluaXQoKTtcbiAgICAgIH1cbiAgICB9LCA0MDAwKTtcbiAgfVxufTtcblxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGxpc3RlbmVyKTtcblxuXG4iLCJjbGFzcyBTdGlja3kgIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGxldCBwclRvb2xiYXJIZWlnaHQ7XG4gICAgbGV0IGZpbGVDb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYmxvYi1kaWZmLXBhdGhdJyk7XG4gICAgbGV0IGZpbGVIZWFkZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltpZF49J2ZpbGUtcGF0aC0nXVwiKTtcblxuICAgIGNvbnN0IGdldFByVG9vbGJhckhlaWdodCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHRvb2xiYXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVyZ2UtcmVxdWVzdC10YWJzJyk7XG4gICAgICBsZXQgaGVpZ2h0ID0gMDtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b29sYmFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBoZWlnaHQgPSBNYXRoLm1heChoZWlnaHQsIHRvb2xiYXJzWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoZWlnaHQgKyA1MDtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2V0SGVhZGVyVG9wID0gKGZpbGVIZWFkZXIsIHRvcFBvc2l0aW9uKSA9PiB7XG4gICAgICBmaWxlSGVhZGVyLnN0eWxlLnRvcCA9IHRvcFBvc2l0aW9uICsgJ3B4JztcbiAgICB9O1xuXG4gICAgY29uc3QgcmVzZXRIZWFkZXJzRnJvbSA9IChmaXJzdEluZGV4KSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gZmlyc3RJbmRleDsgaSA8IGZpbGVIZWFkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNldEhlYWRlclRvcChmaWxlSGVhZGVyc1tpXSwgMCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHJlc2V0QWxsSGVhZGVycyA9ICgpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZUhlYWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZmlsZUhlYWRlcnNbaV0uc3R5bGUudG9wID0gJzBweCc7XG4gICAgICAgIGZpbGVIZWFkZXJzW2ldLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgZmlsZUhlYWRlcnNbaV0uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIGZpbGVIZWFkZXJzW2ldLnN0eWxlLnpJbmRleCA9IDk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHNldEZpbGVDb250YWluZXJzUGFkZGluZyA9ICgpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZUNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgaGVhZGVySGVpZ2h0ID0gZmlsZUhlYWRlcnNbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgICBmaWxlQ29udGFpbmVyc1tpXS5zdHlsZS5wYWRkaW5nVG9wID0gaGVhZGVySGVpZ2h0ICsgJ3B4JztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0Q3VycmVudEZpbGVDb250YWluZXJJbmRleCA9ICgpID0+IHtcbiAgICAgIGxldCBtYXhCZWZvcmVaZXJvID0gLTEwMDAwMDA7XG4gICAgICBsZXQgbWF4QmVmb3JlWmVyb0luZGV4ID0gLTE7XG5cbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBmaWxlQ29udGFpbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjdXJyZW50VG9wID0gZmlsZUNvbnRhaW5lcnNbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICBpZiAoY3VycmVudFRvcCA+IG1heEJlZm9yZVplcm8gJiYgY3VycmVudFRvcCA8IHByVG9vbGJhckhlaWdodCkge1xuICAgICAgICAgIG1heEJlZm9yZVplcm8gPSBjdXJyZW50VG9wO1xuICAgICAgICAgIG1heEJlZm9yZVplcm9JbmRleCA9IGk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1heEJlZm9yZVplcm9JbmRleDtcbiAgICB9O1xuXG4gICAgY29uc3QgbWFrZUN1cnJlbnRIZWFkZXJTdGlja3kgPSAoKSA9PiB7XG4gICAgICBjb25zdCBtYXhCZWZvcmVaZXJvSW5kZXggPSBnZXRDdXJyZW50RmlsZUNvbnRhaW5lckluZGV4KCk7XG4gICAgICBpZiAobWF4QmVmb3JlWmVyb0luZGV4ID09PSAtMSkge1xuICAgICAgICAvLyByZXNldCB0aGUgaGVhZGVycyBpZiB3ZSBzY3JvbGwgYmFjayBiZWZvcmUgdGhlIGZpcnN0IG9uZVxuICAgICAgICByZXNldEFsbEhlYWRlcnMoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjdXJyZW50ZmlsZUNvbnRlbnQgPSBmaWxlQ29udGFpbmVyc1ttYXhCZWZvcmVaZXJvSW5kZXhdO1xuICAgICAgY29uc3QgY3VycmVudEZpbGVIZWFkZXIgPSBmaWxlSGVhZGVyc1ttYXhCZWZvcmVaZXJvSW5kZXhdO1xuICAgICAgY29uc3QgaGVhZGVySGVpZ2h0ID0gY3VycmVudEZpbGVIZWFkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgY29uc3QgbmV3SGVhZGVyVG9wID0gKGN1cnJlbnRmaWxlQ29udGVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKiAtMSkgLTE7XG5cbiAgICAgIGlmIChuZXdIZWFkZXJUb3AgPCBwclRvb2xiYXJIZWlnaHQgKiAtMSkge1xuICAgICAgICAvLyBXZSByZWFjaGVkIHRoZSB0b3Agb2YgdGhlIGZpbGUgc2Nyb2xsaW5nIHVwXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWFjaGVkIFRPUCcpXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKG5ld0hlYWRlclRvcCArIGhlYWRlckhlaWdodCArIHByVG9vbGJhckhlaWdodCA+IGN1cnJlbnRmaWxlQ29udGVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlYWNoZWQgQk9UVE9NJylcbiAgICAgICAgLy8gV2UgcmVhY2hlZCB0aGUgYm90dG9tIG9mIHRoZSBmaWxlIHNjcm9sbGluZyBkb3duXG4gICAgICAgIHNldEhlYWRlclRvcChcbiAgICAgICAgICBjdXJyZW50RmlsZUhlYWRlcixcbiAgICAgICAgICBjdXJyZW50ZmlsZUNvbnRlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IC0gaGVhZGVySGVpZ2h0ICsgJ3B4J1xuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0SGVhZGVyVG9wKGN1cnJlbnRGaWxlSGVhZGVyLCBuZXdIZWFkZXJUb3AgKyBwclRvb2xiYXJIZWlnaHQpO1xuXG4gICAgICByZXNldEhlYWRlcnNGcm9tKG1heEJlZm9yZVplcm9JbmRleCArIDEpO1xuICAgIH07XG5cbiAgICAoKCkgPT4ge1xuICAgICAgbGV0IGRpZmZGaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGlmZi1maWxlJyk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpZmZGaWxlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRpZmZGaWxlW2ldLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAgIH1cblxuICAgICAgcHJUb29sYmFySGVpZ2h0ID0gZ2V0UHJUb29sYmFySGVpZ2h0KCk7XG4gICAgICBpZiAoZmlsZUNvbnRhaW5lcnMubGVuZ3RoKSB7XG4gICAgICAgIHJlc2V0QWxsSGVhZGVycygpO1xuICAgICAgICBzZXRGaWxlQ29udGFpbmVyc1BhZGRpbmcoKTtcbiAgICAgICAgZG9jdW1lbnQub25zY3JvbGwgPSBtYWtlQ3VycmVudEhlYWRlclN0aWNreTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJlbW92ZSBvbnNjcm9sbCBsaXN0ZW5lciBpZiBubyBmaWxlIGlzIHByZXNlbnQgaW4gdGhlIGN1cnJlbnQgcGFnZVxuICAgICAgICBkb2N1bWVudC5vbnNjcm9sbCA9IG51bGw7XG4gICAgICB9XG4gICAgfSkoKTtcblxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0aWNreTtcbiJdfQ==
