import transformers
from transformers import AutoModelForSequenceClassification
from transformers import AutoTokenizer
from scipy.special import softmax
import csv
import urllib.request
import couchdb
import json
import nltk
from nltk.corpus import wordnet as wn
nltk.download('wordnet')

import warnings
warnings.filterwarnings("ignore", category=UserWarning, module='nltk.corpus.reader.wordnet')



### data for s1
food = wn.synset('food.n.02')
lst_food = list(set([w for s in food.closure(lambda s:s.hyponyms()) for w in s.lemma_names()]))

vehicle = wn.synset('vehicle.n.01')
lst_vehicle = list(set([w for s in vehicle.closure(lambda s:s.hyponyms()) for w in s.lemma_names()]))\
              + ['train', 'railway', 'traffic', 'station', 'jam','congestion', 'road', 'rail']

### data for s2
sport = wn.synset('sport.n.01')
lst_sport = list(set([w for s in sport.closure(lambda s:s.hyponyms()) for w in s.lemma_names()]))\
            +['yoga', 'muscle', 'gym', 'fitness', 'exercise', 'workout', 'weight', 'lifting', 'bodybuilding', 'bodybuilder', 'body', 'weightlifting', 'weightlifter',\
             'dance', 'kayak', 'kayaking', 'canoe', 'canoeing', 'surf', 'surfing', 'swim', 'swimming', 'swimmer', 'swimwear', 'swimsuit', 'swims', 'swimsuit',\
              'dart', 'darts', 'golf', 'golfer', 'golfing', 'tennis', 'fencing', 'fencer', 'fence', 'paddleboarding', 'paddleboard', 'paddle', 'board', 'surfboard',\
                'surfing', 'surf', 'skateboarding', 'skateboard', 'skate', 'skater', 'skating', 'skatepark', 'skateboarder', 'skateboarders', 'skateboards', 'skates',\
                 'hulahooping', 'hulahoop', 'hulahooper', 'hulahoops', 'hulahoopers', 'hulahooping', 'hulahoop', 'hulahooper', 'hulahoops', 'hulahoopers', 'hulahooping'
              ]


# Preprocess text (username and link placeholders)
def preprocess(text):
    new_text = []
    for t in text.split(" "):
        t = '@user' if t.startswith('@') and len(t) > 1 else t
        t = 'http' if t.startswith('http') else t
        new_text.append(t)
    return " ".join(new_text)

task='sentiment'
MODEL = f"cardiffnlp/twitter-roberta-base-{task}"
tokenizer = AutoTokenizer.from_pretrained(MODEL)

# download label mapping
labels=[]
mapping_link = f"https://raw.githubusercontent.com/cardiffnlp/tweeteval/main/datasets/{task}/mapping.txt"
with urllib.request.urlopen(mapping_link) as f:
    html = f.read().decode('utf-8').split("\n")
    csvreader = csv.reader(html, delimiter='\t')
labels = [row[1] for row in csvreader if len(row) > 1]

# PT
model = AutoModelForSequenceClassification.from_pretrained(MODEL)

# Function to classify sentiment
def classify_sentiment(text):
    text = preprocess(text)
    encoded_input = tokenizer.encode_plus(
        text,
        add_special_tokens=True,
        max_length=512, 
        truncation=True,
        padding="max_length",
        return_tensors="pt"
    )
    output = model(**encoded_input)
    scores = output[0][0].detach().numpy()
    scores = softmax(scores)
    sentiment_idx = scores.argmax()
    sentiment = labels[sentiment_idx]
    return sentiment

def count_sentiments(doc):
    food_positive_count = 0
    food_negative_count = 0
    food_neutral_count = 0
    sport_positive_count = 0
    sport_negative_count = 0
    sport_neutral_count = 0
    vehicle_positive_count = 0
    vehicle_negative_count = 0
    vehicle_neutral_count = 0

    if 'content' in doc:
        content = doc['content']
        if any(term in content for term in lst_food):
            sentiment = classify_sentiment(content)
            if sentiment == 'positive':
                food_positive_count += 1
            elif sentiment == 'negative':
                food_negative_count += 1
            else:
                food_neutral_count += 1
        if any(term in content for term in lst_sport):
            sentiment = classify_sentiment(content)
            if sentiment == 'positive':
                sport_positive_count += 1
            elif sentiment == 'negative':
                sport_negative_count += 1
            else:
                sport_neutral_count += 1
        if any(term in content for term in lst_vehicle):
            sentiment = classify_sentiment(content)
            if sentiment == 'positive':
                vehicle_positive_count += 1
            elif sentiment == 'negative':
                vehicle_negative_count += 1
            else:
                vehicle_neutral_count += 1

    return (
        food_positive_count, food_negative_count, food_neutral_count,
        sport_positive_count, sport_negative_count, sport_neutral_count,
        vehicle_positive_count, vehicle_negative_count, vehicle_neutral_count,
    )

def analyse(doc):

    admin = "group20"
    password = "group202023"
    url = f'http://{admin}:{password}@172.26.128.48:5984/'
    couch = couchdb.Server(url)
    database_name = "mastodon-data-analysis"
    try:
        db = couch[database_name]
        
    except couchdb.ResourceNotFound:
        print(f"No database named {database_name}")
        
    analysis_file_id = "d405e024ad4d1169fb990c2c51fe3264"
    if db:
        (
            food_positive, food_negative, food_neutral,
            sport_positive, sport_negative, sport_neutral,
            vehicle_positive, vehicle_negative, vehicle_neutral
        ) = count_sentiments(doc)

    document = db.get(analysis_file_id)

    if '_conflicts' in document:
        # Retrieve conflicting revisions
        conflicting_revisions = document['_conflicts']

        # Create a new revision with resolved changes
        new_revision = db[analysis_file_id]
        new_revision['_rev'] = conflicting_revisions[0]

        # Update the fields with resolved changes
        new_revision['Food'][0] += food_positive
        new_revision['Food'][1] += food_negative
        new_revision['Food'][2] += food_neutral
        new_revision['Sport'][0] += sport_positive
        new_revision['Sport'][1] += sport_negative
        new_revision['Sport'][2] += sport_neutral
        new_revision['Vehicle'][0] += vehicle_positive
        new_revision['Vehicle'][1] += vehicle_negative
        new_revision['Vehicle'][2] += vehicle_neutral
        new_revision["Total"][0] += 1

        # Save the new revision to resolve the conflict
        db[analysis_file_id] = new_revision
    else:
        # Update the fields without conflict resolution
        document['Food'][0] += food_positive
        document['Food'][1] += food_negative
        document['Food'][2] += food_neutral
        document['Sport'][0] += sport_positive
        document['Sport'][1] += sport_negative
        document['Sport'][2] += sport_neutral
        document['Vehicle'][0] += vehicle_positive
        document['Vehicle'][1] += vehicle_negative
        document['Vehicle'][2] += vehicle_neutral
        document["Total"][0] += 1

        # Save the updated document
        db[analysis_file_id] = document


        print("saved")
    

