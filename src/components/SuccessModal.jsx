import React from "react";
import "../scss/components/Modal.scss";
import { Modal, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SuccessModal = ({ open, message, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} className="custom-modal">
      <div className="modal-content">
        <div className="modal-icon-container">
          <CheckCircleIcon className="success-icon" />
        </div>
        <h2>Success!</h2>
        <Typography variant="h6">{message || "Action completed successfully!"}</Typography>
        <button onClick={onClose} className="button-success">
          OK
        </button>
      </div>
    </Modal>
  );
};

export default SuccessModal;