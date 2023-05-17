import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Menu from './containers/menu'
import Chart from './containers/chart'
import Mapbox from './containers/mapbox'
import WordCloud from './containers/wordcloud'
import SentimentChart from './containers/sentimentChart'

function App() {
  return (
    <div className="App">
      <Menu />
      <Chart />
      <Mapbox />
      <WordCloud />
      <SentimentChart />
    </div>
  );
}

export default App;
