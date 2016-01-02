# code-samples
draft code to communicate ideas.

## Notes & ToDo List

**Goal: single doc and multi-document in as many cases as possible.**

**Discuss: Scripts for pre-processing (python/r) and/or in-page analysis with js.**

* JS:
    * RiTa for POS: http://www.ghostweather.com/files/image_replacement/
    * shiffman's tf-idf in js
    * wordcount.js
    * I don't really think the js tools are as good yet or as complete; and for sizable projects that would be slow in browser, would we give node instructions?  (Argh)

* Python
    * Note that python stuff generally needs downloads. SpaCy and NLTK both do.
    * I can make command-line scripts that prep data as json if we want that...
    * Need to well-document and test the install&run instructions for someone newbie
    * Requires command line expertise

* R
    * Is this simplest actually? scripts that can be run from RStudio or command line?
    * Still require certain packages
    * My R is rusty but Jim's is good I bet

### "Analysis" to offer

* Tokenization: word, sentence
* lemmatize and bigrams
* Parts of Speech
* Tf-idf
* Hclust
* (PCA? Need an experiment)
* Word-list based sentiment analysis (https://www.cs.uic.edu/~liub/FBS/sentiment-analysis.html#lexicon)

### Counting Things

* characters (maybe - for punctuation in particular)
* words / lemmas
* sentences
* POS
* bigrams

**StopWord handling!**

* We should always display the stop words used in the UI -- because they are a choice and carry consequences.
* Start simple with an inline variable, then file, then tool in browser to update them?

### Vis using the analysis/counts above

* structure of page/doc? -- is this interesting? might be a good newbie view.
    * (does this make sense in multi-document cases?)
    * option to highlight items "inline"
    * Examples:
        * Ben Fry's Darwin thing
        * Art things on my pinterest

* count totals, count as percentage of whole
    * bars
    * word clouds and variants
    * tf-idf for multi-document cases

* Timeseries
    * show location of word in doc over time (concordance)
    * use windowsize (user-settable) and count, show over time
    * allow other vis over time too: word cloud, etc?

* Word Clouds: **Let's investigate ways to make them less sucky/more tolerable.**
    * Get rid of random coloring or words - color only as indicator
    * Idea: little bar charts beside wordclouds to show distribution of counts?
    * Idea: ordered words with counts (mocked up)
    * Extremely useful in small-multiple/multi-doc situations, but design issues.
        * Tf-idf sizing is most interesting in that case. See:
        * Show dynamic side-by-side and merged, with difference. Examples:
        * merged: maybe a network style? also, that NYT bubble thing with circles.
        * need good design for the combination operation for overlapping words when counts differ between the overlaps
    * Single doc cases can become small-multiple if we allow word-clouds of POS, chars, etc.
    * Ideally perform bigram analysis first!
    * stop words are iterative process with word cloud displays

* Clustering docs
    * see hclust code - actually, this is pretty bad in python in that it requires a bunch of libs. R's is easier. (See my notebook: )
    * R examples: https://eight2late.wordpress.com/2015/07/22/a-gentle-introduction-to-cluster-analysis-using-r/, mine in:
    * tree view for first version?
    * network would be "easy" I guess too
    






