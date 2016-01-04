# code-samples repo
draft code to communicate ideas.

Please read the proposal doc for audience and intent: https://docs.google.com/document/d/1X87yd23RobW4r3-DmT0rPeaFS__3PvCITeYPfk24HZs/edit?usp=sharing

Would recommend playing with Lexos if you haven't.

## Notes & ToDo List

**Goal: single doc analysis/vis but also comparative multi-document in as many cases as possible.**

### "Analysis" to offer

* Tokenization: word, sentence
* lemmatize and bigrams
* Parts of Speech
* Tf-idf
* Hclust (hierarchical clustering)
* (PCA? Need an experiment that doesn't suck and is interpretable, the R sample one isn't)
* Word-list based sentiment analysis (https://www.cs.uic.edu/~liub/FBS/sentiment-analysis.html#lexicon)

### Counting Things

* characters (maybe - for punctuation in particular)
* words / lemmas
* sentences
* POS
* bigrams -- needed as part of the tokenization step

**StopWord Handling!**

* We should always display the stop words used in the UI -- because they are a choice and carry consequences.
* Start simple with an inline variable, then file, then tool in browser to update them?

### Vis using the analysis/counts above

* structure of page/doc? -- is this interesting? might be a good newbie view.
    * (does this make sense in multi-document cases?)
    * option to highlight items "inline"
    * Examples:
        * Ben Fry's Darwin thing
        * Art things on my pinterest
        * My example in html_js/book_shape.html - which doesn't work for line preceding spaces yet (e.g., for tabs, indents, poetry, etc)

* count totals, count as percentage of whole
    * bars
    * word clouds and variants
    * tf-idf for multi-document cases
        * see examples like html_js/shiffman_tfidf.html, wordclouds_with_shiffman_tfidf.html

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

* Timeseries
    * show location of word in doc over time (concordance)
    * use windowsize (user-settable) and count, show over time
        * examples are wordclouds per chapter in a book, in order
        * who talks when in a debate / play
        * the Tarantino obscenity chart in 538. We should be able to make that.
    * Vis types over time - bar, line, even word cloud??

* Clustering docs
    * see hclust code - actually, this is pretty bad in python in that it requires a bunch of libs. R's is easier. (See my notebook code in python dir using Pattern.  It's easier to use scikit-learn but harder to explain to newbies. However, outputting the data from Pattern is awkward. Maybe NLTK is the best approach, I think you can save out numpy arrays easily?)
    * R examples: https://eight2late.wordpress.com/2015/07/22/a-gentle-introduction-to-cluster-analysis-using-r/, mine in: R/tm_clustering_example.R
    * tree view for first version? see output from R networkD3 dendrogram in html_js/networkD3_hclust_output_from_R.html
    * Ideally the tree clustering allows collapsible nodes for large trees, and customizable labels on the edges.

## How about a Structure Like This for the Site...

1) Getting Setup:
    Options for R, Python, Pure JS
    (Explain cons of just in-browser JS)
2) Shapes of texts
3) Concordance-views (simple search)
4) Tokenization and Simple Counts, stop words  [We explain fancy tokenization happens in the python/r scripts, simple space sep can be done in js.]
5) Parts of speech
6) Word clouds -- this basically sets us up for doing tf-idf because simple counts are bad for comparative documents, but tf-idf is better
    * includes a variety of word cloud types -- bubble/networks, regular, maybe my ordered count css version
7) Time Series - breaking a text into sections, using multiple texts that have time ordering
8) Clustering (if we get to it, or I can add it later, if you help with the cluster-output-to-tree structure for js)

## Languages for Discussion

**Discuss: Scripts for pre-processing (python/r) and/or in-page analysis with js.**

###JS:
    * RiTa for POS: http://www.ghostweather.com/files/image_replacement/; I haven't experimented with all of it's capabilities yet. Not sure I believe it can be as good as nltk/SpaCy and R's tm/NLP/SnowballC etc.
    * shiffman's tf-idf in js (used in some of my examples)
    * wordcount.js
    * that Natural node/js lib had issues last time I used it, but Shiffman was issueing merge requests against it...
    * I included some dude's textAnalysisSuite in the html_js/js dir, but I don't understand it's tfidf. The bigram thing looks interesting/useful.
    * I don't really think the js tools are as good yet or as complete; and for sizable projects that would be slow in browser, would we give node instructions?  (Argh)

###Python
    * Note that python stuff generally needs downloads. SpaCy and NLTK both do.
    * I can make command-line scripts that prep data as json if we want that... My example script in preprocess_files.py was for another class, and i used it here to get POS for the word cloud experiments
    * Need to well-document and test the install&run instructions for someone newbie
    * Requires command line expertise
    * SpaCy might be a good lib to use, I have used it for word2vec related things but haven't checked carefully the contrast with NLTK/pattern.  It won't do tf-idf for us.

###R
    * Is this simplest actually? scripts that can be run from RStudio or command line?
    * Still require certain packages
    * My R is rusty but Jim's is good I bet

**ToDo: Compare the accuracy and quality of the results in the 3 languagues and multiple libraries in Python/R. There are a lot.  I can do that.**)

###Data Sets ToDo's

* Need to act a play and/or script
* Poetry examples
* Maybe recipes?  some very different genre...

