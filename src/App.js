import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { MovieList } from "./components/MovieList";
import { AddMovie } from "./components/AddMovie";
import { AddColor } from "./components/AddColor";
import { EditMovie } from "./components/EditMovie";
import { useState } from "react";
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

function App() {
  const navigate = useNavigate();

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
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/addmovie" element={<AddMovie />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/movies/edit/:id" element={<EditMovie />} />
            <Route path="/colorgame" element={<AddColor />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
