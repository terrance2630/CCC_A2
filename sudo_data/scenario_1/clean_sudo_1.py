import pandas as pd
import json


# method to extract target information from sudo
food_retail_df = pd.read_csv('/Users/euniceyao/Documents/GitHub/CCC_A2/sudo_data/scenario_1/abs_aus_jobs_employee_and_income_by_industry_sa4_2018_19-6485434399777725245.csv')
# print(food_retail_df)
# print(food_retail_df.columns)


cleaned_dict = {}

for index, row in food_retail_df.iterrows():
    SA4_code = int(row[' sa4_code'])
    # x1000 since the data is stored in the unit thousands
    food_retail_job_num = int(1000*row['retail_trade_food_retailing_number_of_jobs_000'])
    cleaned_dict[SA4_code] = food_retail_job_num 
    

with open('./sudo_data/scenario_1/food_retail.json', 'w') as file:
    json.dump(cleaned_dict, file)
