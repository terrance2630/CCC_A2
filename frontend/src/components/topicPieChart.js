import ReactECharts from 'echarts-for-react'

function TopicPieChart(props) {

  const topicChartOption = {
    animation: true,
    title: {
      text: props.topicName + ' Tweet Percentage',
      x: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: '15%',
      data: [props.topicName, 'Others'],
    },
    series: [
      {
        name: 'Tweet Percentage',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { name: props.topicName, value: props.topicCount },
          { name: 'Others', value: 3226683 - props.topicCount }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <ReactECharts option={topicChartOption} />
  );
}

export default TopicPieChart;
