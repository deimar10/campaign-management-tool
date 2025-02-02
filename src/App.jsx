import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Campaigns from './pages/Campaigns';
import CreateCampaigns from './pages/CreateCampaigns';
import './App.scss'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [campaigns, setCampaigns] = useState();

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}`);;
      const changeStatus = response.data?.map((campaign) => ({
        ...campaign,
        status: campaign.status === 1 ? "active" : "paused",
      }));
      setCampaigns(changeStatus);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCampaignUpdate = () => {
    fetchCampaigns();
  };

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />}
            />
            <Route path="/campaigns" element={<Campaigns
              campaigns={campaigns}
              onCampaignUpdate={handleCampaignUpdate}
            />}
            />
            <Route path="/create-campaigns" element={<CreateCampaigns
              onCampaignUpdate={handleCampaignUpdate}
            />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
