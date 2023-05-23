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

import foodIncome from '../jsons/food_income.json'
import foodSentiment from '../jsons/food_posi_senti.json'
import foodTweets from '../jsons/food_tweets_pp.json'

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
          <Wordcloud url={wordcloudUrl}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Alert style={{margin: 20}}>
            Average Tweets about Food Per Person
          </Alert>
        </Col>
        <Col>
          <Alert style={{margin: 20}}>
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
          <HorizontalBar
            title='Top 10 Cities with Highest Sentiment towards Food'
            labelName='Percentage of Positive Tweets'
            json={foodSentiment}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <HorizontalBar
            title='Top 10 Cities with Highest Average Tweets about Food'
            labelName='Average Tweet Count'
            json={foodTweets}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <HorizontalBar
            title='Top 10 Cities with Highest Weekly Personal Income'
            labelName='Weekly Income'
            json={foodIncome}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
