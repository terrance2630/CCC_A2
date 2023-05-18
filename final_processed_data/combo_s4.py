# THIS CODE IS TO COMBINE SUDO AND TWITTER DATA FOR ANALYSIS

import json

# Open the SUDO file
with open('/Users/euniceyao/Documents/GitHub/CCC_A2/sudo_data/scenario_4/income_age.json', 'r') as sudo_file:
    sudo_data = json.load(sudo_file)

print(sudo_data)

# Open the Twitter file
with open('/Users/euniceyao/Documents/GitHub/CCC_A2/twitter_data_analysis/scenario_4_output.json', 'r') as twitter_file:
    twitter_data = json.load(twitter_file)

# print(twitter_data)
# print(sudo_data)

# TWITTER data structure -- SA4_code:[total, posi, nega, neutral, percen_posi, percen_nega, percen_neutral, weekly_income, avg_age]
for SA4_code in twitter_data:
    sentiment_data_list = twitter_data[SA4_code]
    total = sentiment_data_list[0]
    positive = sentiment_data_list[1]
    negative = sentiment_data_list[2]
    neutral = sentiment_data_list[3]

    positive_percentage = positive / total
    negative_percentage = negative / total
    neutral_percentage = neutral / total

    sentiment_data_list.append(positive_percentage)
    sentiment_data_list.append(negative_percentage)
    sentiment_data_list.append(neutral_percentage)

    suda_data_list = sudo_data[SA4_code]
    sentiment_data_list.append(suda_data_list[0])
    sentiment_data_list.append(suda_data_list[1])

print(twitter_data)

# Open a file in write mode
with open("/Users/euniceyao/Documents/GitHub/CCC_A2/final_processed_data/s4_data.json", "w") as file:
    # Write the dictionary to the file as JSON
    json.dump(twitter_data, file)

# SUDO data structure -- SA4_code: [weekly_income, age]