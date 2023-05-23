import EChartsReact from "echarts-for-react"
import Card from 'react-bootstrap/Card'
import data from '../jsons/vehicle_scatter.json'

function ScatterPlot() {
  return (
    <Card border='dark' style={{margin:20}}>
      <EChartsReact option={{
        title: {
          text: 'Percentage of Positve Tweets vs. Number of Vehicles'
        },
        xAxis: {name: 'Vechicle Count'},
        yAxis: {name: 'Percentage of Positve Tweets'},
        series: [
          {
            symbolSize: 10,
            data: Object.keys(data).map((key) => data[key]),
            type: 'scatter',
            markLine: {
              animation: false,
              lineStyle: {
                type: 'solid'
              },
              data: [
                [
                  {
                    coord: [0, 0.7],
                    symbol: 'none'
                  },
                  {
                    coord: [2.5, 0.338],
                    symbol: 'none'
                  }
                ]
              ]
            }
          }
        ]
      }} />
    </Card>
  );
}

export default ScatterPlot;
