import pandas as pd
import json


# method to extract target information from sudo
df_15 = pd.read_csv('/Users/euniceyao/Documents/GitHub/CCC_A2/sudo_data/population_by_loc/dese_sa4_pop_by_age_15.csv')
df_25 = pd.read_csv('/Users/euniceyao/Documents/GitHub/CCC_A2/sudo_data/population_by_loc/dese_sa4_pop_by_age_25.csv')
df_35 = pd.read_csv('/Users/euniceyao/Documents/GitHub/CCC_A2/sudo_data/population_by_loc/dese_sa4_pop_by_age_35.csv')
df_45 = pd.read_csv('/Users/euniceyao/Documents/GitHub/CCC_A2/sudo_data/population_by_loc/dese_sa4_pop_by_age_45.csv')
df_55 = pd.read_csv('/Users/euniceyao/Documents/GitHub/CCC_A2/sudo_data/population_by_loc/dese_sa4_pop_by_age_55.csv')
df_65 = pd.read_csv('/Users/euniceyao/Documents/GitHub/CCC_A2/sudo_data/population_by_loc/dese_sa4_pop_by_age_65.csv')




dict_15 = {}
dict_25 = {}
dict_35 = {}
dict_45 = {}
dict_55 = {}
dict_65 = {}
dict_total = {}

for index, row in df_15.iterrows():
    sa4_code = int(row['sa4_code_2016'])
    population = float(row[' pop'])
    dict_15[sa4_code] = population

for index, row in df_25.iterrows():
    sa4_code = int(row['sa4_code_2016'])
    population = float(row[' pop'])
    dict_25[sa4_code] = population

for index, row in df_35.iterrows():
    sa4_code = int(row['sa4_code_2016'])
    population = float(row[' pop'])
    dict_35[sa4_code] = population

for index, row in df_45.iterrows():
    sa4_code = int(row['sa4_code_2016'])
    population = float(row[' pop'])
    dict_45[sa4_code] = population

for index, row in df_55.iterrows():
    sa4_code = int(row['sa4_code_2016'])
    population = float(row[' pop'])
    dict_55[sa4_code] = population

for index, row in df_65.iterrows():
    sa4_code = int(row['sa4_code_2016'])
    population = float(row[' pop'])
    dict_65[sa4_code] = population

for sa_code in dict_15:
    pop_15 = dict_15[sa_code]
    pop_25 = dict_25[sa_code]
    pop_35 = dict_35[sa_code]
    pop_45 = dict_45[sa_code]
    pop_55 = dict_55[sa_code]
    pop_65 = dict_65[sa_code]
    total = pop_15 + pop_25 + pop_35 + pop_45 + pop_55 + pop_65
    dict_total[sa_code] = total
    # print(total)


print(dict_total)
# print(dict_15)
# print("____________________15___________________")

# print(df_25)
# print(dict_25)
# print("____________________25___________________")

# print(df_35)
# print(dict_35)
# print("____________________35___________________")

# print(df_45)
# print(dict_45)
# print("____________________45___________________")

# print(df_55)
# print(dict_55)
# print("____________________55___________________")

# print(df_65)
# print(dict_65)
# print("____________________65___________________")



# cleaned_dict = {}

# for index, row in extracted_data.iterrows():
#     sa4_code = int(row[SA4_code])
#     avg_car = float(row['Avg_vehicle'])
#     cleaned_dict[sa4_code] = avg_car
    
# # print(cleaned_dict)

with open('/Users/euniceyao/Documents/GitHub/CCC_A2/sudo_data/population_by_loc/total_pop.json', 'w') as file:
    json.dump(dict_total, file)
