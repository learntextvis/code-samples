
#Pseudocode-ish notes on how I did the merge of the unigrams and bigrams for a word cloud combining both.  I figured you'd rewrite it anyway, but in case this helps:


from nltk import Text
cleantext = Text(clean)

top_unigrams = cleantext.vocab().most_common()[0:50]

# unigrams look like this

[('cooper', 181),
 ('...', 157),
 ('clinton', 153),
 ('sanders', 140),
 ('people', 127),
 ('senator', 112),
 ("'re", 99),


stop_ngrams = ['clinton', 'well']  # stopwords to exclude from bigrams

# using the function I posted the other day:

bigrams = get_nbest_bigrams(clean, measure="likelihood_ratio", min_freq=2, n_best = 20, stopwords=["'re", "cooper", '...'], stop_ngs=stop_ngrams, scores=False)

# bigrams look like this: 
# [(('secretary', 'clinton'), 58),
#  (('senator', 'sanders'), 55),
#  (('wall', 'street'), 26),
#  (('president', 'obama'), 30),
#  (('climate', 'change'), 23),
#  (('governor', "o'malley"), 33),


 #Then merge them by fixing the counts on the unigrams to subtract the bigram counts.
 #This could be done in man fewer lines of code and without an intermediate dict for "fixed" I'm sure.

from collections import defaultdict
subtract = defaultdict(int)
for bigram in bigrams:
    words = bigram[0]
    score = bigram[1]
    subtract[words[0]] += score
    subtract[words[1]] += score

# subtract is a dict:
# defaultdict(int,
#             {'care': 12,
#              'carlos': 9,
#              'chafee': 16,
#              'change': 23,
#              'class': 12,
#              'climate': 23,

# subtract from each unigram total
fixed = defaultdict(int)
for word in top_unigrams:
    fixed[word[0]] = word[1] - subtract[word[0]]

#make bigrams into strings - used in a lambda map below
[(words[0][0] + ' ' + words[0][1], words[1]) for words in bigrams]

#Combine the fixed unigram items and the bigrams:

merged = fixed.items() + map(lambda x: (x[0][0] + " " + x[0][1], x[1]), bigrams)

# [...
# ('time', 45),
#  ('senator', 32),
#  ('democratic', 22),
#  ('think', 97),
#  ('secretary', 23),
#  ('secretary clinton', 58),
#  ('senator sanders', 55),
#  ('wall street', 26),
#  ('president obama', 30),
#  ('climate change', 23),
#  ("governor o'malley", 33),
#  ('united states', 20),
#  ...]

# Ready for a wordcloud now.
