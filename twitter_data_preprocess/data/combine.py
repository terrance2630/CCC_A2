import json

with open("/Users/terrancew/Desktop/UniMelb/2023S1/COMP90024 CCC/Assignment 2/data_process/data/Vehicle/0_vehicle_tweet.json", "r") as f:
    with open("/Users/terrancew/Desktop/UniMelb/2023S1/COMP90024 CCC/Assignment 2/data_process/data/Vehicle/1_vehicle_tweet.json", "r") as f_2:
        with open ("/Users/terrancew/Desktop/UniMelb/2023S1/COMP90024 CCC/Assignment 2/data_process/data/Vehicle/vehicle_tweet.json", "w") as out_f:
            for line in f:
                document = json.loads(line)
                json_string = json.dumps(document)
                out_f.write(json_string+ "\n")
            for line in f_2:
                document = json.loads(line)
                json_string = json.dumps(document)
                out_f.write(json_string+ "\n")
print("Done")