# # for upload topic-oriented data to couchdb

import json
import couchdb

admin = "group20"
password = "group202023"
url = f'http://{admin}:{password}@172.26.128.48:5984/'
couch = couchdb.Server(url)

db_name = 'tweets_mentioned_sport'

if db_name not in couch:
    db = couch.create(db_name)
else:
    db = couch[db_name]


# with open('/Users/euniceyao/Documents/GitHub/CCC_A2/twitter_data_token_by_topic/vehicle_tweet.json') as file:
#     for line in file:
#         data_dict = json.loads(line)       
#         doc_id, doc_rev = db.save(data_dict)
        
# print("done")

        
with open('/Users/euniceyao/Documents/GitHub/CCC_A2/twitter_data_token_by_topic/sport_tweet.json') as file:
    count = 0
    for line in file:
        count += 1
        if count > 61858:
            data = json.loads(line)
            doc_id, doc_rev = db.save(data)
            print(count)

print("done")
            