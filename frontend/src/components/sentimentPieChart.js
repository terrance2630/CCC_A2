import ReactECharts from 'echarts-for-react'
import Card from 'react-bootstrap/Card'

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
      data: ['Positive', 'Negative', 'Neutral'],
    },
    series: [
      {
        name: 'Sentiment Distribution',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { name: 'Positive', value: props.positiveCount },
          { name: 'Negative', value: props.negativeCount },
          { name: 'Neutral', value: props.neutralCount },
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

  if (props.noCard) {
    return <ReactECharts option={sentimentChartOption} />;
  }

  return (
    <Card border='dark' style={{margin: 20}}>
      <ReactECharts option={sentimentChartOption} />
    </Card>
  );
}

export default SentimentPieChart;
