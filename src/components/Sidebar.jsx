import React from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router';

const Sidebar = () => {

  let navigate = useNavigate();

  const handleHome = () => {
    navigate(`/home`);
  }

  const handleCampaigns = () => {
    navigate(`/campaigns`);
  }

  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        <ListItem onClick={handleHome}>
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
          <ListItemText primary="Home"/>
        </ListItem>
        <ListItem onClick={handleCampaigns}>
          <ListItemText primary="Campaigns"/>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
