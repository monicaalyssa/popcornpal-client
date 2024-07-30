import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { NavBar } from "../navigation/nav-bar";
import { Hero } from "../hero/hero";
import { MovieGrid } from "../movie-grid/movie-grid";
import { LoginNavBar } from "../login-nav-bar/login-nav-bar";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://popcornpal-32d285ffbdf8.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            image: movie.ImageURL,
            director: movie.Director.Name,
            genre: movie.Genre.Name,
            description: movie.Description,
            duration: movie.Duration,
            banner: movie.BannerURL
          };
        });

        setMovies(moviesFromApi);
      });
  }, [token]);

  const handleLogout = () => {
    setUser(null); 
    setToken(null); 
    localStorage.clear();
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" 
      element={ user ? ( <Navigate to="/" /> ) : <> 
      <LoginNavBar />
      <SignupView />
      </> }
      />

      <Route path="/login"
      element={user ? ( <Navigate to="/" /> ) : <>
      <LoginNavBar />
      <LoginView onLoggedIn={(user, token) => {
        setUser(user);
        setToken(token);
      }} />
      </> }
      />

      <Route path="/movies/:Title"
      element={user ? ( <Navigate to ="/login" replace /> ) : 
        movies.length === 0 ? ( <div>Loading...</div> ) : 
        ( <MovieView movieprop={selectedMovie} user={user?.username} onLogout={handleLogout} /> )}
      />

      <Route path="/" element={ <> {!user ? ( <Navigate to ="/login" replace /> ) :
      movies.length === 0 ? ( <div>Loading...</div> ) :
      ( <> 
      <NavBar user={user?.Username} onLogout={handleLogout}/>
      <Hero />
      <MovieGrid />
      <div className="grid">
      {movies.map((movieprop) => (
        <MovieCard key={movieprop.id} movieprop={movieprop} />
      ))} 
      </div> 
      </> )} </> } 
      />

    </Routes>
    </BrowserRouter>
  );
};