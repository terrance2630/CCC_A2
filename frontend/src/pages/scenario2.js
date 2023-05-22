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

import scatter from './scatter.png'

const wordcloudUrl = 'http://172.26.128.48:5984/wordcloud-vehicle/affb95dbd72b710c43d45382b803dd96'

function Home() {

  return (
    <Container>
      <Row>
        <Col>
          <TopicPieChart topicName={'Vehicle'} topicCount={80485}/>
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
            Average Sport Tweet Per Person
          </Alert>
        </Col>
        <Col>
          <Alert>
            Percentage of Positive Sentiment Towards Sport
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col>
          <Mapbox propertyType={'sport_map1'} max={0.01} valueName={'Tweet Count'}/>
        </Col>
        <Col>
          <Mapbox propertyType={'sport_map2'} max={0.6} valueName={'Percentage'}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <EChartsReact option={{
            title: {
              text: 'Cities with Lowest Positive Attitudes towards Vehicles'
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
              data: ['115', '304', '116', '311', '205', '120', '201', '313', '901', '126']
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
                data: [0.2413793103448276, 0.25, 0.29411764705882354, 0.3181818181818182, 0.32299270072992703, 0.3235294117647059, 0.32381889763779526, 0.325, 0.3333333333333333, 0.3333333333333333]
              },
            ]
          }} />
        </Col>
      </Row>
      <Row>
        <Col>
          <EChartsReact option={{
            title: {
              text: 'Top 10 Cities with Highest Vechicle Count Per Dwelling'
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
              data: ['115', '603', '509', '314', '307', '405', '311', '211', '204', '501']
            },
            series: [
              {
                name: 'Average Vehicle Count',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                emphasis: {
                  focus: 'series'
                },
                data: [2.05, 2.03, 1.99, 1.93, 1.91, 1.91, 1.90, 1.90, 1.89, 1.89]
              },
            ]
          }} />
        </Col>
      </Row>
      <Row>
        <Col>
          <img src={scatter} />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
