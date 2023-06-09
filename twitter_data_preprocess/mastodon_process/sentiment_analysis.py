import transformers
from transformers import AutoModelForSequenceClassification
from transformers import RobertaForSequenceClassification, RobertaTokenizer

from transformers import TFAutoModelForSequenceClassification
from transformers import AutoTokenizer
import numpy as np
from scipy.special import softmax
import csv
import urllib.request
import couchdb
import json
import nltk
from nltk.corpus import wordnet as wn
import time



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

def get_database(db_name):
    try:
        db = couch[db_name]
        return db
    except couchdb.ResourceNotFound:
        print(f"No database named {db_name}")
        return None


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

def count_sentiments(database):
    food_positive_count = 0
    food_negative_count = 0
    food_neutral_count = 0
    sport_positive_count = 0
    sport_negative_count = 0
    sport_neutral_count = 0
    vehicle_positive_count = 0
    vehicle_negative_count = 0
    vehicle_neutral_count = 0

    counter = 0
    for doc_id in database:

        if counter % 10 == 0:
            with open("log_temp", "w") as f:
                f.write(str(counter))

        if counter%5000 == 0:
            with open(f"{counter}_temp", 'w') as f:
                all_in_one = {}
                all_in_one["Explain"] = ["Positive", "Negative", "Neutral"]
                all_in_one["Food"] = [food_positive_count, food_negative_count, food_neutral_count]
                all_in_one["Sport"] = [sport_positive_count, sport_negative_count, sport_neutral_count]
                all_in_one["Vehicle"] = [vehicle_positive_count, vehicle_negative_count, vehicle_neutral_count]
                all_in_one["Total"] = [counter]
                json.dump(all_in_one, f)

        counter += 1

        doc = database[doc_id]
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
        counter
    )

admin = "group20"
password = "group202023"
url = f'http://{admin}:{password}@172.26.128.48:5984/'
couch = couchdb.Server(url)

database_name = ("mastodon_raw_au_social")
db = get_database(database_name)
start_time = time.time()
if db:
    (
        food_positive, food_negative, food_neutral,
        sport_positive, sport_negative, sport_neutral,
        vehicle_positive, vehicle_negative, vehicle_neutral,
        total_count
    ) = count_sentiments(db)
    
    all_in_one = {}
    all_in_one["Explain"] = ["Positive", "Negative", "Neutral"]
    all_in_one["Food"] = [food_positive, food_negative, food_neutral]
    all_in_one["Sport"] = [sport_positive, sport_negative, sport_neutral]
    all_in_one["Vehicle"] = [vehicle_positive, vehicle_negative, vehicle_neutral]
    all_in_one["Total"] = [total_count]

    with open("sentiment_analysis.json", "w") as f:
        json.dump(all_in_one, f)
    
    print("--- %s seconds ---" % (time.time() - start_time))
    print("Done")