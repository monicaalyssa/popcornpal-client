import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useState } from "react";
import RedHeartFilled from "../../images/Red-Heart-Filled.svg"
import RedHeart from "../../images/Red-Heart.svg"

export const MovieView = ({ movies, user, onLogout, onMovieUpdate, userInfo, token}) => {  
  const [favoritesList, setFavoritesList] = useState(user.favoriteMovies || []);
  const [myFavorite, setMyFavorite] = useState(false);
  const { Title } = useParams();
  const movie = movies.find((m) => m.id === Title);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (userInfo) {
      setFavoritesList(userInfo.favoriteMovies || []);
    }
  }, [userInfo])
  
  useEffect(() => {
    if (favoritesList.length > 0) {
      setMyFavorite(favoritesList.includes(movie.id));
    }
  }, [favoritesList, movie.id]);

  const addFavorite = async (movieID, event) => {
    event.preventDefault();
    if (!favoritesList.includes(movieID)) {
      fetch(
        `https://popcornpal-32d285ffbdf8.herokuapp.com/users/${user.Username}/movies/${movieID}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ).then((data) => {
        setFavoritesList((prevList) => [...prevList, movieID]);
        setMyFavorite(true);
        onMovieUpdate();
      });
    } else {
      fetch(
        `https://popcornpal-32d285ffbdf8.herokuapp.com/users/${user.Username}/movies/${movieID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ).then((data) => {
        setFavoritesList((prevList) => prevList.filter((id) => id !== movieID));
        setMyFavorite(false);
        onMovieUpdate();
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>PopcornPal: {movie.title}</title>
        <link rel="preload" href={movie.banner} as="image" />
      </Helmet>
      <div
        className="banner-container"
        width="100%;"
        style={{ backgroundImage: `url(${movie.banner})` }}
      ></div>

      <div className="movie-info">
        <div className="movie-heading-flex">
          <h1 className="heading movie-heading-margin">{movie.title}</h1>
          <button className={`favorite-button ${myFavorite ? "my-favorite" : "not-my-favorite" }`} onClick={(event) => addFavorite(movie.id, event)}>
            <img alt="Favorite Heart"
              className="red-heart"
              src={myFavorite ? RedHeartFilled : RedHeart }
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
