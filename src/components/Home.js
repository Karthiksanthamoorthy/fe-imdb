import { useNavigate } from "react-router-dom";
import React from "react";
import Button from "@mui/material/Button";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="Home-container">
      <div className="container-h1">
        <h1 className="header">🎥 Welcome to the Movie App 🎬</h1>
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/movies")}
      >
        Get Started
      </Button>
    </div>
  );
}
