import React, { useState } from "react";
import '../scss/Campaigns.scss'
import Sidebar from "../components/Sidebar";
import CampaignFilters from "../components/CampaignFilters";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function Campaigns() {

    const campaigns = [
        { id: 1, title: "Campaign 1", url: "https://example.com", payout: "$10 - $20", status: "active" },
        { id: 2, title: "Campaign 2", url: "https://example.com", payout: "$15 - $25", status: "paused" },
    ];

    const [filteredCampaigns, setFilteredCampaigns] = useState(campaigns);

    const handleFilter = ({ search, status, country }) => {
        let filtered = campaigns;
    
        if (search) {
          filtered = filtered.filter((campaign) =>
            campaign.title.toLowerCase().includes(search.toLowerCase())
          );
        }
        if (status !== "all") {
          filtered = filtered.filter((campaign) => campaign.status === status);
        }
        if (country !== "all") {
          filtered = filtered.filter((campaign) => campaign.country === country);
        }
    
        setFilteredCampaigns(filtered);
    };

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <main style={{ flexGrow: 1, padding: "16px" }}>
                <div>
                    <CampaignFilters onFilter={handleFilter} />
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Landing Page URL</TableCell>
                            <TableCell>Payout</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {filteredCampaigns.map((campaign) => (
                            <TableRow key={campaign.id}>
                            <TableCell>{campaign.title}</TableCell>
                            <TableCell>
                                <a href={campaign.url} target="_blank" rel="noopener noreferrer">
                                    {campaign.url}
                                </a>
                            </TableCell>
                            <TableCell>{campaign.payout}</TableCell>
                            {/* The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in. */}
                            <TableCell>{campaign.status === 'active' ? <CheckCircleIcon className="StatusIcon" id="active" /> : <CancelIcon className="StatusIcon" id="paused" /> }</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
            </main>
        </div>
    )
}

export default Campaigns;