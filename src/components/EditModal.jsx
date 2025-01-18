import React, { useEffect } from "react";
import '../scss/components/EditModal.scss';
import { useForm } from "react-hook-form";

function Edit({campaignId, campaignTitle, campaignStatus, onUpdateStatus}) {

    const {
        register,
        handleSubmit,
        setValue,
    } = useForm();

    const onSubmit = (data) => {
        onUpdateStatus(campaignId, data.status);
    };

    useEffect(() => {
        setValue("status", campaignStatus)
    }, [campaignStatus, setValue]);

    return (
        <div className="modal-content-wrapper">
            <h2>Edit {campaignTitle}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Campaign Status */}
                <label htmlFor="status">Campaign Status</label>
                <select id="status" {...register("status")}>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                </select>
                <div className="modal-button-wrapper">
                    <button className="btn-grad" type="submit">Save Changes</button>
                    <button className="button-primary" onClick={() => onUpdateStatus('', '')}>
                        Close
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Edit;