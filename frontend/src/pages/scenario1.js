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

const wordcloudUrl = 'http://172.26.128.48:5984/wordcloud-food/affb95dbd72b710c43d45382b803c653'

function Home() {

  return (
    <Container>
      <Row>
        <Col>
          <TopicPieChart topicName={'Food'} topicCount={142865}/>
        </Col>
        <Col>
          <SentimentPieChart
            topicName={'Food'}
            positiveCount={65508}
            neutralCount={40965}
            negativeCount={36492}
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
            Average Tweets about Food Per Person
          </Alert>
        </Col>
        <Col>
          <Alert>
            Weekly Median Income
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col>
          <Mapbox propertyType={'food_map1'} max={0.01} valueName={'Tweet Count'}/>
        </Col>
        <Col>
          <Mapbox propertyType={'food_map2'} max={1000} valueName={'Weekly Median Income'}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <EChartsReact option={{
            title: {
              text: 'Top 10 Cities with Highest Sentiment towards Food'
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
              data: ['304', '404', '315', '122', '503', '507', '206', '504', '314', '305']
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
                data: [0.85, 0.73, 0.7, 0.62, 0.61, 0.61, 0.6, 0.59, 0.57, 0.56]
              },
            ]
          }} />
        </Col>
      </Row>
      <Row>
        <Col>
          <EChartsReact option={{
            title: {
              text: 'Top 10 Cities with Highest Average Tweets about Food'
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
              data: ['208', '127', '302', '406', '403', '506', '204', '103', '318', '702']
            },
            series: [
              {
                name: 'Average Tweet Count',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                emphasis: {
                  focus: 'series'
                },
                data: [0.088, 0.081, 0.066, 0.024, 0.024, 0.023, 0.022, 0.014, 0.013, 0.012]
              },
            ]
          }} />
        </Col>
      </Row>
      <Row>
        <Col>
          <EChartsReact option={{
            title: {
              text: 'Top 10 Cities with Highest Weekly Personal Income'
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
              data: ['118', '510', '121', '801', '117', '503', '206', '305', '701', '122']
            },
            series: [
              {
                name: 'Average Tweet Count',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                emphasis: {
                  focus: 'series'
                },
                data: [1296, 1281, 1218, 1204, 1174, 1144, 1137, 1132, 1120, 1109]
              },
            ]
          }} />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
