import React, { useState } from "react";
import { TextField, Select, MenuItem, Button } from "@mui/material";

const CampaignFilters = ({ onFilter }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [country, setCountry] = useState("all");

  const handleFilter = () => {
    onFilter({ search, status, country });
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
      <Select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        size="small"
        variant="outlined"
      >
        <MenuItem value="all">All Countries</MenuItem>
        <MenuItem value="estonia">Estonia</MenuItem>
        <MenuItem value="spain">Spain</MenuItem>
        <MenuItem value="bulgaria">Bulgaria</MenuItem>
      </Select>
      <Button variant="contained" onClick={handleFilter}>
        Apply Filters
      </Button>
    </div>
  );
};

export default CampaignFilters;