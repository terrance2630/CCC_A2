import ReactECharts from 'echarts-for-react'
import Card from 'react-bootstrap/Card'

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
          { name: 'Others', value: (props.totalCount ? props.totalCount : 2512076) - props.topicCount }
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
    return <ReactECharts option={topicChartOption} />;
  }

  return (
    <Card border='dark' style={{margin: 20}}>
      <ReactECharts option={topicChartOption} />
    </Card>
  );
}

export default TopicPieChart;
