import { useEffect, useState } from "react";
import { Movie } from "./Movie";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { API } from "../global";
// import { EditMovie } from "./EditMovie";

export function MovieList() {
  const navigate = useNavigate();

  const [movieList, setMovieList] = useState([]);
  const getMovies = () => {
    fetch(`${API}/movies`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((movies) => setMovieList(movies));
  };

  useEffect(() => getMovies(), []);

  const deleteMovie = (id) => {
    fetch(`${API}/movies/${id}`, {
      method: "DELETE",
    }).then((data) => getMovies());
  };

  return (
    <>
      <div className="movie-list">
        {movieList.map((mv) => (
          <div key={mv._id}>
            <Movie
              id={mv._id}
              movie={mv}
              deleteButton={
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteMovie(mv._id)}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              }
              editButton={
                <IconButton
                  aria-label="edit"
                  onClick={() => navigate(`edit/${mv._id}`)}
                >
                  <EditIcon color="primary" />
                </IconButton>
              }
            />
          </div>
        ))}
      </div>
    </>
  );
}
