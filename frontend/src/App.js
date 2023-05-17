import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import { Routes, Route } from 'react-router-dom';
import Menu from './containers/menu'
import Chart from './pages/chart'
import Mapbox from './pages/mapbox'
import WordCloud from './pages/wordcloud'
import SentimentChart from './pages/sentimentChart'

function App() {
  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/chart" element={<Chart />} />
        <Route path="/mapbox" element={<Mapbox />} />
        <Route path="/wordcloud" element={<WordCloud />} />
        <Route path="/sentiment" element={<SentimentChart />} />
      </Routes>
    </div>
  );
}

export default App;
