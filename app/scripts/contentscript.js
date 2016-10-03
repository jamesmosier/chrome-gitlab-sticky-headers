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

    this.prToolbarHeight = this.getPrToolbarHeight();
    this.fileContainers = document.querySelectorAll('[data-blob-diff-path]');
    this.fileHeaders = document.querySelectorAll('[id^="file-path-"]');
  }

  _createClass(Sticky, [{
    key: 'getPrToolbarHeight',
    value: function getPrToolbarHeight() {
      var toolbars = document.getElementsByClassName('merge-request-tabs');
      var height = 0;

      for (var i = 0; i < toolbars.length; i++) {
        height = Math.max(height, toolbars[0].getBoundingClientRect().height);
      }

      return height + 50;
    }
  }, {
    key: 'setHeaderTop',
    value: function setHeaderTop(fileHeader, topPosition) {
      fileHeader.style.top = topPosition + 'px';
    }
  }, {
    key: 'resetHeadersFrom',
    value: function resetHeadersFrom(firstIndex) {
      for (var i = firstIndex; i < this.fileHeaders.length; i++) {
        this.setHeaderTop(this.fileHeaders[i], 0);
      }
    }
  }, {
    key: 'resetAllHeaders',
    value: function resetAllHeaders() {
      for (var i = 0; i < this.fileHeaders.length; i++) {
        this.fileHeaders[i].style.top = '0px';
        this.fileHeaders[i].style.position = 'absolute';
        this.fileHeaders[i].style.width = '100%';
        this.fileHeaders[i].style.zIndex = 11;
      }
    }
  }, {
    key: 'setFileContainersPadding',
    value: function setFileContainersPadding() {
      for (var i = 0; i < this.fileContainers.length; i++) {
        var headerHeight = this.fileHeaders[i].getBoundingClientRect().height;
        this.fileContainers[i].style.paddingTop = headerHeight + 'px';
      }
    }
  }, {
    key: 'getCurrentFileContainerIndex',
    value: function getCurrentFileContainerIndex() {
      var maxBeforeZero = -1000000;
      var maxBeforeZeroIndex = -1;

      for (var i = 0; i < this.fileContainers.length; i++) {
        var currentTop = this.fileContainers[i].getBoundingClientRect().top;
        if (currentTop > maxBeforeZero && currentTop < this.prToolbarHeight) {
          maxBeforeZero = currentTop;
          maxBeforeZeroIndex = i;
        }
      }

      return maxBeforeZeroIndex;
    }
  }, {
    key: 'makeCurrentHeaderSticky',
    value: function makeCurrentHeaderSticky() {
      var maxBeforeZeroIndex = this.getCurrentFileContainerIndex();
      if (maxBeforeZeroIndex === -1) {
        // reset the headers if we scroll back before the first one
        this.resetAllHeaders();
        return;
      }

      var currentfileContent = this.fileContainers[maxBeforeZeroIndex];
      var currentFileHeader = this.fileHeaders[maxBeforeZeroIndex];
      var headerHeight = currentFileHeader.getBoundingClientRect().height;
      var newHeaderTop = currentfileContent.getBoundingClientRect().top * -1 - 1;

      if (newHeaderTop < this.prToolbarHeight * -1) {
        // We reached the top of the file scrolling up
        return;
      }

      if (newHeaderTop + headerHeight + this.prToolbarHeight > currentfileContent.getBoundingClientRect().height) {
        // We reached the bottom of the file scrolling down
        this.setHeaderTop(currentFileHeader, currentfileContent.getBoundingClientRect().height - headerHeight + 'px');

        return;
      }

      this.setHeaderTop(currentFileHeader, newHeaderTop + this.prToolbarHeight);

      this.resetHeadersFrom(maxBeforeZeroIndex + 1);
    }
  }, {
    key: 'init',
    value: function init() {
      var diffFile = document.getElementsByClassName('diff-file');
      for (var i = 0; i < diffFile.length; i++) {
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
  }]);

  return Sticky;
}();

exports.default = Sticky;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9zdGlja3kuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFNLFdBQVcsU0FBWCxRQUFXLENBQUMsT0FBRCxFQUFhO0FBQzVCLE1BQU0saUJBQWlCLE9BQU8sUUFBUCxDQUFnQixJQUFoQixDQUFxQixPQUFyQixDQUE2QixnQkFBN0IsSUFBaUQsQ0FBQyxDQUF6RTtBQUNBLE1BQUksUUFBUSxJQUFSLEtBQWlCLE1BQWpCLElBQTJCLGNBQS9CLEVBQStDO0FBQzdDLFFBQU0sU0FBUyxTQUFTLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBZjs7QUFFQTtBQUNBLFFBQU0sV0FBVyxJQUFJLGdCQUFKLENBQXFCLFVBQUMsU0FBRCxFQUFlO0FBQ25ELGdCQUFVLE9BQVYsQ0FBa0IsVUFBQyxRQUFELEVBQWM7QUFDOUIsWUFBTSxhQUFhLFNBQVMsYUFBVCxDQUF1QixxQkFBdkIsQ0FBbkI7QUFDQSxZQUFJLGNBQWMsQ0FBQyxlQUFlLElBQWYsQ0FBb0IsV0FBVyxTQUEvQixDQUFuQixFQUE4RDtBQUM1RCxxQkFBVyxTQUFYLElBQXdCLGNBQXhCO0FBQ0EsaUNBQWEsSUFBYjtBQUNEO0FBQ0YsT0FORDtBQU9ELEtBUmdCLENBQWpCOztBQVVBLFFBQU0sU0FBUyxFQUFFLFlBQVksSUFBZCxFQUFvQixXQUFXLElBQS9CLEVBQXFDLGVBQWUsSUFBcEQsRUFBZjtBQUNBLGFBQVMsT0FBVCxDQUFpQixNQUFqQixFQUF5QixNQUF6QjtBQUNEO0FBQ0YsQ0FuQkQ7O0FBcUJBLE9BQU8sT0FBUCxDQUFlLFNBQWYsQ0FBeUIsV0FBekIsQ0FBcUMsUUFBckM7Ozs7Ozs7Ozs7Ozs7SUN2Qk0sTTtBQUNKLG9CQUFjO0FBQUE7O0FBQ1osU0FBSyxlQUFMLEdBQXVCLEtBQUssa0JBQUwsRUFBdkI7QUFDQSxTQUFLLGNBQUwsR0FBc0IsU0FBUyxnQkFBVCxDQUEwQix1QkFBMUIsQ0FBdEI7QUFDQSxTQUFLLFdBQUwsR0FBbUIsU0FBUyxnQkFBVCxDQUEwQixvQkFBMUIsQ0FBbkI7QUFDRDs7Ozt5Q0FFb0I7QUFDbkIsVUFBTSxXQUFXLFNBQVMsc0JBQVQsQ0FBZ0Msb0JBQWhDLENBQWpCO0FBQ0EsVUFBSSxTQUFTLENBQWI7O0FBRUEsV0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFNBQVMsTUFBN0IsRUFBcUMsR0FBckMsRUFBMEM7QUFDeEMsaUJBQVMsS0FBSyxHQUFMLENBQVMsTUFBVCxFQUFpQixTQUFTLENBQVQsRUFBWSxxQkFBWixHQUFvQyxNQUFyRCxDQUFUO0FBQ0Q7O0FBRUQsYUFBTyxTQUFTLEVBQWhCO0FBQ0Q7OztpQ0FFWSxVLEVBQVksVyxFQUFhO0FBQ3BDLGlCQUFXLEtBQVgsQ0FBaUIsR0FBakIsR0FBdUIsY0FBYyxJQUFyQztBQUNEOzs7cUNBRWdCLFUsRUFBWTtBQUMzQixXQUFLLElBQUksSUFBSSxVQUFiLEVBQXlCLElBQUksS0FBSyxXQUFMLENBQWlCLE1BQTlDLEVBQXNELEdBQXRELEVBQTJEO0FBQ3pELGFBQUssWUFBTCxDQUFrQixLQUFLLFdBQUwsQ0FBaUIsQ0FBakIsQ0FBbEIsRUFBdUMsQ0FBdkM7QUFDRDtBQUNGOzs7c0NBRWlCO0FBQ2hCLFdBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsTUFBckMsRUFBNkMsR0FBN0MsRUFBa0Q7QUFDaEQsYUFBSyxXQUFMLENBQWlCLENBQWpCLEVBQW9CLEtBQXBCLENBQTBCLEdBQTFCLEdBQWdDLEtBQWhDO0FBQ0EsYUFBSyxXQUFMLENBQWlCLENBQWpCLEVBQW9CLEtBQXBCLENBQTBCLFFBQTFCLEdBQXFDLFVBQXJDO0FBQ0EsYUFBSyxXQUFMLENBQWlCLENBQWpCLEVBQW9CLEtBQXBCLENBQTBCLEtBQTFCLEdBQWtDLE1BQWxDO0FBQ0EsYUFBSyxXQUFMLENBQWlCLENBQWpCLEVBQW9CLEtBQXBCLENBQTBCLE1BQTFCLEdBQW1DLEVBQW5DO0FBQ0Q7QUFDRjs7OytDQUUwQjtBQUN6QixXQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksS0FBSyxjQUFMLENBQW9CLE1BQXhDLEVBQWdELEdBQWhELEVBQXFEO0FBQ25ELFlBQU0sZUFBZSxLQUFLLFdBQUwsQ0FBaUIsQ0FBakIsRUFBb0IscUJBQXBCLEdBQTRDLE1BQWpFO0FBQ0EsYUFBSyxjQUFMLENBQW9CLENBQXBCLEVBQXVCLEtBQXZCLENBQTZCLFVBQTdCLEdBQTBDLGVBQWUsSUFBekQ7QUFDRDtBQUNGOzs7bURBRThCO0FBQzdCLFVBQUksZ0JBQWdCLENBQUMsT0FBckI7QUFDQSxVQUFJLHFCQUFxQixDQUFDLENBQTFCOztBQUVBLFdBQUksSUFBSSxJQUFJLENBQVosRUFBZSxJQUFJLEtBQUssY0FBTCxDQUFvQixNQUF2QyxFQUErQyxHQUEvQyxFQUFvRDtBQUNsRCxZQUFNLGFBQWEsS0FBSyxjQUFMLENBQW9CLENBQXBCLEVBQXVCLHFCQUF2QixHQUErQyxHQUFsRTtBQUNBLFlBQUksYUFBYSxhQUFiLElBQThCLGFBQWEsS0FBSyxlQUFwRCxFQUFxRTtBQUNuRSwwQkFBZ0IsVUFBaEI7QUFDQSwrQkFBcUIsQ0FBckI7QUFDRDtBQUNGOztBQUVELGFBQU8sa0JBQVA7QUFDRDs7OzhDQUV5QjtBQUN4QixVQUFNLHFCQUFxQixLQUFLLDRCQUFMLEVBQTNCO0FBQ0EsVUFBSSx1QkFBdUIsQ0FBQyxDQUE1QixFQUErQjtBQUM3QjtBQUNBLGFBQUssZUFBTDtBQUNBO0FBQ0Q7O0FBRUQsVUFBTSxxQkFBcUIsS0FBSyxjQUFMLENBQW9CLGtCQUFwQixDQUEzQjtBQUNBLFVBQU0sb0JBQW9CLEtBQUssV0FBTCxDQUFpQixrQkFBakIsQ0FBMUI7QUFDQSxVQUFNLGVBQWUsa0JBQWtCLHFCQUFsQixHQUEwQyxNQUEvRDtBQUNBLFVBQU0sZUFBZ0IsbUJBQW1CLHFCQUFuQixHQUEyQyxHQUEzQyxHQUFpRCxDQUFDLENBQW5ELEdBQXVELENBQTVFOztBQUVBLFVBQUksZUFBZSxLQUFLLGVBQUwsR0FBdUIsQ0FBQyxDQUEzQyxFQUE4QztBQUM1QztBQUNBO0FBQ0Q7O0FBRUQsVUFBSSxlQUFlLFlBQWYsR0FBOEIsS0FBSyxlQUFuQyxHQUFxRCxtQkFBbUIscUJBQW5CLEdBQTJDLE1BQXBHLEVBQTRHO0FBQzFHO0FBQ0EsYUFBSyxZQUFMLENBQ0UsaUJBREYsRUFFRSxtQkFBbUIscUJBQW5CLEdBQTJDLE1BQTNDLEdBQW9ELFlBQXBELEdBQW1FLElBRnJFOztBQUtBO0FBQ0Q7O0FBRUQsV0FBSyxZQUFMLENBQWtCLGlCQUFsQixFQUFxQyxlQUFlLEtBQUssZUFBekQ7O0FBRUEsV0FBSyxnQkFBTCxDQUFzQixxQkFBcUIsQ0FBM0M7QUFDRDs7OzJCQUVNO0FBQ0wsVUFBSSxXQUFXLFNBQVMsc0JBQVQsQ0FBZ0MsV0FBaEMsQ0FBZjtBQUNBLFdBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxTQUFTLE1BQTdCLEVBQXFDLEdBQXJDLEVBQTBDO0FBQ3hDLGlCQUFTLENBQVQsRUFBWSxLQUFaLENBQWtCLFFBQWxCLEdBQTZCLFVBQTdCO0FBQ0Q7O0FBRUQsVUFBSSxLQUFLLGNBQUwsQ0FBb0IsTUFBeEIsRUFBZ0M7QUFDOUIsYUFBSyxlQUFMO0FBQ0EsYUFBSyx3QkFBTDtBQUNBLGlCQUFTLFFBQVQsR0FBb0IsS0FBSyx1QkFBTCxDQUE2QixJQUE3QixDQUFrQyxJQUFsQyxDQUFwQjtBQUNELE9BSkQsTUFJTztBQUNMO0FBQ0EsaUJBQVMsUUFBVCxHQUFvQixJQUFwQjtBQUNEO0FBQ0Y7Ozs7OztrQkFHWSxNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBTdGlja3kgZnJvbSAnLi9zdGlja3knO1xuXG5jb25zdCBsaXN0ZW5lciA9IChyZXF1ZXN0KSA9PiB7XG4gIGNvbnN0IGlzTWVyZ2VSZXF1ZXN0ID0gd2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignbWVyZ2VfcmVxdWVzdHMnKSA+IC0xO1xuICBpZiAocmVxdWVzdC50eXBlID09PSAnaW5pdCcgJiYgaXNNZXJnZVJlcXVlc3QpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlmZnMnKTtcblxuICAgIC8vIHdhaXQgZm9yIHRoZSBkaWZmIGZpbGVzICgjZGlmZnMpIHRvIGxvYWRcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMpID0+IHtcbiAgICAgIG11dGF0aW9ucy5mb3JFYWNoKChtdXRhdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBkaWZmc0ZpbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lcmdlLXJlcXVlc3QtdGFicycpO1xuICAgICAgICBpZiAoZGlmZnNGaWxlcyAmJiAhL3N0aWNreS1pbml0L2cudGVzdChkaWZmc0ZpbGVzLmNsYXNzTmFtZSkpIHtcbiAgICAgICAgICBkaWZmc0ZpbGVzLmNsYXNzTmFtZSArPSAnIHN0aWNreS1pbml0JztcbiAgICAgICAgICBuZXcgU3RpY2t5KCkuaW5pdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbmZpZyA9IHsgYXR0cmlidXRlczogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBjaGFyYWN0ZXJEYXRhOiB0cnVlIH07XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIGNvbmZpZyk7XG4gIH1cbn07XG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihsaXN0ZW5lcik7XG4iLCJjbGFzcyBTdGlja3kge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnByVG9vbGJhckhlaWdodCA9IHRoaXMuZ2V0UHJUb29sYmFySGVpZ2h0KCk7XG4gICAgdGhpcy5maWxlQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWJsb2ItZGlmZi1wYXRoXScpO1xuICAgIHRoaXMuZmlsZUhlYWRlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbaWRePVwiZmlsZS1wYXRoLVwiXScpO1xuICB9XG5cbiAgZ2V0UHJUb29sYmFySGVpZ2h0KCkge1xuICAgIGNvbnN0IHRvb2xiYXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVyZ2UtcmVxdWVzdC10YWJzJyk7XG4gICAgbGV0IGhlaWdodCA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvb2xiYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBoZWlnaHQgPSBNYXRoLm1heChoZWlnaHQsIHRvb2xiYXJzWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhlaWdodCArIDUwO1xuICB9XG5cbiAgc2V0SGVhZGVyVG9wKGZpbGVIZWFkZXIsIHRvcFBvc2l0aW9uKSB7XG4gICAgZmlsZUhlYWRlci5zdHlsZS50b3AgPSB0b3BQb3NpdGlvbiArICdweCc7XG4gIH1cblxuICByZXNldEhlYWRlcnNGcm9tKGZpcnN0SW5kZXgpIHtcbiAgICBmb3IgKGxldCBpID0gZmlyc3RJbmRleDsgaSA8IHRoaXMuZmlsZUhlYWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuc2V0SGVhZGVyVG9wKHRoaXMuZmlsZUhlYWRlcnNbaV0sIDApO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0QWxsSGVhZGVycygpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZmlsZUhlYWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuZmlsZUhlYWRlcnNbaV0uc3R5bGUudG9wID0gJzBweCc7XG4gICAgICB0aGlzLmZpbGVIZWFkZXJzW2ldLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIHRoaXMuZmlsZUhlYWRlcnNbaV0uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICB0aGlzLmZpbGVIZWFkZXJzW2ldLnN0eWxlLnpJbmRleCA9IDExO1xuICAgIH1cbiAgfVxuXG4gIHNldEZpbGVDb250YWluZXJzUGFkZGluZygpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZmlsZUNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGhlYWRlckhlaWdodCA9IHRoaXMuZmlsZUhlYWRlcnNbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgdGhpcy5maWxlQ29udGFpbmVyc1tpXS5zdHlsZS5wYWRkaW5nVG9wID0gaGVhZGVySGVpZ2h0ICsgJ3B4JztcbiAgICB9XG4gIH1cblxuICBnZXRDdXJyZW50RmlsZUNvbnRhaW5lckluZGV4KCkge1xuICAgIGxldCBtYXhCZWZvcmVaZXJvID0gLTEwMDAwMDA7XG4gICAgbGV0IG1heEJlZm9yZVplcm9JbmRleCA9IC0xO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZmlsZUNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRUb3AgPSB0aGlzLmZpbGVDb250YWluZXJzW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgIGlmIChjdXJyZW50VG9wID4gbWF4QmVmb3JlWmVybyAmJiBjdXJyZW50VG9wIDwgdGhpcy5wclRvb2xiYXJIZWlnaHQpIHtcbiAgICAgICAgbWF4QmVmb3JlWmVybyA9IGN1cnJlbnRUb3A7XG4gICAgICAgIG1heEJlZm9yZVplcm9JbmRleCA9IGk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1heEJlZm9yZVplcm9JbmRleDtcbiAgfVxuXG4gIG1ha2VDdXJyZW50SGVhZGVyU3RpY2t5KCkge1xuICAgIGNvbnN0IG1heEJlZm9yZVplcm9JbmRleCA9IHRoaXMuZ2V0Q3VycmVudEZpbGVDb250YWluZXJJbmRleCgpO1xuICAgIGlmIChtYXhCZWZvcmVaZXJvSW5kZXggPT09IC0xKSB7XG4gICAgICAvLyByZXNldCB0aGUgaGVhZGVycyBpZiB3ZSBzY3JvbGwgYmFjayBiZWZvcmUgdGhlIGZpcnN0IG9uZVxuICAgICAgdGhpcy5yZXNldEFsbEhlYWRlcnMoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50ZmlsZUNvbnRlbnQgPSB0aGlzLmZpbGVDb250YWluZXJzW21heEJlZm9yZVplcm9JbmRleF07XG4gICAgY29uc3QgY3VycmVudEZpbGVIZWFkZXIgPSB0aGlzLmZpbGVIZWFkZXJzW21heEJlZm9yZVplcm9JbmRleF07XG4gICAgY29uc3QgaGVhZGVySGVpZ2h0ID0gY3VycmVudEZpbGVIZWFkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgIGNvbnN0IG5ld0hlYWRlclRvcCA9IChjdXJyZW50ZmlsZUNvbnRlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICogLTEpIC0xO1xuXG4gICAgaWYgKG5ld0hlYWRlclRvcCA8IHRoaXMucHJUb29sYmFySGVpZ2h0ICogLTEpIHtcbiAgICAgIC8vIFdlIHJlYWNoZWQgdGhlIHRvcCBvZiB0aGUgZmlsZSBzY3JvbGxpbmcgdXBcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobmV3SGVhZGVyVG9wICsgaGVhZGVySGVpZ2h0ICsgdGhpcy5wclRvb2xiYXJIZWlnaHQgPiBjdXJyZW50ZmlsZUNvbnRlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0KSB7XG4gICAgICAvLyBXZSByZWFjaGVkIHRoZSBib3R0b20gb2YgdGhlIGZpbGUgc2Nyb2xsaW5nIGRvd25cbiAgICAgIHRoaXMuc2V0SGVhZGVyVG9wKFxuICAgICAgICBjdXJyZW50RmlsZUhlYWRlcixcbiAgICAgICAgY3VycmVudGZpbGVDb250ZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCAtIGhlYWRlckhlaWdodCArICdweCdcbiAgICAgICk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNldEhlYWRlclRvcChjdXJyZW50RmlsZUhlYWRlciwgbmV3SGVhZGVyVG9wICsgdGhpcy5wclRvb2xiYXJIZWlnaHQpO1xuXG4gICAgdGhpcy5yZXNldEhlYWRlcnNGcm9tKG1heEJlZm9yZVplcm9JbmRleCArIDEpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBsZXQgZGlmZkZpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkaWZmLWZpbGUnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpZmZGaWxlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkaWZmRmlsZVtpXS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZmlsZUNvbnRhaW5lcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnJlc2V0QWxsSGVhZGVycygpO1xuICAgICAgdGhpcy5zZXRGaWxlQ29udGFpbmVyc1BhZGRpbmcoKTtcbiAgICAgIGRvY3VtZW50Lm9uc2Nyb2xsID0gdGhpcy5tYWtlQ3VycmVudEhlYWRlclN0aWNreS5iaW5kKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZW1vdmUgb25zY3JvbGwgbGlzdGVuZXIgaWYgbm8gZmlsZSBpcyBwcmVzZW50IGluIHRoZSBjdXJyZW50IHBhZ2VcbiAgICAgIGRvY3VtZW50Lm9uc2Nyb2xsID0gbnVsbDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RpY2t5O1xuIl19
