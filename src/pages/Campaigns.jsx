import React, { useState } from "react";
import '../scss/pages/Campaigns.scss';
import '../scss/components/EditModal.scss';
import Sidebar from "../components/Sidebar";
import CampaignFilters from "../components/CampaignFilters";
import EditModal from '../components/EditModal';
import { Table, TableBody, TableCell, TableHead, TableRow, Tooltip  } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';

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
    const [selectedCampaign, setSelectedCampaign] = useState({
        selectedId: '',
        selectedTitle: '',
        selectedStatus: ''
    });

    const handleFilter = ({ search, status }) => {
        let filtered = campaigns;
    
        if (search) {
          filtered = filtered.filter((campaign) =>
            campaign.title.toLowerCase().includes(search.toLowerCase())
          );
        }
        if (status !== "all") {
          filtered = filtered.filter((campaign) => campaign.status === status);
        }
    
        setFilteredCampaigns(filtered);
    };

    const handleEditModal = (id, title, status) => {
        setSelectedCampaign((prev) => ({
            ...prev,
            selectedId: id,
            selectedTitle: title,
            selectedStatus: status,
        }));
    };

    const updateCampaignStatus = (id, newStatus) => {
        const updatedCampaigns = filteredCampaigns.map((campaign) =>
            campaign.id === id ? { ...campaign, status: newStatus } : campaign
        );
        setFilteredCampaigns(updatedCampaigns);
        setSelectedCampaign({ selectedId: '', selectedTitle: '', selectedStatus: '' });
    };

    return (
        <div className="layout">
            <Sidebar />
            <main className="main-content">
                <div className="campaign-page-container">
                    <CampaignFilters onFilter={handleFilter} />
                    <Table className="campaign-table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Landing Page URL</TableCell>
                            <TableCell>Payout</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {filteredCampaigns.map((campaign) => (
                            <>
                                <TableRow key={campaign.id}>
                                    <TableCell>{campaign.title}</TableCell>
                                    <TableCell>
                                        <a href={campaign.url} target="_blank">
                                            {campaign.url}
                                        </a>
                                    </TableCell>
                                    <TableCell >
                                        {campaign.payouts.map((payout, index) => (
                                            <Tooltip
                                                key={index}
                                                title={`Payout for ${payout.country}: ${payout.amount}`}
                                            >
                                                <div className="payout-detail">
                                                    <strong>{payout.country}</strong>: {payout.amount}
                                                </div>
                                            </Tooltip>
                                        ))}
                                    </TableCell>
                                    <TableCell className="status-cell">
                                        {campaign.status === "active" ? (
                                            <Tooltip title="Active">
                                            <CheckCircleIcon className="status-icon" id="active" />
                                            </Tooltip>
                                        ) : (
                                            <Tooltip title="Paused">
                                            <CancelIcon className="status-icon" id="paused" />
                                            </Tooltip>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="Edit">
                                            <EditNoteIcon className="edit-icon" onClick={() => handleEditModal(campaign.id, campaign.title, campaign.status)} />
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="Delete">
                                            <DeleteIcon className="delete-icon" />
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            </>
                        ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="modal-main-container">
                    {selectedCampaign.selectedId ? (
                        <EditModal 
                            campaignId={selectedCampaign.selectedId} 
                            campaignTitle={selectedCampaign.selectedTitle} 
                            campaignStatus={selectedCampaign.selectedStatus}
                            onUpdateStatus={updateCampaignStatus}
                        />
                    ) : null}
                </div>
            </main>
        </div>
    )
}

export default Campaigns;