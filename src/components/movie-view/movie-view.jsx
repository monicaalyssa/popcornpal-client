import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export const MovieView = ({ movies, user, onLogout }) => {  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { Title } = useParams();
  const movie = movies.find((m) => m.id === Title);

  return (
    <div>
      <Helmet>
        <title>PopcornPal: {movie.title}</title>
      </Helmet>
      <div
        className="banner-container"
        width="100%;"
        style={{ backgroundImage: `url(${movie.banner})` }}
      ></div>

      <div className="movie-info">
        <div className="movie-heading-flex">
          <h1 className="heading movie-heading-margin">{movie.title}</h1>
          <button className="favorite-button">
            {" "}
            <img
              className="red-heart"
              src={require("../../images/Red-Heart.svg")}
            />
            <p className="favorite-btn-text">Favorite</p>
          </button>
        </div>

        <div className="movie-info-bubbles">
          <p className="bubble">Duration: {movie.duration}</p>
          <p className="bubble">{movie.genre}</p>
        </div>

        <div className="info-section">
          <h2>Synopsis</h2>
          <p className="movie-description">{movie.description}</p>
        </div>

        <div className="info-section">
          <h2>Director</h2>
          <p className="movie-description">{movie.director}</p>
        </div>

        <div className="back-btn-container">
          <Link to={`/`}>
          <button>Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
