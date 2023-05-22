import React from 'react'
import Map from 'react-map-gl'

import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import TopicPieChart from '../components/topicPieChart'
import SentimentPieChart from '../components/sentimentPieChart'
import Wordcloud from '../components/wordcloud'

import 'mapbox-gl/dist/mapbox-gl.css'

const accessToken = 'pk.eyJ1IjoiYm93ZW5mYW4tdW5pbWVsYiIsImEiOiJjbGhic2s0NzUwdTd5M2VzMGdmbzI5c3l4In0.EYJYO7ZDEVXj7R-k-y2tSg';
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
            Analysis Text Here
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col>
          <Map
            initialViewState={{
              longitude: 133.8,
              latitude: -25.3,
              zoom: 3
            }}
            style={{ width: 600, height: 400 }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={accessToken}
          />
        </Col>
        <Col>
          <Map
            initialViewState={{
              longitude: 133.8,
              latitude: -25.3,
              zoom: 3
            }}
            style={{ width: 600, height: 400 }}
            mapStyle="mapbox://styles/bowenfan-unimelb/clhx90i8000g301rf89rr8e6v"
            mapboxAccessToken={accessToken}
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
    </Container>
  );
}

export default Home;
