import 'bootstrap/dist/css/bootstrap.min.css';

import Menu from './containers/menu'
import Chart from './containers/chart'
import Mapbox from './containers/mapbox'
import WordCloud from './containers/wordcloud'

function App() {
  return (
    <div className="App">
      <Menu />
      <Chart />
      <Mapbox />
      <WordCloud />
    </div>
  );
}

export default App;
