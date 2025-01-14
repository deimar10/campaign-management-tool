import React from "react";
import Sidebar from "../components/Sidebar";

function Home() {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <main style={{ flexGrow: 1, padding: "16px" }}>
                {/* main content */}
            </main>
        </div>
    )
}

export default Home;