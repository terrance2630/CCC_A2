import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import { Routes, Route } from 'react-router-dom';
import Menu from './containers/menu'

import Home from './pages/home'
import Scenario1 from './pages/scenario1'
import Scenario2 from './pages/scenario2'
import Scenario3 from './pages/scenario3'
import Mastodon from './pages/mastodon'
import Mapbox from './components/mapbox'

function App() {
  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scenario1" element={<Scenario1 />} />
        <Route path="/scenario2" element={<Scenario2 />} />
        <Route path="/scenario3" element={<Scenario3 />} />
        <Route path="/mastodon" element={<Mastodon />} />
        <Route path="/mapbox" element={<Mapbox />} />
      </Routes>
    </div>
  );
}

export default App;
