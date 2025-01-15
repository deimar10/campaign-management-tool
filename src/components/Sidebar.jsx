import React, { useState } from "react";
import '../scss/Sidebar.scss';
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import CampaignIcon from '@mui/icons-material/Campaign';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const handleHome = () => {
    navigate(`/home`);
  }

  const handleCampaigns = () => {
    navigate(`/campaigns`);
  }

  const handleCreateCampaigns = () => {
    navigate(`/create-campaigns`);
  }


  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        <ListItem 
            onClick={handleHome}
            className={location.pathname === "/home" ? "current" : ""}
        >
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home"/>
        </ListItem>
        <ListItem 
            onClick={handleCampaigns}
            className={location.pathname === "/campaigns" ? "current" : ""}
        >
            <ListItemIcon>
                <CampaignIcon />
            </ListItemIcon>
            <ListItemText primary="Campaigns"/>
        </ListItem>
        <ListItem 
            onClick={handleCreateCampaigns}
            className={location.pathname === "/create-campaigns" ? "current" : ""}
        >
            <ListItemIcon>
                <PostAddIcon />
            </ListItemIcon>
            <ListItemText primary="Create Campaigns"/>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
