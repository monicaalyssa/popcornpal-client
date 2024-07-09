import { useState } from "react";
import React from "react";
import { MovieCard } from "../movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    { id: 1, title: "Avatar: The Way of Water" },
    { id: 2, title: "The Maze Runner" },
    { id: 3, title: "Divergent" }
  ]);

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movieprop) => {
        <MovieCard movieprop={movies}/>
      })}
    </div>
  );
};
