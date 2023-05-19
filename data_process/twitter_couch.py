import json
import couchdb

admin = "group20"
password = "group202023"
url = f'http://{admin}:{password}@127.0.0.1:5984/'
couch = couchdb.Server(url)

db_name = 'twitter-geo'

if db_name not in couch:
    db = couch.create(db_name)
else:
    db = couch[db_name]

with open('/data/twitter-huge.json') as twitter_file:
    line = twitter_file.readline()
    for line in twitter_file:
        line = line[:-2]
        data = json.loads(line)
        doc_id, doc_rev = db.save(data)
        print(f'Document saved with ID: {doc_id} and revision: {doc_rev}')
