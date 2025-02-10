import React from "react";
import '../scss/components/EditModal.scss';
import axios from 'axios';

function deleteModal({ campaignId, campaignTitle, onCampaignUpdate, onClose, setModalMessage, sucessModal, errorModal }) {

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/${campaignId}`)
            onCampaignUpdate();
            onClose();
            setModalMessage(response.data.message);
            sucessModal(true);
        } catch (error) {
            console.error(error);
            onClose();
            setModalMessage(error.response?.data?.message || "An error occurred.");
            errorModal(true);
        }
    };

    return (
        <div className="modal-content-wrapper">
            <h2>Are you sure you want to delete {campaignTitle}?</h2>
            <div className="modal-button-wrapper">
                <button className="btn-grad" onClick={handleDelete}>Delete</button>
                <button className="button-primary" onClick={() => onClose()}>
                    Close
                </button>
            </div>
        </div>
    )
}

export default deleteModal;