import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { NavBar } from "../navigation/nav-bar";
import { Hero } from "../hero/hero";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Avatar: The Way of Water",
      image:
        "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_.jpg",
      director: "James Cameron"
    },
    {
      id: 2,
      title: "The Maze Runner",
      image:
        "https://m.media-amazon.com/images/M/MV5BMjUyNTA3MTAyM15BMl5BanBnXkFtZTgwOTEyMTkyMjE@._V1_.jpg",
      director: "Wes Ball"
    },
    {
      id: 3,
      title: "Divergent",
      image:
        "https://m.media-amazon.com/images/M/MV5BMTYxMzYwODE4OV5BMl5BanBnXkFtZTgwNDE5MzE2MDE@._V1_FMjpg_UY2048_.jpg",
      director: "Neil Burger"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
