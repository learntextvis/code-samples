(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.textAnalysis = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var countWords = function(text){
  var words = text.match(/\w+['-']*\w*/g);
  return words ? words.length : 0;
}

var countSentences = function(text){
  var sentences = text.match(/[^.!?]+/g);
  return sentences ? sentences.length : 0;
}

var countParagraphs = function(text){
  var paragraphs = text.match(/[^\n]+\s*/g);
  return paragraphs ? paragraphs.length : 0;
}

var estimateReadingTime = function(text, readingSpeed){
  readingSpeed = readingSpeed || 250;
  var wordCount = countWords(text);
  return Math.ceil(wordCount / readingSpeed);
}

var analyzeText = function(text, options){
  options = options || {};
  var analysis = {};
  analysis.wordCount = countWords(text);
  analysis.sentenceCount = countSentences(text);
  analysis.paragraphCount = countParagraphs(text);
  analysis.readingSpeed = options.readingSpeed || 250;
  analysis.estimatedReadingTime = estimateReadingTime(text, options.readingSpeed);
  analysis.tags = options.tags || [];
  return analysis;
}

var addTags = function(analysis, newTags){
  var tags = {};
  for(var i = 0; i < analysis.tags.length; i++){
    tags[analysis.tags[i]] = true;
  }
  for(var i = 0; i < newTags.length; i++){
    tags[newTags[i]] = true;
  }
  analysis.tags = Object.keys(tags);
  return tags;
}

module.exports = {
  countWords: countWords,
  countSentences: countSentences,
  countParagraphs: countParagraphs,
  estimateReadingTime: estimateReadingTime,
  analyzeText: analyzeText,
  addTags: addTags,
}

},{}]},{},[1])(1)
});