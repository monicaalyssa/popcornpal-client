import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";

export const MovieGrid = ({ onMovieUpdate, movies, genreClick, genreReset }) => {
  const [activeGenre, setActiveGenre] = useState(null);
  const genres = ["Horror", "Drama", "Action", "Mystery", "Fantasy", "Documentary"];

  const handleGenreClick = (genrename) => {
    if (activeGenre === genrename) {
      setActiveGenre(null);
      genreReset();
      onMovieUpdate();
    } else {
      setActiveGenre(genrename);
      genreClick(genrename);
      onMovieUpdate();
    }
  };

  return (
    <div id="movies" className="movie-heading-container">
      <h2>Movies</h2>
      <div className="line"></div>
      <div className="genres">
        {genres.map((genre) => (
          <p
            key={genre}
            onClick={() => handleGenreClick(genre)}
            className={`bubble genre-button ${
              activeGenre === genre ? "active" : "not-active"
            }`}
          >
            {genre}
          </p>
        ))}
      </div>
    </div>
  );
};
