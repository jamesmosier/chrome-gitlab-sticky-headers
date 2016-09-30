(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// Reload client for Chrome Apps & Extensions.
// The reload client has a compatibility with livereload.
// WARNING: only supports reload command.

var LIVERELOAD_HOST = 'localhost:';
var LIVERELOAD_PORT = 35729;
var connection = new WebSocket('ws://' + LIVERELOAD_HOST + LIVERELOAD_PORT + '/livereload');

connection.onerror = function (error) {
  console.log('reload connection got error:', error);
};

connection.onmessage = function (e) {
  if (e.data) {
    var data = JSON.parse(e.data);
    if (data && data.command === 'reload') {
      chrome.runtime.reload();
    }
  }
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbGl2ZXJlbG9hZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7QUFDQTtBQUNBOztBQUVBLElBQU0sa0JBQWtCLFlBQXhCO0FBQ0EsSUFBTSxrQkFBa0IsS0FBeEI7QUFDQSxJQUFNLGFBQWEsSUFBSSxTQUFKLFdBQXNCLGVBQXRCLEdBQXdDLGVBQXhDLGlCQUFuQjs7QUFFQSxXQUFXLE9BQVgsR0FBcUIsVUFBQyxLQUFELEVBQVc7QUFDOUIsVUFBUSxHQUFSLENBQVksOEJBQVosRUFBNEMsS0FBNUM7QUFDRCxDQUZEOztBQUlBLFdBQVcsU0FBWCxHQUF1QixVQUFDLENBQUQsRUFBTztBQUM1QixNQUFJLEVBQUUsSUFBTixFQUFZO0FBQ1YsUUFBTSxPQUFPLEtBQUssS0FBTCxDQUFXLEVBQUUsSUFBYixDQUFiO0FBQ0EsUUFBSSxRQUFRLEtBQUssT0FBTCxLQUFpQixRQUE3QixFQUF1QztBQUNyQyxhQUFPLE9BQVAsQ0FBZSxNQUFmO0FBQ0Q7QUFDRjtBQUNGLENBUEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gUmVsb2FkIGNsaWVudCBmb3IgQ2hyb21lIEFwcHMgJiBFeHRlbnNpb25zLlxuLy8gVGhlIHJlbG9hZCBjbGllbnQgaGFzIGEgY29tcGF0aWJpbGl0eSB3aXRoIGxpdmVyZWxvYWQuXG4vLyBXQVJOSU5HOiBvbmx5IHN1cHBvcnRzIHJlbG9hZCBjb21tYW5kLlxuXG5jb25zdCBMSVZFUkVMT0FEX0hPU1QgPSAnbG9jYWxob3N0Oic7XG5jb25zdCBMSVZFUkVMT0FEX1BPUlQgPSAzNTcyOTtcbmNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgV2ViU29ja2V0KGB3czovLyR7TElWRVJFTE9BRF9IT1NUfSR7TElWRVJFTE9BRF9QT1JUfS9saXZlcmVsb2FkYCk7XG5cbmNvbm5lY3Rpb24ub25lcnJvciA9IChlcnJvcikgPT4ge1xuICBjb25zb2xlLmxvZygncmVsb2FkIGNvbm5lY3Rpb24gZ290IGVycm9yOicsIGVycm9yKTtcbn07XG5cbmNvbm5lY3Rpb24ub25tZXNzYWdlID0gKGUpID0+IHtcbiAgaWYgKGUuZGF0YSkge1xuICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGUuZGF0YSk7XG4gICAgaWYgKGRhdGEgJiYgZGF0YS5jb21tYW5kID09PSAncmVsb2FkJykge1xuICAgICAgY2hyb21lLnJ1bnRpbWUucmVsb2FkKCk7XG4gICAgfVxuICB9XG59O1xuIl19
