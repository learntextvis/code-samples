// modified by l. cherny dec 2015
// from https://gist.github.com/lsauer/1221325
// l.sauer 2011, public domain
// returns a hash table with the word as index and frequency as value; good for svg / canvas -plotting or other experiments
// [:punct:] Punctuation symbols . , " ' ? ! ; : # $ % & ( ) * + - / < > = @ [ ] \ ^ _ { } | ~


var wordCount = function(text) {
  var hist = {};
  var words = text.split(/[\s*\.*\,\;\+?\#\|:\-\/\\\[\]\(\)\{\}$%&0-9*]/);

  words.forEach(function(word) {
    if (word.length > 1) {
      hist[word] ? hist[word]+=1 : hist[word]=1;
    }
  });
  return hist;
};
