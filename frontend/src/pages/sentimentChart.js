import axios from "axios";
import React from "react";
import ReactECharts from 'echarts-for-react';

const baseURL = "http://172.26.128.48:5984/twitter-geo/_design/TwitterInfo/_view/sentiment_count?group_level=1";

function SentimentChart() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL, {
      auth: {
        username: 'group20',
        password: 'group202023'
      }
    }).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return <div>Failed to load CouchDB</div>;

  console.log(post)

  const chartOption = {
    xAxis: {
      type: 'category',
      data: [post['rows'][0]['key'], post['rows'][1]['key'], post['rows'][2]['key']]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [
          {
            value: post['rows'][0]['value'],
            itemStyle: {color: 'blue'}
          },
          {
            value: post['rows'][1]['value'],
            itemStyle: {color: 'red'}
          },
          {
            value: post['rows'][2]['value'],
            itemStyle: {color: 'green'}
          }
        ],
        type: 'bar'
      }
    ]
  };

  return (
    <ReactECharts option={chartOption} />
  );
}

export default SentimentChart;