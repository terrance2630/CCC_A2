import json
import couchdb
from mastodon import Mastodon, StreamListener
import argparse

with open('./userpass.json') as f:
    userpass = json.load(f)

# set up argparse to accept command line arguments
parser = argparse.ArgumentParser(description='Process target server name.')
parser.add_argument('-s', '--server', type=str, help='Name of the target server')
args = parser.parse_args()

if args.server:
    if args.server in userpass['m_url']:
        target_server = args.server
    else:
        raise ValueError(f"Invalid target server name '{args.server}'. Please choose from: {', '.join(userpass['m_url'].keys())}")
else:
    raise ValueError("No target server name provided. Please specify a valid target server using the -server option.")


# authentication
admin = userpass['userpass']['admin']
password = userpass['userpass']['password']
url = f'http://{admin}:{password}@127.0.0.1:5984/'

# get couchdb instance
couch = couchdb.Server(url)

# indicate the db name
db_name = f'mastodon_raw_{target_server}'

# if not exist, create one
if db_name not in couch:
    db = couch.create(db_name)
else:
    db = couch[db_name]

m_url = userpass['m_url'][target_server]
token = userpass['token'][target_server]


m = Mastodon(
    
    api_base_url=m_url,
    access_token=token

)

# listen on the timeline
class Listener(StreamListener):
    # called when receiving new post or status update
    def on_update(self, status):
        # do sth
        json_str = json.dumps(status, indent=2, sort_keys=True, default=str)
        doc_id, doc_rev = db.save(json.loads(json_str))
        print(f'Document saved with ID: {doc_id} and revision: {doc_rev}')


# make it better with try-catch and error-handling
m.stream_public(Listener())
