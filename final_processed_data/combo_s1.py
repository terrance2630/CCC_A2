# THIS CODE IS TO COMBINE SUDO AND TWITTER DATA FOR ANALYSIS  -- SCENARIIO 1

import json
import pandas as pd


# Open the SUDO file
with open('/Users/euniceyao/Documents/GitHub/CCC_A2/sudo_data/scenario_1/food_retail.json', 'r') as sudo_file:
    sudo_data = json.load(sudo_file)

# Open SUDO file about population
with open('/Users/euniceyao/Documents/GitHub/CCC_A2/sudo_data/population_by_loc/total_pop.json') as f:
    population = json.load(f)


# Open the Twitter file
twitter_data = pd.read_csv('/Users/euniceyao/Documents/GitHub/CCC_A2/twitter_data_analysis/scenario_1_output.csv')

# print(twitter_data)
# print(twitter_data.columns)
# print(sudo_data)
print(population)


# # FINAL COMBO data structure -- SA4_code:[total_tweet_mentioned_food, posi, nega, neutral, percen_posi, percen_nega, percen_neutral, retail_num, avg_t_pp
# ]
combo_dict = {}

for index, row in twitter_data.iterrows():
    data_list_for_each_location = []

    SA4_code = row['sa4_code']
    total_tweet = row['# of tweets about food']
    posi_tweet = row['# of positive tweets']
    nega_tweet = row['# of negative tweets']
    neutral_tweet = row['# of neutral tweets']

    positive_percentage = posi_tweet / total_tweet
    negative_percentage = nega_tweet / total_tweet
    neutral_percentage = neutral_tweet / total_tweet

    try:
        food_retail_num = int(sudo_data[str(SA4_code)])
        total_population = float(population[str(SA4_code)])
        avg_tweet_pp = total_tweet / total_population
    except:
        food_retail_num = None
        avg_tweet_pp = None


    data_list_for_each_location.append(int(total_tweet))
    data_list_for_each_location.append(int(posi_tweet))
    data_list_for_each_location.append(int(nega_tweet))
    data_list_for_each_location.append(int(neutral_tweet))
    data_list_for_each_location.append(float(positive_percentage))
    data_list_for_each_location.append(float(negative_percentage))
    data_list_for_each_location.append(float(neutral_percentage))
    data_list_for_each_location.append(food_retail_num)
    data_list_for_each_location.append(avg_tweet_pp)

    combo_dict[int(SA4_code)] = data_list_for_each_location

# print(combo_dict)




# # Open a file in write mode
# with open("/Users/euniceyao/Documents/GitHub/CCC_A2/final_processed_data/s1_data.json", "w") as file:
#     # Write the dictionary to the file as JSON
#     json.dump(combo_dict, file)


sa_avg_tweet_pp_dict = {}

for i in combo_dict:
    value_list = combo_dict[i]
    avg_tweet = value_list[8]
    sa_avg_tweet_pp_dict[i] = avg_tweet
    print(avg_tweet)

print(sa_avg_tweet_pp_dict)





# Open a file in write mode
with open("/Users/euniceyao/Documents/GitHub/CCC_A2/final_processed_data/sa_avg_tweet_pp_data.json", "w") as file:
    # Write the dictionary to the file as JSON
    json.dump(sa_avg_tweet_pp_dict, file)




