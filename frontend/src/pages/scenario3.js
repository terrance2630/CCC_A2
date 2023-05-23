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

import sportSentiment from '../jsons/sport_senti.json'
import sportCount from '../jsons/sport_tweet_pp.json'
import ScatterPlot from '../components/scatterPlot'

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
          <Wordcloud url={wordcloudUrl}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Alert style={{ margin: 20 }}>
            Average Sport Tweet Per Person
          </Alert>
        </Col>
        <Col>
          <Alert style={{ margin: 20 }}>
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
          <HorizontalBar
            title='Top 10 Cities with Highest Sentiment towards Sport'
            labelName='Percentage of Positive Tweets'
            json={sportSentiment}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <HorizontalBar
            title='Top 10 Cities with Most Tweets about Sport Per Person'
            labelName='Average Tweet Count'
            json={sportCount}
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
