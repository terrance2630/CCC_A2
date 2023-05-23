import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import TopicPieChart from '../components/topicPieChart'
import SentimentPieChart from '../components/sentimentPieChart'

import weightlift from './weightlift.gif'

import 'mapbox-gl/dist/mapbox-gl.css'

function Home() {

  return (
    <div style={{ 
      backgroundImage: `url(${weightlift})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh'
    }}>
    <Container>
      <Row>
        <Col>
          <TopicPieChart topicName={'English'} topicCount={2512076} totalCount={3226683} noCard/>
        </Col>
        <Col>
          <SentimentPieChart
            topicName={'Total'}
            positiveCount={1150394}
            neutralCount={1504318}
            negativeCount={571972}
            noCard
          />
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default Home;
