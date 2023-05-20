import axios from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import React from 'react'
import ReactECharts from 'echarts-for-react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const baseURL = 'http://172.26.128.48:5984/mastodon-data-analysis/'
const docID = 'd405e024ad4d1169fb990c2c51fe3264'

function Mastodon() {
  // ********************************** Define Default Chart Option ***************************************** //
  // Create the chart options
  const DEFAULT_SENTIMENT_CHART_OPTION = {
    // animation: true,
    
    title: {
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
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
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

  const DEAULT_NUM_TWEET_CHART_OPTION = {
    // animation: true,
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

  // ********************************* Initialize CouchDB Data ***************************************** //
  // Use React Hooks and axios to retrieve data from CouchDB
  const [foodSentimentOption, setFoodSentimentOption] = React.useState(
    DEFAULT_SENTIMENT_CHART_OPTION
  )
  const [chartKey, setChartKey] = React.useState(0)
  const [sportSentimentOption, setSportSentimentOption] = React.useState(
    DEFAULT_SENTIMENT_CHART_OPTION
  )
  const [vehicleSentimentOption, setVehicleSentimentOption] = React.useState(
    DEFAULT_SENTIMENT_CHART_OPTION
  )
  const [totalTweetOption, setTotalTweetOption] = React.useState(
    DEAULT_NUM_TWEET_CHART_OPTION
  )

  function fetchData() {
    axios
      .get(baseURL + docID, {
        auth: {
          username: 'group20',
          password: 'group202023',
        },
      })
      .then((response) => {
        const data = response.data
        const newFoodSentimentOption = updateNewChartOption(
          foodSentimentOption,
          data,
          'sentiment_count',
          'Food'
        )
        const newSportSentimentOption = updateNewChartOption(
          sportSentimentOption,
          data,
          'sentiment_count',
          'Sport'
        )
        const newVehicleSentimentOption = updateNewChartOption(
          vehicleSentimentOption,
          data,
          'sentiment_count',
          'Vehicle'
        )
        const newTotalTweetOption = updateNewChartOption(
          totalTweetOption,
          data,
          'topic_count'
        )
        setFoodSentimentOption(newFoodSentimentOption)
        setChartKey(chartKey + 1)
        setSportSentimentOption(newSportSentimentOption)
        setVehicleSentimentOption(newVehicleSentimentOption)
        setTotalTweetOption(newTotalTweetOption)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function updateNewChartOption(chartOpt, data, type, text = '') {
    const newChartOpt = cloneDeep(chartOpt)
    if (type !== 'topic_count') {
      newChartOpt.title.text = text + ' Sentiment Distribution'
      newChartOpt.series[0].name = text + ' Sentiment Distribution'
      let newData = data['Explain'].map((label, index) => ({
        name: label,
        value: data[text][index],
      }))
      // newChartOpt.series[0].data.shift()
      // newChartOpt.series[0].data.push(...newData)
      newChartOpt.series[0].data = newData
    } else {
      const sum = (x) => {
        x.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      }
      let newData = [
        { value: sum(data['Food']), name: 'Food' },
        { value: sum(data['Sport']), name: 'Sport' },
        { value: sum(data['Vehicle']), name: 'Vehicle' },
      ]
      newChartOpt.series[0].data = newData
    }
    return newChartOpt
  }

  React.useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 2000)
    return () => clearInterval(interval)
  }, [])

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
            option={totalTweetOption}
            style={{ height: 300 }}
            onChartReady={onChartReady}
            onEvents={{
              legendselectchanged: onChartLegendselectchanged,
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <ReactECharts
            option={foodSentimentOption}
            style={{ height: 300 }}
            onChartReady={onChartReady}
            onEvents={{
              legendselectchanged: onChartLegendselectchanged,
            }}
          />
        </Col>
        <Col>
          <ReactECharts
            option={sportSentimentOption}
            style={{ height: 300 }}
            onChartReady={onChartReady}
            onEvents={{
              legendselectchanged: onChartLegendselectchanged,
            }}
          />
        </Col>
        <Col>
          <ReactECharts
            option={vehicleSentimentOption}
            style={{ height: 300 }}
            onChartReady={onChartReady}
            onEvents={{
              legendselectchanged: onChartLegendselectchanged,
            }}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Mastodon
