import json
import couchdb

admin = "group20"
password = "group202023"
url = f'http://{admin}:{password}@172.26.129.72:5984/'
couch = couchdb.Server(url)

db_name = 'twitter-raw'

if db_name not in couch:
    db = couch.create(db_name)
else:
    db = couch[db_name]


with open('./data/twitter-huge.json') as twitter_file:
    line = twitter_file.readline()
    for line in twitter_file:
        line = line[:-2]
        data = json.loads(line)
        doc_id, doc_rev = db.save(data)
        print(f'Document saved with ID: {doc_id} and revision: {doc_rev}')
    

# highest key: id, key, value, doc
# id: int                                                      eg. 1491565582478561281
# key: list of item                                            eg. [2022, 2, 10, '1005388896094511104', '736626235036426244', '1491571754170421255']
# value: is a dict. key: tags, tokens
#                        tags: ???                             eg. Purrsday
#                        token: String of word seperate by '|' eg. Sorry|for|the|hassle|Kindly|send|email|groupon|groupon|com|and|will|take|this|further
# doc: is a dict.   key: _id, _rev, data, matching_rule
#                        _id:  int                             eg. 1491571754170421255
#                        _rev: string                          eg. 1-db2d80704abf0cfa907036dedab0fc4a
#                        data:  dict   keys: author_id, "context_annotations," conversation_id, created_at, entities, geo, lang, public_metrics, text, sentiment,
#                 
#                        matching_rules: dict   keys: id, tags   [{'id': '1491447910617485312', 'tag': ''}]


    