import React from "react";
import '../scss/components/EditModal.scss';
import axios from 'axios';

function deleteModal({ campaignId, campaignTitle, onCampaignUpdate, onClose }) {

    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/${campaignId}`)
            onCampaignUpdate();
            onClose();
        } catch (error) {
            console.error(error);
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