(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _sticky = require('./sticky');

var _sticky2 = _interopRequireDefault(_sticky);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listener = function listener(request) {
  var isMergeRequest = window.location.href.indexOf('merge_requests') > -1;
  if (request.type === 'init' && isMergeRequest) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9zdGlja3kuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFNLFdBQVcsU0FBWCxRQUFXLENBQUMsT0FBRCxFQUFhO0FBQzVCLE1BQU0saUJBQWlCLE9BQU8sUUFBUCxDQUFnQixJQUFoQixDQUFxQixPQUFyQixDQUE2QixnQkFBN0IsSUFBaUQsQ0FBQyxDQUF6RTtBQUNBLE1BQUksUUFBUSxJQUFSLEtBQWlCLE1BQWpCLElBQTJCLGNBQS9CLEVBQStDO0FBQzdDLFFBQU0sU0FBUyxTQUFTLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBZjs7QUFFQTtBQUNBLFFBQU0sV0FBVyxJQUFJLGdCQUFKLENBQXFCLFVBQUMsU0FBRCxFQUFlO0FBQ25ELGdCQUFVLE9BQVYsQ0FBa0IsVUFBQyxRQUFELEVBQWM7QUFDOUIsWUFBTSxhQUFhLFNBQVMsYUFBVCxDQUF1QixxQkFBdkIsQ0FBbkI7QUFDQSxZQUFJLGNBQWMsQ0FBQyxlQUFlLElBQWYsQ0FBb0IsV0FBVyxTQUEvQixDQUFuQixFQUE4RDtBQUM1RCxxQkFBVyxTQUFYLElBQXdCLGNBQXhCO0FBQ0EsaUNBQWEsSUFBYjtBQUNEO0FBQ0YsT0FORDtBQU9ELEtBUmdCLENBQWpCOztBQVVBLFFBQU0sU0FBUyxFQUFFLFlBQVksSUFBZCxFQUFvQixXQUFXLElBQS9CLEVBQXFDLGVBQWUsSUFBcEQsRUFBZjtBQUNBLGFBQVMsT0FBVCxDQUFpQixNQUFqQixFQUF5QixNQUF6QjtBQUNEO0FBQ0YsQ0FuQkQ7O0FBcUJBLE9BQU8sT0FBUCxDQUFlLFNBQWYsQ0FBeUIsV0FBekIsQ0FBcUMsUUFBckM7Ozs7Ozs7Ozs7Ozs7SUN2Qk0sTTtBQUNKLG9CQUFjO0FBQUE7QUFDYjs7OzsyQkFFTTtBQUNMLFVBQUksd0JBQUo7QUFDQSxVQUFJLGlCQUFpQixTQUFTLGdCQUFULENBQTBCLHVCQUExQixDQUFyQjtBQUNBLFVBQUksY0FBYyxTQUFTLGdCQUFULENBQTBCLG9CQUExQixDQUFsQjs7QUFFQSxVQUFNLHFCQUFxQixTQUFyQixrQkFBcUIsR0FBTTtBQUMvQixZQUFNLFdBQVcsU0FBUyxzQkFBVCxDQUFnQyxvQkFBaEMsQ0FBakI7QUFDQSxZQUFJLFNBQVMsQ0FBYjs7QUFFQSxhQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksU0FBUyxNQUE3QixFQUFxQyxHQUFyQyxFQUEwQztBQUN4QyxtQkFBUyxLQUFLLEdBQUwsQ0FBUyxNQUFULEVBQWlCLFNBQVMsQ0FBVCxFQUFZLHFCQUFaLEdBQW9DLE1BQXJELENBQVQ7QUFDRDs7QUFFRCxlQUFPLFNBQVMsRUFBaEI7QUFDRCxPQVREOztBQVdBLFVBQU0sZUFBZSxTQUFmLFlBQWUsQ0FBQyxVQUFELEVBQWEsV0FBYixFQUE2QjtBQUNoRCxtQkFBVyxLQUFYLENBQWlCLEdBQWpCLEdBQXVCLGNBQWMsSUFBckM7QUFDRCxPQUZEOztBQUlBLFVBQU0sbUJBQW1CLFNBQW5CLGdCQUFtQixDQUFDLFVBQUQsRUFBZ0I7QUFDdkMsYUFBSyxJQUFJLElBQUksVUFBYixFQUF5QixJQUFJLFlBQVksTUFBekMsRUFBaUQsR0FBakQsRUFBc0Q7QUFDcEQsdUJBQWEsWUFBWSxDQUFaLENBQWIsRUFBNkIsQ0FBN0I7QUFDRDtBQUNGLE9BSkQ7O0FBTUEsVUFBTSxrQkFBa0IsU0FBbEIsZUFBa0IsR0FBTTtBQUM1QixhQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksWUFBWSxNQUFoQyxFQUF3QyxHQUF4QyxFQUE2QztBQUMzQyxzQkFBWSxDQUFaLEVBQWUsS0FBZixDQUFxQixHQUFyQixHQUEyQixLQUEzQjtBQUNBLHNCQUFZLENBQVosRUFBZSxLQUFmLENBQXFCLFFBQXJCLEdBQWdDLFVBQWhDO0FBQ0Esc0JBQVksQ0FBWixFQUFlLEtBQWYsQ0FBcUIsS0FBckIsR0FBNkIsTUFBN0I7QUFDQSxzQkFBWSxDQUFaLEVBQWUsS0FBZixDQUFxQixNQUFyQixHQUE4QixDQUE5QjtBQUNEO0FBQ0YsT0FQRDs7QUFTQSxVQUFNLDJCQUEyQixTQUEzQix3QkFBMkIsR0FBTTtBQUNyQyxhQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksZUFBZSxNQUFuQyxFQUEyQyxHQUEzQyxFQUFnRDtBQUM5QyxjQUFNLGVBQWUsWUFBWSxDQUFaLEVBQWUscUJBQWYsR0FBdUMsTUFBNUQ7QUFDQSx5QkFBZSxDQUFmLEVBQWtCLEtBQWxCLENBQXdCLFVBQXhCLEdBQXFDLGVBQWUsSUFBcEQ7QUFDRDtBQUNGLE9BTEQ7O0FBT0EsVUFBTSwrQkFBK0IsU0FBL0IsNEJBQStCLEdBQU07QUFDekMsWUFBSSxnQkFBZ0IsQ0FBQyxPQUFyQjtBQUNBLFlBQUkscUJBQXFCLENBQUMsQ0FBMUI7O0FBRUEsYUFBSSxJQUFJLElBQUksQ0FBWixFQUFlLElBQUksZUFBZSxNQUFsQyxFQUEwQyxHQUExQyxFQUErQztBQUM3QyxjQUFNLGFBQWEsZUFBZSxDQUFmLEVBQWtCLHFCQUFsQixHQUEwQyxHQUE3RDtBQUNBLGNBQUksYUFBYSxhQUFiLElBQThCLGFBQWEsZUFBL0MsRUFBZ0U7QUFDOUQsNEJBQWdCLFVBQWhCO0FBQ0EsaUNBQXFCLENBQXJCO0FBQ0Q7QUFDRjs7QUFFRCxlQUFPLGtCQUFQO0FBQ0QsT0FiRDs7QUFlQSxVQUFNLDBCQUEwQixTQUExQix1QkFBMEIsR0FBTTtBQUNwQyxZQUFNLHFCQUFxQiw4QkFBM0I7QUFDQSxZQUFJLHVCQUF1QixDQUFDLENBQTVCLEVBQStCO0FBQzdCO0FBQ0E7QUFDQTtBQUNEOztBQUVELFlBQU0scUJBQXFCLGVBQWUsa0JBQWYsQ0FBM0I7QUFDQSxZQUFNLG9CQUFvQixZQUFZLGtCQUFaLENBQTFCO0FBQ0EsWUFBTSxlQUFlLGtCQUFrQixxQkFBbEIsR0FBMEMsTUFBL0Q7QUFDQSxZQUFNLGVBQWdCLG1CQUFtQixxQkFBbkIsR0FBMkMsR0FBM0MsR0FBaUQsQ0FBQyxDQUFuRCxHQUF1RCxDQUE1RTs7QUFFQSxZQUFJLGVBQWUsa0JBQWtCLENBQUMsQ0FBdEMsRUFBeUM7QUFDdkM7QUFDQTtBQUNEOztBQUVELFlBQUksZUFBZSxZQUFmLEdBQThCLGVBQTlCLEdBQWdELG1CQUFtQixxQkFBbkIsR0FBMkMsTUFBL0YsRUFBdUc7QUFDckc7QUFDQSx1QkFDRSxpQkFERixFQUVFLG1CQUFtQixxQkFBbkIsR0FBMkMsTUFBM0MsR0FBb0QsWUFBcEQsR0FBbUUsSUFGckU7O0FBS0E7QUFDRDs7QUFFRCxxQkFBYSxpQkFBYixFQUFnQyxlQUFlLGVBQS9DOztBQUVBLHlCQUFpQixxQkFBcUIsQ0FBdEM7QUFDRCxPQS9CRDs7QUFpQ0EsT0FBQyxZQUFNO0FBQ0wsWUFBSSxXQUFXLFNBQVMsc0JBQVQsQ0FBZ0MsV0FBaEMsQ0FBZjtBQUNBLGFBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxTQUFTLE1BQTdCLEVBQXFDLEdBQXJDLEVBQTBDO0FBQ3hDLG1CQUFTLENBQVQsRUFBWSxLQUFaLENBQWtCLFFBQWxCLEdBQTZCLFVBQTdCO0FBQ0Q7O0FBRUQsMEJBQWtCLG9CQUFsQjtBQUNBLFlBQUksZUFBZSxNQUFuQixFQUEyQjtBQUN6QjtBQUNBO0FBQ0EsbUJBQVMsUUFBVCxHQUFvQix1QkFBcEI7QUFDRCxTQUpELE1BSU87QUFDTDtBQUNBLG1CQUFTLFFBQVQsR0FBb0IsSUFBcEI7QUFDRDtBQUNGLE9BZkQ7QUFpQkQ7Ozs7OztrQkFHWSxNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBTdGlja3kgZnJvbSAnLi9zdGlja3knO1xuXG5jb25zdCBsaXN0ZW5lciA9IChyZXF1ZXN0KSA9PiB7XG4gIGNvbnN0IGlzTWVyZ2VSZXF1ZXN0ID0gd2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignbWVyZ2VfcmVxdWVzdHMnKSA+IC0xO1xuICBpZiAocmVxdWVzdC50eXBlID09PSAnaW5pdCcgJiYgaXNNZXJnZVJlcXVlc3QpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlmZnMnKTtcblxuICAgIC8vIHdhaXQgZm9yIHRoZSBkaWZmIGZpbGVzICgjZGlmZnMpIHRvIGxvYWRcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMpID0+IHtcbiAgICAgIG11dGF0aW9ucy5mb3JFYWNoKChtdXRhdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBkaWZmc0ZpbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lcmdlLXJlcXVlc3QtdGFicycpO1xuICAgICAgICBpZiAoZGlmZnNGaWxlcyAmJiAhL3N0aWNreS1pbml0L2cudGVzdChkaWZmc0ZpbGVzLmNsYXNzTmFtZSkpIHtcbiAgICAgICAgICBkaWZmc0ZpbGVzLmNsYXNzTmFtZSArPSAnIHN0aWNreS1pbml0JztcbiAgICAgICAgICBuZXcgU3RpY2t5KCkuaW5pdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbmZpZyA9IHsgYXR0cmlidXRlczogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBjaGFyYWN0ZXJEYXRhOiB0cnVlIH07XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIGNvbmZpZyk7XG4gIH1cbn07XG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihsaXN0ZW5lcik7XG4iLCJjbGFzcyBTdGlja3kge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgbGV0IHByVG9vbGJhckhlaWdodDtcbiAgICBsZXQgZmlsZUNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ibG9iLWRpZmYtcGF0aF0nKTtcbiAgICBsZXQgZmlsZUhlYWRlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbaWRePVwiZmlsZS1wYXRoLVwiXScpO1xuXG4gICAgY29uc3QgZ2V0UHJUb29sYmFySGVpZ2h0ID0gKCkgPT4ge1xuICAgICAgY29uc3QgdG9vbGJhcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZXJnZS1yZXF1ZXN0LXRhYnMnKTtcbiAgICAgIGxldCBoZWlnaHQgPSAwO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvb2xiYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGhlaWdodCA9IE1hdGgubWF4KGhlaWdodCwgdG9vbGJhcnNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhlaWdodCArIDUwO1xuICAgIH07XG5cbiAgICBjb25zdCBzZXRIZWFkZXJUb3AgPSAoZmlsZUhlYWRlciwgdG9wUG9zaXRpb24pID0+IHtcbiAgICAgIGZpbGVIZWFkZXIuc3R5bGUudG9wID0gdG9wUG9zaXRpb24gKyAncHgnO1xuICAgIH07XG5cbiAgICBjb25zdCByZXNldEhlYWRlcnNGcm9tID0gKGZpcnN0SW5kZXgpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSBmaXJzdEluZGV4OyBpIDwgZmlsZUhlYWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2V0SGVhZGVyVG9wKGZpbGVIZWFkZXJzW2ldLCAwKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgcmVzZXRBbGxIZWFkZXJzID0gKCkgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlSGVhZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBmaWxlSGVhZGVyc1tpXS5zdHlsZS50b3AgPSAnMHB4JztcbiAgICAgICAgZmlsZUhlYWRlcnNbaV0uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICBmaWxlSGVhZGVyc1tpXS5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgICAgZmlsZUhlYWRlcnNbaV0uc3R5bGUuekluZGV4ID0gOTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgc2V0RmlsZUNvbnRhaW5lcnNQYWRkaW5nID0gKCkgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlQ29udGFpbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBoZWFkZXJIZWlnaHQgPSBmaWxlSGVhZGVyc1tpXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICAgIGZpbGVDb250YWluZXJzW2ldLnN0eWxlLnBhZGRpbmdUb3AgPSBoZWFkZXJIZWlnaHQgKyAncHgnO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBnZXRDdXJyZW50RmlsZUNvbnRhaW5lckluZGV4ID0gKCkgPT4ge1xuICAgICAgbGV0IG1heEJlZm9yZVplcm8gPSAtMTAwMDAwMDtcbiAgICAgIGxldCBtYXhCZWZvcmVaZXJvSW5kZXggPSAtMTtcblxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGZpbGVDb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUb3AgPSBmaWxlQ29udGFpbmVyc1tpXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICAgIGlmIChjdXJyZW50VG9wID4gbWF4QmVmb3JlWmVybyAmJiBjdXJyZW50VG9wIDwgcHJUb29sYmFySGVpZ2h0KSB7XG4gICAgICAgICAgbWF4QmVmb3JlWmVybyA9IGN1cnJlbnRUb3A7XG4gICAgICAgICAgbWF4QmVmb3JlWmVyb0luZGV4ID0gaTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWF4QmVmb3JlWmVyb0luZGV4O1xuICAgIH07XG5cbiAgICBjb25zdCBtYWtlQ3VycmVudEhlYWRlclN0aWNreSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IG1heEJlZm9yZVplcm9JbmRleCA9IGdldEN1cnJlbnRGaWxlQ29udGFpbmVySW5kZXgoKTtcbiAgICAgIGlmIChtYXhCZWZvcmVaZXJvSW5kZXggPT09IC0xKSB7XG4gICAgICAgIC8vIHJlc2V0IHRoZSBoZWFkZXJzIGlmIHdlIHNjcm9sbCBiYWNrIGJlZm9yZSB0aGUgZmlyc3Qgb25lXG4gICAgICAgIHJlc2V0QWxsSGVhZGVycygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGN1cnJlbnRmaWxlQ29udGVudCA9IGZpbGVDb250YWluZXJzW21heEJlZm9yZVplcm9JbmRleF07XG4gICAgICBjb25zdCBjdXJyZW50RmlsZUhlYWRlciA9IGZpbGVIZWFkZXJzW21heEJlZm9yZVplcm9JbmRleF07XG4gICAgICBjb25zdCBoZWFkZXJIZWlnaHQgPSBjdXJyZW50RmlsZUhlYWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICBjb25zdCBuZXdIZWFkZXJUb3AgPSAoY3VycmVudGZpbGVDb250ZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAqIC0xKSAtMTtcblxuICAgICAgaWYgKG5ld0hlYWRlclRvcCA8IHByVG9vbGJhckhlaWdodCAqIC0xKSB7XG4gICAgICAgIC8vIFdlIHJlYWNoZWQgdGhlIHRvcCBvZiB0aGUgZmlsZSBzY3JvbGxpbmcgdXBcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAobmV3SGVhZGVyVG9wICsgaGVhZGVySGVpZ2h0ICsgcHJUb29sYmFySGVpZ2h0ID4gY3VycmVudGZpbGVDb250ZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCkge1xuICAgICAgICAvLyBXZSByZWFjaGVkIHRoZSBib3R0b20gb2YgdGhlIGZpbGUgc2Nyb2xsaW5nIGRvd25cbiAgICAgICAgc2V0SGVhZGVyVG9wKFxuICAgICAgICAgIGN1cnJlbnRGaWxlSGVhZGVyLFxuICAgICAgICAgIGN1cnJlbnRmaWxlQ29udGVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgLSBoZWFkZXJIZWlnaHQgKyAncHgnXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRIZWFkZXJUb3AoY3VycmVudEZpbGVIZWFkZXIsIG5ld0hlYWRlclRvcCArIHByVG9vbGJhckhlaWdodCk7XG5cbiAgICAgIHJlc2V0SGVhZGVyc0Zyb20obWF4QmVmb3JlWmVyb0luZGV4ICsgMSk7XG4gICAgfTtcblxuICAgICgoKSA9PiB7XG4gICAgICBsZXQgZGlmZkZpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkaWZmLWZpbGUnKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlmZkZpbGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZGlmZkZpbGVbaV0uc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgfVxuXG4gICAgICBwclRvb2xiYXJIZWlnaHQgPSBnZXRQclRvb2xiYXJIZWlnaHQoKTtcbiAgICAgIGlmIChmaWxlQ29udGFpbmVycy5sZW5ndGgpIHtcbiAgICAgICAgcmVzZXRBbGxIZWFkZXJzKCk7XG4gICAgICAgIHNldEZpbGVDb250YWluZXJzUGFkZGluZygpO1xuICAgICAgICBkb2N1bWVudC5vbnNjcm9sbCA9IG1ha2VDdXJyZW50SGVhZGVyU3RpY2t5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmVtb3ZlIG9uc2Nyb2xsIGxpc3RlbmVyIGlmIG5vIGZpbGUgaXMgcHJlc2VudCBpbiB0aGUgY3VycmVudCBwYWdlXG4gICAgICAgIGRvY3VtZW50Lm9uc2Nyb2xsID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KSgpO1xuXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RpY2t5O1xuIl19
