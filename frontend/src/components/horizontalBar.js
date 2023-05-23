import EChartsReact from "echarts-for-react"
import Card from 'react-bootstrap/Card'

function HorizontalBar(props) {
  return (
    <Card border='dark' style={{ margin: 20 }}>
      <EChartsReact option={{
        title: {
          text: props.title
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: Object.keys(props.json)
        },
        series: [
          {
            name: props.labelName,
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: Object.keys(props.json).map((key) => props.json[key])
          },
        ]
      }} />
    </Card>
  );
}

export default HorizontalBar;
