import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useEffect, useState } from "react";
import { API } from "../global";

export function MovieDetails() {
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`${API}/movies/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((mv) => setMovie(mv));
  }, [id]);

  const navigate = useNavigate();
  const styles = {
    color: movie.rating >= 8.5 ? "green" : "red",
  };

  return (
    <div className="movie-detail-div">
      <div className="movie-detail-iframe">
        <iframe
          className="movie-iframe"
          src={movie.trailer}
          title={movie.name}
        ></iframe>
      </div>
      <div className="movie-detail-container">
        <div className="movie-specs">
          <h2 className="movie-name">{movie.name} </h2>
          <p style={styles} className="movie-rating">
            ⭐ {movie.rating}
          </p>
        </div>

        <p className="movie-summary">{movie.summary}</p>
        <div className="back-button">
          <Button
            variant="contained"
            startIcon={<KeyboardBackspaceIcon />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
