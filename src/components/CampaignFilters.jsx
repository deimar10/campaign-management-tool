import React, { useState } from "react";
import { TextField, Select, MenuItem } from "@mui/material";

const CampaignFilters = ({ onFilter }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const handleFilter = () => {
    onFilter({ search, status });
  };

  return (
    <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
      <TextField
        label="Search by Title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        variant="outlined"
        size="small"
      />
      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        size="small"
        variant="outlined"
      >
        <MenuItem value="all">All Statuses</MenuItem>
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="paused">Paused</MenuItem>
      </Select>
      <button className="button-primary" variant="contained" onClick={handleFilter}>
        Apply Filters
      </button>
    </div>
  );
};

export default CampaignFilters;