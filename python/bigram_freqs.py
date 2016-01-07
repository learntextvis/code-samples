# Lynn: I modified this code to do what I wanted (and cleaned up parm empty lists)
# https://github.com/bdewilde/toolbox/blob/master/bjd_nlp.py
# in practice you do want a bigram stopword list too


from nltk.corpus import stopwords
from nltk.collocations import *


def get_nbest_bigrams(words, measure='likelihood_ratio', min_freq=2, stop_ngs=None, stopwords=None, n_best=10, scores=False) :
    """Gets N best bigrams from a list of words
    @param words: list of word tokens in order
    @param type: list
    @param measure: ngram association measure to use in scoring
    @type measure: string; 'pmi', 'chi_sq', 'likelihood_ratio', 'student_t', 'raw_freq'
    @param min_freq: minimum ngram frequency to keep
    @type min_freq: int; default value of 0, so no frequency filtering
    @param n_best: number of highest-scored ngrams to return
    @param stop_ngs: list of ngrams to remove from consideration
    @type stop_ngs: list
    @param stopwords: stopword list
    @type stopwords: list
    @type n_best: int
    @param scores: return tuples of ngram and scores, or ngrams and freqs
    @type scores: boolean
    """
    stop_ngs = stop_ngs or []
    stopwords = stopwords or set(stopwords.words('english'))
    bcf = nltk.collocations.BigramCollocationFinder.from_words(words)
    bcf.apply_word_filter(lambda w: len(w) < 3 or w in stopwords)
    bcf.apply_ngram_filter(lambda w1, w2: ' '.join([w1,w2]) in stop_ngs)
    bcf.apply_freq_filter(min_freq)
    if measure == 'pmi' : m = nltk.collocations.BigramAssocMeasures.pmi
    elif measure == 'chi_sq' : m = nltk.collocations.BigramAssocMeasures.chi_sq
    elif measure == 'likelihood_ratio' : m = nltk.collocations.BigramAssocMeasures.likelihood_ratio
    elif measure == 'student_t' : m = nltk.collocations.BigramAssocMeasures.student_t
    elif measure == 'raw_freq' : m = nltk.collocations.BigramAssocMeasures.raw_freq
    else : raise NameError('Valid association measure must be provided!')
    if scores is False :
        return [(ng, bcf.ngram_fd[ng]) for ng in bcf.nbest(m, n_best)]
    elif scores is True :
        return bcf.score_ngrams(m)[:n_best]

