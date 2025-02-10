import React from "react";
import "../scss/components/Modal.scss";
import { Modal, Typography, Button } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';

const ErrorModal = ({ open, message, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} className="custom-modal">
      <div className="modal-content">
        <div className="modal-icon-container">
          <CancelIcon className="error-icon" />
        </div>
        <h2>Error!</h2>
        <Typography variant="h6">{message || "Action failed!"}</Typography>
        <button onClick={onClose} className="button-error">
          OK
        </button>
      </div>
    </Modal>
  );
};

export default ErrorModal;