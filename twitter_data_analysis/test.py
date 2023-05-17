import nltk
from nltk.corpus import wordnet as wn
nltk.download('wordnet')
food = wn.synset('food.n.02')
a = list(set([w for s in food.closure(lambda s:s.hyponyms()) for w in s.lemma_names()]))
print(a)