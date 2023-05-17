import React from 'react';
import ReactECharts from 'echarts-for-react';

const chartOption = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }
  ]
};

function Chart() {
  return (
    <ReactECharts
      option={chartOption}
    />
  );
}

export default Chart;
