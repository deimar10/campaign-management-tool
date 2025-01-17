import React, { useState } from "react";
import '../scss/pages/CreateCampaigns.scss';
import { useForm } from "react-hook-form";
import Sidebar from "../components/Sidebar";
import AddCircleIcon from '@mui/icons-material/AddCircle';

function CreateCampaigns() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [payouts, setPayouts] = useState([]);

    const selectedCountry = watch("country");

    const addPayout = () => {
        const payout = watch("payout");
        if (selectedCountry && payout) {
            setPayouts([...payouts, { country: selectedCountry, payout }]);
        } else {
            alert("Please select a country and enter a valid payout.");
        }
    };

    const onSubmit = (data) => {
        data.payout = payouts;
        console.log(data);
        alert("Campaign Created Successfully!");
    };

    return (
        <div className="layout">
            <Sidebar />
            <main className="main-content">
                <div className="create-campaign-container">
                    <div className="create-campaign-card">
                        <h1>Create your own campaign here!</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                {/* Campaign Title */}
                                <label htmlFor="title">Campaign Title</label>
                                <input
                                    id="title"
                                    placeholder="Enter campaign title"
                                    {...register("title", {
                                        required: "Title is required",
                                        maxLength: {
                                            value: 20,
                                            message: "Title cannot exceed 20 characters",
                                        },
                                    })}
                                />
                                {errors.title && <p className="error-message">{errors.title.message}</p>}

                                {/* Landing Page URL */}
                                <label htmlFor="url">Landing Page URL</label>
                                <input
                                    id="url"
                                    placeholder="Enter landing page URL"
                                    {...register("url", {
                                        required: "URL is required",
                                        pattern: {
                                            value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/,
                                            message: "Please enter a valid URL",
                                        },
                                    })}
                                />
                                {errors.url && <p className="error-message">{errors.url.message}</p>}

                                {/* Country Dropdown */}
                                <label htmlFor="country">Select a Country for Payout</label>
                                <select
                                    id="country"
                                    {...register("country", {
                                        required: "Please select at least one country for payout",
                                    })}
                                >
                                    <option value="">-- Select a Country --</option>
                                    <option value="estonia">Estonia</option>
                                    <option value="bulgaria">Bulgaria</option>
                                    <option value="spain">Spain</option>
                                </select>
                                {errors.country && <p className="error-message">{errors.country.message}</p>}

                                {/* Payout Input */}
                                {selectedCountry && (
                                    <div className="payouts">
                                        <label htmlFor="payout">Payout for {selectedCountry.toUpperCase()}</label>
                                        <input
                                            id="payout"
                                            type="number"
                                            placeholder="Enter payout amount"
                                            {...register("payout", {
                                                required: "Payout is required",
                                                min: { value: 0, message: "Payout must be at least 0" },
                                                max: { value: 99, message: "Payout cannot exceed 99" },
                                            })}
                                        />
                                        {errors.payout && <p className="error-message">{errors.payout.message}</p>}
                                        <button type="button" className="button-secondary addPayout" onClick={addPayout}>
                                            <AddCircleIcon />
                                            Add Payout
                                        </button>
                                    </div>
                                )}

                                {/* Campaign Status */}
                                <label htmlFor="status">Campaign Status</label>
                                <select id="status" {...register("status")}>
                                    <option value="active">Active</option>
                                    <option value="paused">Paused</option>
                                </select>

                                {/* Submit Button */}
                                <button className="btn-grad" type="submit">
                                    Submit Campaign
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CreateCampaigns;