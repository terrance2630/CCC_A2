import pandas as pd
import json


# method to extract target information from sudo
df = pd.read_csv('/Users/euniceyao/Documents/GitHub/CCC_A2/sudo_data/scenario_4/abs_2021census_g02_aust_sa4-2674477944722387812.csv')

# print(df.columns)

columns_to_extract = [' sa4_code_2021', ' median_tot_prsnl_inc_weekly', ' median_age_persons']
extracted_data = df.loc[:, columns_to_extract]


cleaned_dict = {}

# print(type(extracted_data))

for index, row in extracted_data.iterrows():
    
    SA4_code = int(row[' sa4_code_2021'])
    income = int(row[' median_tot_prsnl_inc_weekly'])
    age = int(row[' median_age_persons'])
    
    cleaned_dict[SA4_code] = [income, age]
    

with open('./sudo_data/scenario_4/income_age.json', 'w') as file:
    json.dump(cleaned_dict, file)
