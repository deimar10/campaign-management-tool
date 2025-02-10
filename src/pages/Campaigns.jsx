import React, { useState, useEffect } from "react";
import '../scss/pages/Campaigns.scss';
import '../scss/components/EditModal.scss';
import Sidebar from "../components/Sidebar";
import CampaignFilters from "../components/CampaignFilters";
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';
import SuccessModal from '../components/SucessModal';
import { Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';

function Campaigns({ campaigns, onCampaignUpdate }) {

    const [filteredCampaigns, setFilteredCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState({
        selectedId: '',
        selectedTitle: '',
        selectedStatus: ''
    });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleFilter = ({ search, status }) => {
        let filtered = [...campaigns];;

        if (search) {
            filtered = filtered.filter((campaign) =>
                campaign.title.toLowerCase().includes(search.trim().toLowerCase())
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
        setIsEditModalOpen(true);
    };

    const handleDeleteModal = (id, title) => {
        setSelectedCampaign((prev) => ({
            ...prev,
            selectedId: id,
            selectedTitle: title,
        }));
        setIsDeleteModalOpen(true);
    };

    const updateCampaignStatus = (id, newStatus) => {
        const updatedCampaigns = filteredCampaigns.map((campaign) =>
            campaign.id === id ? { ...campaign, status: newStatus } : campaign
        );
        onCampaignUpdate();
        setFilteredCampaigns(updatedCampaigns);
        setSelectedCampaign({ selectedId: '', selectedTitle: '', selectedStatus: '' });
        setIsEditModalOpen(false);
    };

    useEffect(() => {
        setFilteredCampaigns(campaigns);
    }, [campaigns]);

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
                            {filteredCampaigns?.map((campaign) => (
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
                                                <DeleteIcon className="delete-icon" onClick={() => handleDeleteModal(campaign.id, campaign.title,)} />
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                </>
                            ))}
                        </TableBody>
                    </Table>
                    <div className={`modal-main-container ${selectedCampaign.selectedId ? '' : 'hidden'}`}>
                        {isEditModalOpen && selectedCampaign.selectedId ? (
                            <EditModal
                                campaignId={selectedCampaign.selectedId}
                                campaignTitle={selectedCampaign.selectedTitle}
                                campaignStatus={selectedCampaign.selectedStatus}
                                onUpdateStatus={updateCampaignStatus}
                                setModalMessage={setModalMessage}
                                sucessModal={setSuccessOpen}
                            />
                        ) : null}
                        {isDeleteModalOpen && selectedCampaign.selectedId ? (
                            <DeleteModal
                                campaignId={selectedCampaign.selectedId}
                                campaignTitle={selectedCampaign.selectedTitle}
                                onCampaignUpdate={onCampaignUpdate}
                                onClose={() => setIsDeleteModalOpen(false)}
                                setModalMessage={setModalMessage}
                                sucessModal={setSuccessOpen}
                            />
                        ) : null}
                    </div>
                </div>
                {/* Success Modal */}
                <SuccessModal open={successOpen} message={modalMessage} onClose={() => setSuccessOpen(false)} />
            </main>
            <div className={isEditModalOpen || isDeleteModalOpen ? 'filter' : ''}></div>
        </div>
    )
}

export default Campaigns;