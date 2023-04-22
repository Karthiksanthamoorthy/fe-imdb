import { useState } from "react";
import { Counter } from "./Counter";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";


export function Movie({ movie, id,deleteButton,editButton }) {
  const styles = {
    color: movie.rating >= 8.5 ? "green" : "red",
  };
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <div className="movie-card">
          <img src={movie.poster} alt={movie.name} className="movie-poster" />
          <CardContent>
            <div className="movie-specs">
              <h2 className="movie-name">
                {movie.name}
                <IconButton
                  color="primary"
                  aria-label="toggle"
                  onClick={() => setShow(!show)}
                  className="btn-expand"
                >
                  {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={() => navigate(`/movies/${id}`)}
                >
                  <InfoIcon />
                </IconButton>
              </h2>
              <p style={styles} className="movie-rating">
                ⭐ {movie.rating}
              </p>
            </div>

            {show ? <p className="movie-summary">{movie.summary}</p> : null}
          </CardContent>
          <CardActions>
            <div className="action-icons">
              <Counter />
              <div className="edit-delete">
                {editButton}
                {deleteButton}
              </div>
            </div>
          </CardActions>
        </div>
      </Card>
    </>
  );
}
