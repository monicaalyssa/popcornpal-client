import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { NavBar } from "../navigation/nav-bar";
import { Hero } from "../hero/hero";
import { MovieGrid } from "../movie-grid/movie-grid";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://popcornpal-32d285ffbdf8.herokuapp.com/movies")
    .then((response) => response.json())
    .then((data) => {
      console.log("Movies:", data);
    })
  });

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
  );
};
