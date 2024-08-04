import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import WhiteHeart from "../../images/Heart.svg"
import RedHeart from "../../images/Red-Heart-Filled.svg"

export const MovieCard = ({ movieprop, user, token, userInfo }) => {
  const [favoritesList, setFavoritesList] = useState(userInfo.favoriteMovies);
  const [myFavorite, setMyFavorite] = useState(false);

  useEffect(() => {
    setMyFavorite(favoritesList.includes(movieprop.id));
  }, [favoritesList, movieprop.id]);

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
      });
    }
  };

  return (
    <>
    <Link className="whole-movie-card"to={`/movies/${encodeURIComponent(movieprop.id)}`}>
    <img
    onClick={(event) => addFavorite(movieprop.id, event)}
    className="white-heart poster-favorite-heart"
    src={myFavorite ? RedHeart : WhiteHeart } // make a transition effect to fill the heart
    />
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
    </>
  );
};