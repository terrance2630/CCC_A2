import React from 'react'
import EChartsReact from 'echarts-for-react'

import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import TopicPieChart from '../components/topicPieChart'
import SentimentPieChart from '../components/sentimentPieChart'
import Wordcloud from '../components/wordcloud'

import Mapbox from '../components/mapbox'

const wordcloudUrl = 'http://172.26.128.48:5984/wordcloud-sport/affb95dbd72b710c43d45382b803d19a'

function Home() {

  return (
    <Container>
      <Row>
        <Col>
          <TopicPieChart topicName={'Sports'} topicCount={78494}/>
        </Col>
        <Col>
          <SentimentPieChart
            topicName={'Sports'}
            positiveCount={37108}
            neutralCount={20811}
            negativeCount={20575}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Alert>
            Analysis Text Here
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col>
          <Wordcloud url={wordcloudUrl}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Alert>
            Average Vehicle Tweets Per Person
          </Alert>
        </Col>
        <Col>
          <Alert>
            Average Vehicle Count Per Dwelling
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col>
          <Mapbox propertyType={'vehicle_map1'} max={0.01} valueName={'Tweet Count Per Person'}/>
        </Col>
        <Col>
          <Mapbox propertyType={'vehicle_map2'} max={2.5} valueName={'Vehicle Count'}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <EChartsReact option={{
            title: {
              text: 'Top 10 Cities with the Most Tweets about Sport Per Person'
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
              data: ['208', '127', '302', '406', '403', '204', '506', '702', '103', '318']
            },
            series: [
              {
                name: 'Number of Tweets',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                emphasis: {
                  focus: 'series'
                },
                data: [0.053, 0.045, 0.035, 0.015, 0.014, 0.012, 0.012, 0.008, 0.007, 0.006]
              },
            ]
          }} />
        </Col>
      </Row>
      <Row>
        <Col>
          <EChartsReact option={{
            title: {
              text: 'Top 10 Cities with Highest Sentiment Towards Sport'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                // Use axis to trigger tooltip
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
              }
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
              data: ['303', '116', '301', '304', '118', '121', '212', '211', '206', '305']
            },
            series: [
              {
                name: 'Percentage of Positive Tweets',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                emphasis: {
                  focus: 'series'
                },
                data: [0.72, 0.72, 0.72, 0.71, 0.65, 0.65, 0.61, 0.61, 0.59, 0.59]
              },
            ]
          }} />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
