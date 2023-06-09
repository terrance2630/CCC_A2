import axios from 'axios'
import React from 'react'
import ReactECharts from 'echarts-for-react'
import Card from 'react-bootstrap/Card'

import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import SentimentPieChart from '../components/sentimentPieChart';

const baseURL = 'http://172.26.128.48:5984/mastodon-data-analysis/'
const docID = 'd405e024ad4d1169fb990c2c51fe3264'

function Mastodon() {
  // ********************************* Initialize CouchDB Data ***************************************** //
  // Use React Hooks and axios to read in data from CouchDB
  const [post, setPost] = React.useState(null)
  React.useEffect(() => {
    axios
      .get(baseURL + docID, {
        auth: {
          username: 'group20',
          password: 'group202023',
        },
      })
      .then((response) => {
        setPost(response.data)
      })
  }, [])
  // Verify that the data has been read in
  if (!post) return <div>Failed to load CouchDB</div>
  console.log(post)
  const legendLabel = [
    post['Explain'][0],
    post['Explain'][1],
    post['Explain'][2],
  ]

  // datas for topic sentiment distribution chart
  const foodSeriesData = legendLabel.map((label, index) => ({
    name: label,
    value: post['Food'][index],
  }))
  const sportSeriesData = legendLabel.map((label, index) => ({
    name: label,
    value: post['Sport'][index],
  }))
  const vehicleSeriesData = legendLabel.map((label, index) => ({
    name: label,
    value: post['Vehicle'][index],
  }))

  // datas for total tweets amount distribution chart
  const sum = (x) =>
    x.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  const tweetAmountData = [
    { value: sum(post['Food']), name: 'Food' },
    { value: sum(post['Sport']), name: 'Sport' },
    { value: sum(post['Vehicle']), name: 'Vehicle' },
  ]

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
        data: foodSeriesData,
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
        data: sportSeriesData,
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
        data: vehicleSeriesData,
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
        name: 'Number of toots',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: tweetAmountData,
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
          <Card border='dark' style={{ margin: 20 }}>
            <ReactECharts
              option={totalTweetChartOption}
              style={{ height: 300 }}
              onChartReady={onChartReady}
              onEvents={{
                legendselectchanged: onChartLegendselectchanged,
              }}
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
        <Alert>Mastodon Data</Alert>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card border='dark' style={{ margin: 20 }}>
            <ReactECharts
              option={foodSentimentChartOption}
              style={{ height: 300 }}
              onChartReady={onChartReady}
              onEvents={{
                legendselectchanged: onChartLegendselectchanged,
              }}
            />
          </Card>
        </Col>
        <Col>
          <Card border='dark' style={{ margin: 20 }}>
            <ReactECharts
              option={sportSentimentChartOption}
              style={{ height: 300 }}
              onChartReady={onChartReady}
              onEvents={{
                legendselectchanged: onChartLegendselectchanged,
              }}
            />
          </Card>
        </Col>
        <Col>
          <Card border='dark' style={{ margin: 20 }}>
            <ReactECharts
              option={vehicleSentimentChartOption}
              style={{ height: 300 }}
              onChartReady={onChartReady}
              onEvents={{
                legendselectchanged: onChartLegendselectchanged,
              }}
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
        <Alert>Twitter Data</Alert>
        </Col>
      </Row>
      <Row>
        <Col>
          <SentimentPieChart
            topicName={'Food'}
            positiveCount={65508}
            neutralCount={40965}
            negativeCount={36492}
          />
        </Col>
        <Col>
          <SentimentPieChart
            topicName={'Sports'}
            positiveCount={37108}
            neutralCount={20811}
            negativeCount={20575}
          />
        </Col>
        <Col>
          <SentimentPieChart
            topicName={'Vehicle'}
            positiveCount={35260}
            neutralCount={23833}
            negativeCount={21392}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Mastodon
