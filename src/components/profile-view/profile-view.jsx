import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import React from "react";

export const ProfileView = ({ user, token, onUpdateUser, movies }) => {
  const { Username } = useParams();
  const [newUsername, setNewUsername] = useState(user.Username);
  const [userAccount, setUserAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const bearerToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://popcornpal-32d285ffbdf8.herokuapp.com/users/${user.Username}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        const data = await response.json();
        const myUser = {
          id: data._id,
          username: data.Username,
          password: data.Password,
          email: data.Email,
          birthday: data.Birthday,
          favoriteMovies: data.Favorites
        };
        setUserAccount(myUser);
        setFavoriteMovies(myUser.favoriteMovies);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [user.Username, token]);

  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      Username: newUsername
    };

    fetch(
      `https://popcornpal-32d285ffbdf8.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`
        }
      }
    )
      .then((data) => {
        console.log("Success");
        onUpdateUser({ user, Username: newUsername });
        window.location.href = `/users/${newUsername}`;
      })
      .catch((error) => {
        console.error("not working");
      });
  };

  const movieDetails = favoriteMovies.map((favoriteprop) => {
    const movie = movies.find((m) => favoriteprop === m.id);
    return movie ? (
      <div key={favoriteprop}>
        <p>{movie.title}</p>
        <img className="favorites-poster" src={movie.image} />
      </div>
    ) : null;
  });

  if (Username === user.Username && !loading) {
    return (
      <>
        <p>Username: {userAccount.username}</p>
        <p>Email: {userAccount.email}</p>
        <p>Birthday: {userAccount.birthday}</p>
        <div> Favorites:
          {movieDetails.length > 0 ? (
            movieDetails
          ) : (
            <p>No favorite movies available.</p>
          )}
        </div>

        <form onSubmit={handleUpdate}>
          <label>Update username: </label>
          <input
            type="text"
            name="Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          ></input>
          <button type="submit">Enter</button>
        </form>
        <Link to={`/`}>
          <button>Go Back</button>
        </Link>
      </>
    );
  } else {
    return <div>Error: Unauthorized</div>;
  }
};
