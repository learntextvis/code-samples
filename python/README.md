
### Some Python Snippets and Notebooks

There is also an environment.yml file here.  This has jupyter/ipython, nltk, spacy, gensim, and pattern in it.   We probably don't want to require all of this, but for experiments we may need any of them (and more).

You can create your own matching env using

````
>conda env create -f environment.yml
````

Then, to use it, 

````
>source activate textvis
````

See http://conda.pydata.org/docs/using/envs.html and Tim Hopper's post http://stiglerdiet.com/blog/2015/Nov/24/my-python-environment-workflow-with-conda/

