import ReactECharts from 'echarts-for-react'

function SentimentPieChart(props) {

  const sentimentChartOption = {
    animation: true,
    title: {
      text: props.topicName + ' Sentiment Distribution',
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
      data: ['Positive', 'Neutral', 'Negative'],
    },
    series: [
      {
        name: 'Sentiment Distribution',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { name: 'Positive', value: props.positiveCount },
          { name: 'Neutral', value: props.neutralCount },
          { name: 'Negative', value: props.negativeCount }
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
    <ReactECharts option={sentimentChartOption} />
  );
}

export default SentimentPieChart;
