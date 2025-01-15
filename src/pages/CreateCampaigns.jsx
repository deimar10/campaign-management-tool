import React, { useState } from "react";
import '../scss/CreateCampaigns.scss';
import { useForm } from "react-hook-form";
import Sidebar from "../components/Sidebar";

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
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div className="create-campaigns-main-container">
                <h2>Create your own campaign here!</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Title</label>
                    <input
                        id="title"
                        {...register("title", {
                            required: "Title is required",
                            maxLength: {
                                value: 20,
                                message: "Title cannot exceed 20 characters",
                            },
                        })}
                    />
                    {errors.title && <p className="error-message">{errors.title.message}</p>}
                    <label>Url</label>
                    <input
                        id="url"
                        {...register("url", {
                            required: "URL is required",
                            pattern: {
                                value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/,
                                message: "Please enter a valid URL",
                            },
                        })}
                    />
                    {errors.url && <p className="error-message">{errors.url.message}</p>}
                    <label>Payout - Select a country</label>
                    <select
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

                    {errors.country && <p className="error-message">{errors.country.message}</p>}
                    {selectedCountry &&
                        <div>
                            <label>Payout - Enter a payout for {selectedCountry.toUpperCase()}</label>
                            <input 
                                id="payout"
                                type="number" 
                                {...register("payout", { 
                                    required: "Payout is required",
                                    min: { value: 0, message: "Payout must be at least 0" },
                                    max: { value: 99, message: "Payout cannot exceed 99" },
                                })} 
                            />
                        {errors.payout && <p className="error-message">{errors.payout.message}</p>}
                        <button type="button" onClick={addPayout}>
                            Add Payout
                        </button>
                        </div>
                    } 
                    <label>Status</label>
                    <select {...register("status")}>
                        <option value="active">Active</option>
                        <option value="paused">Paused</option>
                    </select>
                    <input type="submit" />
                </form>
            </div>
        </div>
    )
}

export default CreateCampaigns;