import json

# twitter huge 的结构：list of tweets
# 每一行是一个json形式的tweet， 除了第一行/可能最后一行;
# 每一行以 逗号+空格 结尾，因为 list 中用逗号区分tweet，我们则需要去掉逗号

# 每个tweet structure:
# id,
# key,
# value(tags, tokens),
# doc -- _id,
# doc -- _rev,
# doc -- data(1.author_id, 2.~, 3.created_at, 4.~, 5.geo, 6.lang, 7.public metrics, 8.text, 9.sentiment)
# doc -- includes
# doc -- matching_rules

# 猜测： 我们 A1 给的twitter data，每个tweet都只给了 “doc” 这个 key 里的内容，所以A2是个梗完成的内容
# 猜测： 我们 A1 的地理位置信息是从 doc[includes]这个里面找的，猜测A2也一样， 虽然A2很多tweet都没[includes]


def extract_tweet(data):
    # geo_info is a dictionary
    try:
        geo_info = data['doc']['includes']
        print(geo_info)
    except:
        print("no includes")


def find_key(key_name, json_obj):
    if isinstance(json_obj, dict):
        if key_name in json_obj:
            return json_obj[key_name]
        else:
            for k in json_obj:
                results = find_key(key_name, json_obj[k])
                if results is not None:
                    return results
    elif isinstance(json_obj, (list, tuple)):
        for item in json_obj:
            results = find_key(key_name, item)
            if results is not None:
                return results
    else:
        return None


tweet_with_geo = []

# get one tweet
with open('./data/twitter-huge.json', encoding='utf-8') as twitter_file:

    total_line_count = 0
    invalid_line_count = 0
    line_no_includes = 0

    while total_line_count < 10000:
        line = twitter_file.readline()

        try:
            tweet_string = line[:-2]
            tweet = json.loads(tweet_string)

            # if find_key("full_name", tweet) is not None:
            #     print(tweet_string)
            #     print(find_key("full_name", tweet))
            #     break
            # else:
            #     print("can't find")

            try:
                geo_info = tweet['doc']['includes']['places'][0]['full_name']
                print(geo_info)
                tweet_with_geo.append(tweet)
            except:
                line_no_includes += 1

        except:
            print("XXXXXXXXXXX INVALID TWEET XXXXXXXXXX")
            print(tweet_string)
            invalid_line_count += 1

        total_line_count += 1

    print("NUM OF INVALID LINE: ", invalid_line_count)
    print("NUM line no includes: ", line_no_includes)


with open("tweet_w_geo.json", "w") as of:
    json.dump(tweet_with_geo, of)
