#export SHAPE_RESTORE_SHX=YES
# 用来找Scenario 2的code 

import couchdb
from mpi4py import MPI
import geopandas as gpd
from shapely.geometry import Polygon, Point
import nltk
import pandas as pd
from nltk.corpus import wordnet as wn
import json
import os
import time


# using MPI
comm = MPI.COMM_WORLD
rank = comm.Get_rank()
process_count = comm.Get_size()


# Read the SA4 shape file
gdf_sa4 = gpd.read_file('/home/ubuntu/data_analysis/SA4/SA4_2021_AUST_GDA2020.shp')
gdf_sa4 = gdf_sa4[gdf_sa4['geometry'].notnull()]

# A function to map bbox to SA4 code
def bbox_2_SA4(bbox, gdf_sa4):
    longi_min = bbox[0]
    lati_min = bbox[1]
    longi_max = bbox[2]
    lati_max = bbox[3]
    
    # Calculate the central point of the bbox
    central_lati = (lati_min + lati_max) / 2
    central_longi = (longi_min + longi_max) / 2
    central_point = Point(central_longi, central_lati)

    num_sa4 = len(gdf_sa4) # 108

    for idx_sa4 in range(num_sa4):
        polygon = gdf_sa4.iloc[idx_sa4]['geometry']
        
        if polygon is not None:
            if polygon.contains(central_point):
                return gdf_sa4.iloc[idx_sa4]['SA4_CODE21']
    
    return None
        



# # Specify the source view and database name
# admin = 'group20'
# password = 'group202023'
# couch = couchdb.Server(f'http://{admin}:{password}@172.26.128.48:5984/')
# source_db_name = 'twitter-geo'
# source_db = couch[source_db_name]


# # MPI: split the task to different cores # The interval of database for this core
# size_db = len(source_db)
# interval = size_db // process_count
# begin_read_idx = rank * interval
# end_read_idx = (rank + 1) * interval

# Create the list of sa4 code
sa4_codes = list(gdf_sa4['SA4_CODE21'])


s2_dict = {code: [] for code in sa4_codes}

# # Setup the dicts for each column of the dataframe in Scenario 2
# dict_s2_tweets_vehicle = dict.fromkeys(sa4_codes, 0)
# dict_s2_postive = dict.fromkeys(sa4_codes, 0)
# dict_s2_negative = dict.fromkeys(sa4_codes, 0)
# dict_s2_neutral = dict.fromkeys(sa4_codes, 0)


### data for s1
food = wn.synset('food.n.02')
lst_food = list(set([w for s in food.closure(lambda s:s.hyponyms()) for w in s.lemma_names()]))



counter = 0



file_size = os.path.getsize("/data/twi_data/tweet_with_geo.json")
size_per_rank = file_size // process_count
start_inx = rank * size_per_rank
end_inx = (rank+1) * size_per_rank
food_file = open(f"/data/twi_data/food/{str(rank)}_food_tweet.json", 'w')


start_time = time.time()

with open("/data/twi_data/tweet_with_geo.json", 'r') as file:
    file.seek(start_inx)

    while True:
        line = file.readline()
        
        if line is None:
            break
        
        if file.tell()>=end_inx:
            break
        if(counter%10 == 0):
            with open(f"{str(rank)}-log.txt", 'w') as f:
                f.write(str(counter))
        if(counter%50000==0):
            with open(f"{str(counter)}-{str(rank)}-temp", 'w') as output:
                json.dump(s2_dict,output)

        counter +=1

        try:
            document = json.loads(line)
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON in line: {line}")
            print(f"Error message: {e}")
            continue

        # get the doc id
        doc_id = document['id']
        if doc_id.startswith('_'):
            continue
        
        # Extract the language of the tweet
        language = document['doc']['data']['lang'] #str
        

        if language == 'en':
            # Extract the bbox of the tweet
            bbox = document['doc']['includes']['places'][0]['geo']['bbox'] #list
            # Convert the bbox to the belonging SA4 
            sa4_code = bbox_2_SA4(bbox, gdf_sa4) 
            if sa4_code != None:
                # # Extract the sentiment of the tweet 
                # sentiment = document['doc']['data']['sentiment'] #float    
                # Extract the tokens of the tweet 
                tokens = document['value']['tokens'] #str
                tokens = tokens.lower()
                token_list = tokens.split("|")

                found_flag = False
                # Check for Scenario 2
                for token in token_list:
                # print(token)
                    if token in lst_food:
                        found_flag = True
                        s2_dict[sa4_code].append(token)
                        break
                if found_flag:
                    json_string = json.dumps(document)
                    food_file.write(json_string+ "\n")
                    
                    


    
gathered_s2_dict_list = comm.gather(s2_dict, root = 0)

if rank == 0:
    print(time.time()-start_time)
    total_s2_dict = {code: [] for code in sa4_codes}

    for s2_dict in gathered_s2_dict_list:
        print(s2_dict)
        
        for code in sa4_codes:

            total_s2_dict[code]+=s2_dict[code]


    

    

    # Save the DataFrame to a CSV file
    with open(f'food_token.json', 'w') as out_f:
        json.dump(total_s2_dict, out_f)

    print('done')


                










## how to run:
# activate conda env or make sure env has couchdb and mpi4py
# mpiexec -n 1 python data_analysis.py
# conda list    pip list

