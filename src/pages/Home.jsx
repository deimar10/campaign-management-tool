import React from "react";
import '../scss/pages/Home.scss';
import Sidebar from "../components/Sidebar";
import blob from '/assets/blob.svg';
import secondBlob from '/assets/blob_2.svg';
import wave from '/assets/wave.svg';
import secondWave from '/assets/wave_2.svg';

function Home() {
    return (
        <div style={{ display: "flex", height: "100%" }}>
            <Sidebar />
            <main className="home-main-container">
                <img className="wave" src={wave} alt="wave" />
                <div className="grid">
                    <div className="col">
                        <h1>Campaign Management Tool</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <button>Create campaign</button>
                    </div>
                    <div className="col">
                        <h1>right column</h1>
                    </div>
                </div>
                <img className="blob" src={blob} alt="blob" />
                <img className="blob" src={secondBlob} alt="secondBlob" />
                <img className="secondWave" src={secondWave} alt="secondWave" />
            </main>
        </div>
    )
}

export default Home;