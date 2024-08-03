import { Link } from "react-router-dom";

export const MovieCard = ({ movieprop, user, token }) => {
  const addFavorite = async (movieID, event) => {
    event.preventDefault();
    fetch(
      `https://popcornpal-32d285ffbdf8.herokuapp.com/users/${user.Username}/movies/${movieID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then((data) => {
      alert('Movie added'); // the heart needs to stay red instead of adding an alert
    });
  };
  
  return (
    <>
    <Link to={`/movies/${encodeURIComponent(movieprop.id)}`}>
    <img
    className="white-heart poster-favorite"
    src={require("../../images/Heart.svg")}
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
    <button onClick={(event) => addFavorite(movieprop.id, event)}>Add to favorites</button>
    </Link>
    </>
  );
};