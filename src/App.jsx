import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Campaigns from './pages/Campaigns';
import CreateCampaigns from './pages/CreateCampaigns';
import './App.scss'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [campaigns, setCampaigns] = useState();
  
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/campaigns')
      .then(response => {
        const data = response.data;

        const changeStatus = data?.map((campaign) => ({
          ...campaign,
          status: campaign.status === 1 ? "active" : "paused",
      }));
        setCampaigns(changeStatus);
      })
      .catch(error => console.error("Error fetching campaigns:", error));
  },[]);

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home/>}
            />
             <Route path="/campaigns" element={<Campaigns
              campaigns={campaigns}
             />}
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
