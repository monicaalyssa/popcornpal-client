import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const MovieCard = ({ movieprop }) => {
  return (
    <Link to={`/movies/${encodeURIComponent(movieprop.id)}`}>
    <div className="movie-card">
        <div className="grid-overflow">
        <img className="grid-poster" src={movieprop.image} />
        <div className="hover-container">
          <button className="hover-more-details">More Details</button>
        </div>
      </div>
      <div className="grid-movie-info">
      {movieprop.title}
      <p className="grid-genre-desc">{movieprop.genre}</p>
      </div>
    </div>
    </Link>
  );
};

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  genre: PropTypes.shape ({ 
    name: PropTypes.string}).isRequired
};