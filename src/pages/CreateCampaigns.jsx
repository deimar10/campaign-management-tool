import React, { useState, useEffect } from "react";
import '../scss/pages/CreateCampaigns.scss';
import { useForm } from "react-hook-form";
import Sidebar from "../components/Sidebar";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import SuccessModal from '../components/SuccessModal';

function CreateCampaigns({ onCampaignUpdate }) {

    const {
        register,
        handleSubmit,
        watch,
        resetField,
        reset,
        setError,
        formState: { errors },
    } = useForm();

    const ERROR_MESSAGES = {
        title: {
            required: "Title is required",
            minLength: "Title must contain at least 2 characters",
            maxLength: "Title cannot exceed 20 characters",
        },
        url: {
            required: "URL is required",
            pattern: "Please enter a valid URL",
        },
        payout: {
            required: "Payout is required",
            min: "Payout must be at least 5",
            max: "Payout canot exceed 99",
        },
        country: {
            required: "Please select at least one country for payout",
        },
        server: {
            unexpected: "An unexpected error occured.",
            serverError: "Server error. Please try again later."
        }
    }

    const [payouts, setPayouts] = useState([]);
    const [successOpen, setSuccessOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const selectedCountry = watch("country");

    const addPayout = () => {
        const amount = watch("payout");

        if (!selectedCountry) {
            alert("Please select a country.");
            return;
        }
        if (amount < 5) {
            setError("payout", { type: "custom", message: ERROR_MESSAGES.payout.min });
            return;
        }
        if (amount > 99) {
            setError("payout", { type: "custom", message: ERROR_MESSAGES.payout.max });
            return;
        }

        setPayouts([...payouts, { country: selectedCountry, amount }]);
        resetField("country");
        resetField("payout");
    };

    const onSubmit = (data) => {
        data.payout = payouts;

        axios.post(`${import.meta.env.VITE_API_BASE_URL}/create`, {
            title: data.title,
            url: data.url,
            status: data.status,
            payouts: payouts,
        })
            .then((response) => {
                onCampaignUpdate();
                setModalMessage(response.data.message);
                setSuccessOpen(true);
                // Reset the form fields after a successful response
                resetForm();
            })
            .catch((error) => {
                if (error.response?.status === 422 && error.response?.data?.errors) {
                    const serverErrors = error.response.data.errors;
                    Object.keys(serverErrors).forEach((field) => {
                        setError(field, { type: "server", message: serverErrors[field][0] });
                    });
                } else if (error.response?.status === 500) {
                    setError("general", { type: "server", message: ERROR_MESSAGES.server.serverError });
                } else {
                    setError("general", { type: "server", message: ERROR_MESSAGES.server.unexpected });
                }
                console.error("Server error:", error.response?.data);
            });
    };

    const resetForm = () => {
        reset({
            title: "",
            url: "",
            status: "active",
            country: "",
            payout: "",
        });
        setPayouts([]);
    };

    useEffect(() => {
        const element = document.getElementById("country");
        const options = element.getElementsByTagName("option");

        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            const isInPayouts = payouts.some((payout) => payout.country === option.value);

            if (isInPayouts) {
                option.setAttribute("disabled", "disabled");
            } else {
                option.removeAttribute("disabled");
            }
        }
    }, [payouts, selectedCountry]);

    return (
        <div className="layout">
            <Sidebar />
            <main className="main-content">
                <div className="create-campaign-container">
                    <div className="create-campaign-card">
                        <h1>Create your own campaign here!</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                {errors.general && <p className="error-message">{errors.general.message}</p>}
                                {/* Campaign Title */}
                                <label htmlFor="title">Campaign Title</label>
                                <input
                                    id="title"
                                    placeholder="Enter campaign title"
                                    {...register("title", {
                                        required: ERROR_MESSAGES.title.required,
                                        minLength: {
                                            value: 2,
                                            message: ERROR_MESSAGES.title.minLength,
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: ERROR_MESSAGES.title.maxLength,
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
                                        required: ERROR_MESSAGES.url.required,
                                        pattern: {
                                            value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/,
                                            message: ERROR_MESSAGES.url.pattern,
                                        },
                                    })}
                                />
                                {errors.url && <p className="error-message">{errors.url.message}</p>}

                                {/* Country Dropdown */}
                                <label htmlFor="country">Select a Country for Payout</label>
                                <select
                                    id="country"
                                    {...register("country", {
                                        required: payouts.length === 0 ? ERROR_MESSAGES.country.required : false,
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
                                                required: ERROR_MESSAGES.payout.required,
                                                min: { value: 5, message: ERROR_MESSAGES.payout.min },
                                                max: { value: 99, message: ERROR_MESSAGES.payout.max },
                                            })}
                                        />
                                        {errors.payout && <p className="error-message">{errors.payout.message}</p>}
                                        <button type="button" className="button-primary addPayout" onClick={addPayout}>
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
            {/* Success Modal */}
            <SuccessModal open={successOpen} message={modalMessage} onClose={() => setSuccessOpen(false)} />
        </div>
    )
}

export default CreateCampaigns;