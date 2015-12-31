(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.nGrams = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var buildNGrams = function(text, unit, options){
  unit = unit || 1;
  options = options || {};
  var nGrams = {};
  if(!text.length) return nGrams;
  if(!options.caseSensitive) text = text.toLowerCase();
  if(options.includePunctuation){
    var sentenceSplitter = new RegExp('[^\.\?!;]+[\.\?!;]', 'g')
  } else {
    var sentenceSplitter = new RegExp('[^.?!;]+', 'g');
  }
  // split text into a list of sentenceList
  var sentenceList = text.match(sentenceSplitter);
  // strip punctuation from the sentenceList and separate by word
  for(var i = 0; i < sentenceList.length; i++){
    if(options.includePunctuation) {
      sentenceList[i] = sentenceList[i].replace(/([\?\.!;])/, ' $1');
    }
    sentenceList[i] = sentenceList[i].replace(/([^\w]*-[^\w])+|[\s,:]+/g, ' ')
                                     .replace(/^\s/, '')
                                     .split(/\s+/g);
  }

  for(var sentence = 0; sentence < sentenceList.length; sentence++){
    for(var word = 0; word < sentenceList[sentence].length - unit + 1; word++){
      var start = '';
      for(var gramLength = 0; gramLength < unit - 1; gramLength++){
        start += sentenceList[sentence][word + gramLength] + ' ';
      }
      // remove trailing space
      start = start.slice(0, start.length - 1);
      var end = sentenceList[sentence][word + unit - 1];
      if(unit === 1){
        var bucket = nGrams;
      } else {
        if( !(start in nGrams) ){
          nGrams[start] = {};
        }
        var bucket = nGrams[start];
      }
      if(end in bucket){
        bucket[end]++;
      } else {
        bucket[end] = 1;
      }
    }
  }
  return nGrams;
}

var listAllNGrams = function(nGrams){
  var nGramList = [];
  for(var i in nGrams){
    if(typeof nGrams[i] === 'number'){
      nGramList = Object.keys(nGrams);
      break;
    }
    for(var j in nGrams[i]){
      nGramList.push(i + ' ' + j);
    }
  }
  return nGramList;
}

var getNGramsByFrequency = function(nGrams, frequency){
  var nGramList = [];
  for(var i in nGrams){
    if(typeof nGrams[i] === 'number'){
      if(nGrams[i] === frequency) nGramList.push(i);
    } else {
      for(var j in nGrams[i]){
        if(nGrams[i][j] === frequency) nGramList.push(i + ' ' + j);
      }
    }
  }
  return nGramList;
}

var getMostCommonNGrams = function(nGrams){
  var nGramList = [];
  var maximumFrequency = 1;
  for(var i in nGrams){
    if(typeof nGrams[i] === 'number'){
      if(nGrams[i] > maximumFrequency){
        nGramList = [i];
        maximumFrequency = nGrams[i];
      } else if(nGrams[i] === maximumFrequency){
        nGramList.push(i);
      }
    } else {
      for(var j in nGrams[i]){
        if(nGrams[i][j] > maximumFrequency){
          nGramList = [i + ' ' + j];
          maximumFrequency = nGrams[i][j];
        } else if(nGrams[i][j] === maximumFrequency){
          nGramList.push(i + ' ' + j);
        }
      }
    }
  }
  return nGramList;
}

var listNGramsByCount = function(nGrams){
  var countList = {};
    for(var i in nGrams){
      if(typeof nGrams[i] === 'number'){
        if(nGrams[i] in countList){
          countList[nGrams[i]].push(i)
        } else {
          countList[nGrams[i]] = [i];
        }
      } else {
        for(var j in nGrams[i]){
          if(nGrams[i][j] in countList){
            countList[nGrams[i][j]].push(i + ' ' + j);
          } else {
            countList[nGrams[i][j]] = [i + ' ' + j];
          }
        }
      }
    }
  return countList;
}

module.exports = {
  buildNGrams: buildNGrams,
  listAllNGrams: listAllNGrams,
  getNGramsByFrequency: getNGramsByFrequency,
  getMostCommonNGrams: getMostCommonNGrams,
  listNGramsByCount: listNGramsByCount,
}

},{}]},{},[1])(1)
});