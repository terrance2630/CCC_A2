import React from 'react'

import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import TopicPieChart from '../components/topicPieChart'
import SentimentPieChart from '../components/sentimentPieChart'
import Wordcloud from '../components/wordcloud'

import Mapbox from '../components/mapbox'

import HorizontalBar from '../components/horizontalBar'
import ScatterPlot from '../components/scatterPlot'

import vehicleSentiment from '../jsons/vehicle_top_sentiment.json'
import vehicleCount from '../jsons/vehicle_top_number.json'

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
          <Wordcloud url={wordcloudUrl}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Alert style={{margin: 20}}>
            Average Vehicle Tweets Per Person
          </Alert>
        </Col>
        <Col>
          <Alert style={{margin: 20}}>
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
          <HorizontalBar
            title='Cities with Lowest Positive Attitudes towards Vehicles'
            labelName='Percentage of Positive Tweets'
            json={vehicleSentiment}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <HorizontalBar
            title='Top 10 Cities with Highest Vechicle Count Per Dwelling'
            labelName='Average Tweet Count'
            json={vehicleCount}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <ScatterPlot />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
