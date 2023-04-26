import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { MovieList } from "./components/MovieList";
import { AddMovie } from "./components/AddMovie";
import { AddColor } from "./components/AddColor";
import { EditMovie } from "./components/EditMovie";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { NotFound } from "./components/NotFound";
import { MovieDetails } from "./components/MovieDetails";
import { Home } from "./components/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import { API } from './global';

function App() {
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    fetch(`${API}/movies`, { method: "GET" })
      .then((data) => data.json())
      .then((movies) => setMovieList(movies))
  }, []);

  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  
  

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper elevation={0} style={{ minHeight: "100vh", borderRadius: "0px" }}>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <div className="nav-flex">
                <div className="nav-btn">
                  <Button color="inherit" onClick={() => navigate("/")}>
                    Home
                  </Button>
                  <Button color="inherit" onClick={() => navigate("/movies")}>
                    Movies
                  </Button>
                  <Button color="inherit" onClick={() => navigate("/addmovie")}>
                    Add Movie
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => navigate("/colorgame")}
                  >
                    Color Game
                  </Button>
                </div>
                <div className="theme-btn">
                  <Button
                    color="inherit"
                    onClick={() => setMode(mode === "dark" ? "light" : "dark")}
                  >
                    {mode === "dark" ? (
                      <Brightness7Icon />
                    ) : (
                      <Brightness4Icon />
                    )}
                  </Button>
                </div>
              </div>
            </Toolbar>
          </AppBar>

          <Routes>
          <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Signup />} />
            <Route path="/" element={<ProductedRoute><Home /></ProductedRoute>} />
            <Route path="/movies" element={<ProductedRoute><MovieList /></ProductedRoute>} />
            <Route path="/addmovie" element={<ProductedRoute><AddMovie /></ProductedRoute>} />
            <Route path="/movies/:id" element={<ProductedRoute><MovieDetails /></ProductedRoute>} />
            <Route path="/movies/edit/:id" element={<ProductedRoute><EditMovie /></ProductedRoute>} />
            <Route path="/colorgame" element={<AddColor />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

function ProductedRoute({ children }) {
  const isAuth = localStorage.getItem("token");
  // console.log(isAuth);
  return isAuth ? children : <Navigate replace to={"/login"} />;
}

export default App;
