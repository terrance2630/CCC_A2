import pandas as pd
import json


# method to extract target information from sudo
df = pd.read_csv('/Users/euniceyao/Documents/GitHub/CCC_A2/sudo_data/scenario_2/abs_2021census_g34_aust_sa4-3852039406454342963.csv')

print(df.columns)



# assumption: only consider those who have answered the survey
SA4_code = 'sa4_code_2021'
vehicle_0 = ' num_mvs_per_dweling_0_mvs'
vehicle_1 = ' num_mvs_per_dweling_1_mvs'
vehicle_2 = ' num_mvs_per_dweling_2_mvs'
vehicle_3 = ' num_mvs_per_dweling_3_mvs'
vehicle_4_more = ' num_mvs_per_dweling_4mo_mvs'
total_dwelling = ' total_dwelings'

columns_to_extract = [SA4_code, vehicle_0, vehicle_1, vehicle_2, vehicle_3, vehicle_4_more, total_dwelling]
extracted_data = df.loc[:, columns_to_extract]
print(extracted_data)



# average number of vehicles per dwelling: total number of vehicles / total number of dwelling
# total number of vehicle = 0*vehicle_0 + 1*vehicle_1 + 2*vehicle_2 + 3*vehicle_3 + 4 (or more??) * vehicle_4_more
# total number of dwelling = vehicle_0 + vehicle_1 + vehicle_2 + vehicle_3 + vehicle_4+more

def compute_avg_vehicle_per_dwelling(row):
    numerator = row[vehicle_1] + 2 * row[vehicle_2] + 3 * row[vehicle_3] + 4 * row[vehicle_4_more]
    denominator = row[total_dwelling]
    return numerator / denominator


def compute_percentage_of_family_having_more_than_3_vehicle(row):
    numerator = 3 * row[vehicle_3] + 4 * row[vehicle_4_more]
    denominator = row[vehicle_1] + 2 * row[vehicle_2] + 3 * row[vehicle_3] + 4 * row[vehicle_4_more]
    return numerator / denominator

# Apply the function to each row and store the result in a new column
extracted_data['Avg_vehicle'] = extracted_data.apply(compute_avg_vehicle_per_dwelling, axis=1)
# print(extracted_data)




cleaned_dict = {}

for index, row in extracted_data.iterrows():
    sa4_code = int(row[SA4_code])
    avg_car = float(row['Avg_vehicle'])
    cleaned_dict[sa4_code] = avg_car
    
# print(cleaned_dict)

with open('./sudo_data/scenario_2/avg_vehicle.json', 'w') as file:
    json.dump(cleaned_dict, file)
