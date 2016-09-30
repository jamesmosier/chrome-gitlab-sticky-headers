(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

var initTab = function initTab(details) {
  chrome.tabs.sendMessage(details.tabId, { type: 'init' });
};

chrome.webNavigation.onCompleted.addListener(initTab);
chrome.webNavigation.onHistoryStateUpdated.addListener(initTab);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYmFja2dyb3VuZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsT0FBTyxPQUFQLENBQWUsV0FBZixDQUEyQixXQUEzQixDQUF1QyxVQUFDLE9BQUQsRUFBYTtBQUNsRCxVQUFRLEdBQVIsQ0FBWSxpQkFBWixFQUErQixRQUFRLGVBQXZDO0FBQ0QsQ0FGRDs7QUFJQSxJQUFNLFVBQVUsU0FBVixPQUFVLENBQUMsT0FBRCxFQUFhO0FBQzNCLFNBQU8sSUFBUCxDQUFZLFdBQVosQ0FDRSxRQUFRLEtBRFYsRUFFRSxFQUFFLE1BQU0sTUFBUixFQUZGO0FBSUQsQ0FMRDs7QUFPQSxPQUFPLGFBQVAsQ0FBcUIsV0FBckIsQ0FBaUMsV0FBakMsQ0FBNkMsT0FBN0M7QUFDQSxPQUFPLGFBQVAsQ0FBcUIscUJBQXJCLENBQTJDLFdBQTNDLENBQXVELE9BQXZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKChkZXRhaWxzKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdwcmV2aW91c1ZlcnNpb24nLCBkZXRhaWxzLnByZXZpb3VzVmVyc2lvbik7XG59KTtcblxuY29uc3QgaW5pdFRhYiA9IChkZXRhaWxzKSA9PiB7XG4gIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKFxuICAgIGRldGFpbHMudGFiSWQsXG4gICAgeyB0eXBlOiAnaW5pdCcgfVxuICApO1xufTtcblxuY2hyb21lLndlYk5hdmlnYXRpb24ub25Db21wbGV0ZWQuYWRkTGlzdGVuZXIoaW5pdFRhYik7XG5jaHJvbWUud2ViTmF2aWdhdGlvbi5vbkhpc3RvcnlTdGF0ZVVwZGF0ZWQuYWRkTGlzdGVuZXIoaW5pdFRhYik7XG4iXX0=
