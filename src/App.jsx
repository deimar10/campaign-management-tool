import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Campaigns from './pages/Campaigns';
import CreateCampaigns from './pages/CreateCampaigns';
import './App.scss'

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home/>}
            />
             <Route path="/campaigns" element={<Campaigns/>}
            />
            <Route path="/create-campaigns" element={<CreateCampaigns/>}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
