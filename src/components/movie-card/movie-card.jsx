import PropTypes from "prop-types";

export const MovieCard = ({ movieprop, onMovieClick }) => {
  return (
    <div className="movie-card"
      onClick={() => {
        onMovieClick(movieprop);
      }}
    >
      <div className="grid-overflow"><img className="grid-poster" src={movieprop.image} /></div>
      <div className="grid-movie-info">
      {movieprop.title}
      <p className="grid-genre-desc">{movieprop.genre}</p>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  genre: PropTypes.shape ({ 
    name: PropTypes.string}).isRequired, 
  onMovieClick: PropTypes.func.isRequired
};