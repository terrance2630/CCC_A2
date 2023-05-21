import json
import couchdb

admin = "group20"
password = "group202023"
url = f'http://{admin}:{password}@172.26.128.48:5984/'
couch = couchdb.Server(url)

db_name = 'sport_map2_positive_sentiment_towards_sport_by_location'

if db_name not in couch:
    db = couch.create(db_name)
else:
    db = couch[db_name]

with open('/Users/euniceyao/Documents/GitHub/CCC_A2/final_processed_data/positive_sentiment_towards_sport_by_loc.json') as file:
    for line in file:
        data_dict = json.loads(line)
        
        doc_id, doc_rev = db.save(data_dict)
        
    # for line in file:
    #     data = json.loads(line)
    #     doc_id, doc_rev = db.save(data)
    #     #print(f'Document saved with ID: {doc_id} and revision: {doc_rev}')
        
print("done")