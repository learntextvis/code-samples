

## This won't run as is - it needs a list of file paths,  and other vars set
##  Also, I feel this is a bit slow, in comparison to other methods for tfidf.

## stemmer option is useful for vocab reduction and clustering but isn't readable
## if you want a wordcloud.

from collections import defaultdict
import json

#STEMMER = nltk.stem.snowball.EnglishStemmer().stem
STEMMER = ""
OUTPUT_JSON_PATH = "data/tfidf.json"
FILELIST = # something here that lists paths to files
STOPWORDS = # stopwords file

def clean_stem_tokens(tokens, stemmer_func, stopwords):
    import string
    """ Lowercases, takes out punct and stopwords and short strings """
    if stemmer_func:
        tokens = [stemmer_func(token) for token in tokens]
    return [token.lower() for token in tokens if (token not in string.punctuation)and (token.lower() not in stopwords) and len(token) > 2]

def makeText(filename, stopwords):
    from nltk import Text
    with open(filename) as handle:
        text = handle.read()
    return Text(clean_stem_tokens(nltk.word_tokenize(text), STEMMER, stopwords))

def makeTextCollection(files, stopwords):
    from nltk import TextCollection
    texts= [makeText(filename, stopwords) for filename in files]
    collection = TextCollection(texts)
    return collection, texts


def main():

    coll, texts = makeTextCollection(FILELIST, STOPWORDS)

    # you need the texts array too because that's how you re-access or 
    # re-calculate the tfidf per word.
    # Note: it can't be a PlaintextCorpusReader object. That doesn't allow
    # indexing into it for the required re-lookup. :(

    tfidf_by_doc = defaultdict(list)
    for i, text in enumerate(texts):
        for word in set(text.tokens):   # just use the words in this text
            score = coll.tf_idf(word, text)
            if score:
                tfidf_by_doc[filenames[i]].append({
                    "word": word,
                    "tfidf": score
                })

    json = json.dumps(tfidf_by_doc)
    with open(OUTPUT_JSON_PATH, "w") as handle:
        handle.write(json)

# yada yada

