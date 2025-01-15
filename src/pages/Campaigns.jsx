import React, { useState } from "react";
import '../scss/pages/Campaigns.scss';
import Sidebar from "../components/Sidebar";
import CampaignFilters from "../components/CampaignFilters";
import { Table, TableBody, TableCell, TableHead, TableRow, Tooltip  } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function Campaigns() {

    const campaigns = [
        { 
            id: 1, 
            title: "Campaign 1", 
            url: "https://example.com", 
            status: "active",
            payouts: [
                { country: "Estonia", amount: "$10" },
                { country: "Spain", amount: "$15" },
                { country: "Bulgaria", amount: "$20" },
              ],
        },
        { 
            id: 2, 
            title: "Campaign 2", 
            url: "https://example.com", 
            status: "paused",
            payouts: [
                { country: "Estonia", amount: "$10" },
            ],
        },
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
        <div className="layout">
            <Sidebar />
            <main className="main-content">
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
                        <>
                            <TableRow key={campaign.id}>
                                <TableCell>{campaign.title}</TableCell>
                                <TableCell>
                                    <a href={campaign.url} target="_blank" rel="noopener noreferrer">
                                        {campaign.url}
                                    </a>
                                </TableCell>
                                <TableCell >
                                    {campaign.payouts.map((payout, index) => (
                                        <div key={index}>
                                            <strong>{payout.country}</strong>: {payout.amount}
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {campaign.status === "active" ? (
                                        <Tooltip title="Active">
                                        <CheckCircleIcon className="StatusIcon" id="active" />
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title="Paused">
                                        <CancelIcon className="StatusIcon" id="paused" />
                                        </Tooltip>
                                    )}
                                </TableCell>
                            </TableRow>
                        </>
                    ))}
                    </TableBody>
                </Table>
            </main>
        </div>
    )
}

export default Campaigns;