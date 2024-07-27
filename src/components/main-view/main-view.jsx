import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { NavBar } from "../navigation/nav-bar";
import { Hero } from "../hero/hero";
import { MovieGrid } from "../movie-grid/movie-grid";
import { LoginNavBar } from "../login-nav-bar/login-nav-bar";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [token, setToken] = useState(null);

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
            genre: movie.Genre.Name
          };
        });

        setMovies(moviesFromApi);
      });
  }, [token]);

  if (!user) {
    return (
      <div>
        <LoginNavBar />
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
      </div>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView
        movieprop={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      <NavBar />
      <Hero />
      <MovieGrid />
      <div className="grid">
      {movies.map((movieprop) => (
        <MovieCard
          key={movieprop.id}
          movieprop={movieprop}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      </div>
      <button onClick={() => { setUser(null); setToken(null); }}>Logout</button>
    </div>
  );
};
