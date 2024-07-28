import { NavBar } from "../navigation/nav-bar";
import { useEffect } from "react";

export const MovieView = ({ movieprop, onBackClick, user, onLogout  }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <NavBar user={user} onLogout={onLogout} />
      <div
        className="banner-container"
        width="100%;"
        style={{ backgroundImage: `url(${movieprop.banner})` }}
      ></div>

      <div className="movie-info">
        <div className="movie-heading-flex">
          <h1 className="heading movie-heading-margin">{movieprop.title}</h1>
          <button className="favorite-button">
            {" "}
            <img
              className="red-heart"
              src={require("../../images/Red-Heart.svg")}
            />
            Favorite
          </button>
        </div>

        <div className="movie-info-bubbles">
          <p className="bubble">Duration: {movieprop.duration}</p>
          <p className="bubble">{movieprop.genre}</p>
        </div>

        <div className="info-section">
          <h2>Synopsis</h2>
          <p className="movie-description">{movieprop.description}</p>
        </div>

        <div className="info-section">
          <h2>Director</h2>
          <p className="movie-description">{movieprop.director}</p>
        </div>

        <div className="back-btn-container">
          <button onClick={onBackClick}>Go Back</button>
        </div>
      </div>
    </div>
  );
};
