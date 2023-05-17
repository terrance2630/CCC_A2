#export SHAPE_RESTORE_SHX=YES
import couchdb

import geopandas as gpd
from shapely.geometry import Polygon, Point

import pandas as pd

import json
import os




# Read the SA4 shape file
gdf_sa4 = gpd.read_file('./SA4/SA4_2021_AUST_GDA2020.shp')
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
        

# Create the list of sa4 code
sa4_codes = list(gdf_sa4['SA4_CODE21'])


loc_senti_dict = {code: list([0, 0, 0, 0]) for code in sa4_codes}

TOTAL = 0
POSITIVE = 1
NEGATIVE = 2
NEUTRAL = 3
counter = 0

file = open("/data/twi_data/tweet_with_geo.json") 

for line in file:

    if line is None:
        break

    if(counter%10 == 0):
        with open(f"loc-senti-log.txt", 'w') as f:
            f.write(str(counter))

    if(counter%50000==0):
        with open(f"loc-senti-{str(counter)}-temp", 'w') as output:
            json.dump(loc_senti_dict,output)


    counter +=1

    document = json.loads(line)

    # Extract the language of the tweet
    language = document['doc']['data']['lang'] #str
    # Extract the bbox of the tweet
    
    # Convert the bbox to the belonging SA4 
   

    if language == 'en':
        bbox = document['doc']['includes']['places'][0]['geo']['bbox'] #list
        sa4_code = bbox_2_SA4(bbox, gdf_sa4)

        if sa4_code != None:
        # Extract the sentiment of the tweet 
            sentiment = document['doc']['data']['sentiment'] #float    

            loc_senti_dict[sa4_code][TOTAL] += 1
            if sentiment > 0 :
                loc_senti_dict[sa4_code][POSITIVE]+=1
            elif sentiment == 0:
                loc_senti_dict[sa4_code][NEUTRAL] +=1
            else:
                loc_senti_dict[sa4_code][NEGATIVE] +=1
                    #skip current token
    
loc_senti_combined_list = []

for code in sa4_codes:
    data = {
        'sa4_code': code,
        '# of tweets': loc_senti_dict[sa4_code][TOTAL],
        '# of positive tweets': loc_senti_dict[sa4_code][POSITIVE],
        '# of negative tweets': loc_senti_dict[sa4_code][NEGATIVE],
        '# of neutral tweets': loc_senti_dict[sa4_code][NEUTRAL]
    }
    loc_senti_combined_list.append(data)

df_combined = pd.DataFrame(loc_senti_combined_list)

# Save the DataFrame to a CSV file
with open(f'location_with_sentiment_data.csv', 'w') as out_f:
    df_combined.to_csv(out_f, index=False)

print('done')
#gathered_s2_combined_list = comm.gather(s2_combined_list, root=0)

# if rank == 0:
#     combined_dict = {}

#     for data in gathered_s2_combined_list:
#         for row in data:
#             sa4_code = row['sa4_code']
#             traffic_tweets = row['# of tweets about traffic']
#             positive_tweets = row['# of positive tweets']
#             negative_tweets = row['# of negative tweets']
#             neutral_tweets = row['# of neutral tweets']

#             if sa4_code not in combined_dict:
#                 combined_dict[sa4_code] = {
#                     '# of tweets about traffic': traffic_tweets,
#                     '# of positive tweets': positive_tweets,
#                     '# of negative tweets': negative_tweets,
#                     '# of neutral tweets': neutral_tweets
#                 }
#             else:
#                 combined_dict[sa4_code]['# of tweets about traffic'] += traffic_tweets
#                 combined_dict[sa4_code]['# of positive tweets'] += positive_tweets
#                 combined_dict[sa4_code]['# of negative tweets'] += negative_tweets
#                 combined_dict[sa4_code]['# of neutral tweets'] += neutral_tweets


    

#     df_s2_combined = pd.DataFrame(combined_dict)

# # Save the DataFrame to a CSV file
#     with open(f'total-senario2_data.csv', 'w') as out_f:
#         df_s2_combined.to_csv(out_f, index=False)
######


                

        

# print(dict_s2_tweets_vehicle)
# print(dict_s2_postive)
# print(dict_s2_negative)
# print(dict_s2_neutral)




# # percentage of positive tweets for each location
# loc_senti_view_name = 'TwitterInfo/location_sentiment'
# results = source_db.view(loc_senti_view_name, group_level=1, limit = 100)

# posi_percent_loc = []

# for row in results:
#     location = row.key  # Get the location name
#     values = row.value  # Get the dictionary of values

#     positive = values['positive']
#     negative = values['negative']
#     neutral = values['neutral']

#     total_count = positive + negative + neutral

#     if total_count > 0:
#         positive_percentage = (positive / total_count) * 100
#     else:
#         positive_percentage = 0.0

#     info = {
#         'location': location,
#         'positive_percentage': positive_percentage
#     }

#     posi_percent_loc.append(info)


# print(posi_percent_loc)


# 处理地区, 将地址分到SA4

# 处理









## how to run:
# activate conda env or make sure env has couchdb and mpi4py
# mpiexec -n 1 python data_analysis.py
# conda list    pip list


# import json

# with open('/data/twi_data/tweet_with_geo.json') as twitter_file:
#     for line in twitter_file:
#         data = json.loads(line)
#         print(data)
#         break