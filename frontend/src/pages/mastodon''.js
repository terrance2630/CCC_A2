import axios from 'axios'
import React from 'react'
import ReactECharts from 'echarts-for-react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const baseURL = 'http://172.26.128.48:5984/mastodon-data-analysis/'
const docID = 'd405e024ad4d1169fb990c2c51fe3264'

function Mastodon() {
  // ********************************* Initialize CouchDB Data ***************************************** //
  // Use React Hooks and axios to read in data from CouchDB
  const [post, setPost] = React.useState(null)
  const fetchData = () => {
    axios
      .get(baseURL + docID, {
        auth: {
          username: 'group20',
          password: 'group202023',
        },
      })
      .then((response) => {
        const data = response.data
        setPost(data)
        // set data for topic sentiment distribution chart
        // updateChartInstance(foodSentimentChartRef, 'Food', data)
        // updateChartInstance(sportSentimentChartRef, 'Sport', data)
        // updateChartInstance(vehicleSentimentChartRef, 'Vehicle', data)
        // set data for total tweets amount distribution chart
        updateChartInstance(totalTweetChartRef, 'Total', data)
      })
      .catch((error) => console.log(error))
  }

  // Use reference to get the echarts instance & enable dynamic update
//   const foodSentimentChartRef = React.useRef(null)
//   const sportSentimentChartRef = React.useRef(null)
//   const vehicleSentimentChartRef = React.useRef(null)
  const totalTweetChartRef = React.useRef(null)

  const sum = (x) => {
    x.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  }
  const updateChartInstance = (chartRef, type, data) => {
    // const chart = chartRef.current.getEchartsInstance()
    const chart = this.totalTweetChartRef.getEchartsInstance()
    const sentimentLegendLabel = [
      data['Explain'][0],
      data['Explain'][1],
      data['Explain'][2],
    ]
    if (type !== 'Total') {
      chart.setOption({
        series: {
          data: sentimentLegendLabel.map((label, index) => ({
            name: label,
            value: data[type][index],
          })),
        },
      })
    } else {
      chart.setOption({
        series: {
          data: [
            { value: sum(data['Food']), name: 'Food' },
            { value: sum(data['Sport']), name: 'Sport' },
            { value: sum(data['Vehicle']), name: 'Vehicle' },
          ],
        },
      })
    }
  }

  // Cosntantly fetch data every 2 seconds & update chart instance
  React.useEffect(() => {
    fetchData()
    const intervalId = setInterval(fetchData, 2000)
    return () => clearInterval(intervalId)
  }, [])

  // Verify that the data has been read in
  if (!post) return <div>Failed to load CouchDB</div>
  console.log(post)

  // ********************************** Define Food Chart ******************************************* //
  // Create the chart options
  const foodSentimentChartOption = {
    animation: true,
    title: {
      text: 'Food Sentiment Distribution',
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
      data: [post['Explain'][0], post['Explain'][1], post['Explain'][2]],
    },
    series: [
      {
        name: 'Food Sentiment Distribution',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        // data: foodSeriesData,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }

  // ********************************** Define Sport Chart ******************************************* //
  const sportSentimentChartOption = {
    animation: true,
    title: {
      text: 'Sport Sentiment Distribution',
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
      data: [post['Explain'][0], post['Explain'][1], post['Explain'][2]],
    },
    series: [
      {
        name: 'Sport entiment Distribution',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        // data: sportSeriesData,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }

  // ********************************** Define Sport Chart ******************************************* //
  const vehicleSentimentChartOption = {
    animation: true,
    title: {
      text: 'Vehicle Sentiment Distribution',
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
      data: [post['Explain'][0], post['Explain'][1], post['Explain'][2]],
    },
    series: [
      {
        name: 'Vehicle entiment Distribution',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        // data: vehicleSeriesData,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }

  // ********************************* Define Total Chart ******************************************* //
  const totalTweetChartOption = {
    animation: true,
    title: {
      text: 'Topic Distribution',
      x: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: '10%',
      data: ['Food', 'Sport', 'Vehicle'],
    },
    series: [
      {
        name: 'Amount of tweets',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        // data: tweetAmountData,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }

  // ********************************* Draw Mastodon Chart ******************************************* //
  function onChartReady(echarts) {
    console.log('echarts is ready', echarts)
  }
  function onChartLegendselectchanged(param, echarts) {
    console.log(param, echarts)
  }

  return (
    <Container>
      <Row>
        <Col>
          <ReactECharts
            ref={(e) => this.totalTweetChartRef = e}
            option={totalTweetChartOption}
            style={{ height: 300 }}
            onChartReady={onChartReady}
            onEvents={{
              legendselectchanged: onChartLegendselectchanged,
            }}
          />
        </Col>
      </Row>
      {/* <Row>
        <Col>
          <ReactECharts
            ref={foodSentimentChartRef}
            option={foodSentimentChartOption}
            style={{ height: 300 }}
            onChartReady={onChartReady}
            onEvents={{
              legendselectchanged: onChartLegendselectchanged,
            }}
          />
        </Col>
        <Col>
          <ReactECharts
            ref={sportSentimentChartRef}
            option={sportSentimentChartOption}
            style={{ height: 300 }}
            onChartReady={onChartReady}
            onEvents={{
              legendselectchanged: onChartLegendselectchanged,
            }}
          />
        </Col>
        <Col>
          <ReactECharts
            ref={vehicleSentimentChartRef}
            option={vehicleSentimentChartOption}
            style={{ height: 300 }}
            onChartReady={onChartReady}
            onEvents={{
              legendselectchanged: onChartLegendselectchanged,
            }}
          />
        </Col>
      </Row> */}
    </Container>
  )
}

export default Mastodon
