import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import React from "react";

export const ProfileView = ({ user, token, onUpdateUser, movies, userInfo, onUpdateInfo }) => {
  const { Username } = useParams();
  const [newUsername, setNewUsername] = useState(user.Username);
  const [newEmail, setNewEmail] = useState(userInfo?.email || '');
  const [newBirthday, setNewBirthday] = useState(userInfo?.birthday || '');
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
        setNewEmail(myUser.email)
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
        onUpdateUser({ user, Username: newUsername });
        window.location.href = `/users/${newUsername}`;
      })
      .catch((error) => {
        console.error("Something went wrong");
      });
  };

  const handleEmailUpdate = (event) => {
    event.preventDefault();

    const data = {
      Email: newEmail
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
        onUpdateInfo({email: newEmail});
        window.location.href = `/users/${user.Username}`;
      })
      .catch((error) => {
        console.error("Something went wrong");
      });
  };

  const handleBirthdayUpdate = (event) => {
    event.preventDefault();

    const data = {
      Birthday: newBirthday
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
        onUpdateInfo({birthday: newBirthday});
        window.location.href = `/users/${user.Username}`;
      })
      .catch((error) => {
        console.error("Something went wrong");
      });
  };

  const deleteAccount = (event) => {
    event.preventDefault();

    fetch(
      `https://popcornpal-32d285ffbdf8.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`
        }
      }
    )
      .then((data) => {
        localStorage.removeItem("token");
        onUpdateUser(null);
        window.location.href = `/login`;
      })
      .catch((error) => {
        console.error("Account could not be deleted");
      });
  };

  const movieDetails = favoriteMovies.map((favoriteprop) => {
    const movie = movies.find((m) => favoriteprop === m.id);
    return movie ? (
      <div key={favoriteprop}>
        <p>{movie.title}</p>
        <img className="favorites-poster" src={movie.image} />
        <button onClick={(event) => removeFavorite(movie.id, event)}>
          Remove Favorite
        </button>
      </div>
    ) : null;
  });

  const removeFavorite = async (movieID, event) => {
    event.preventDefault();
    fetch(
      `https://popcornpal-32d285ffbdf8.herokuapp.com/users/${user.Username}/movies/${movieID}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${bearerToken}`
        }
      }
    ).then((data) => {
      setFavoriteMovies((prevFavorites) =>
prevFavorites.filter((id) => id !== movieID)
      );
    });
  };

  const formatDate = (dateData) => {
    const date = new Date(dateData);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  if (Username === user.Username && !loading) {
    return (
      <>
        <p>Username: {userAccount.username}</p>
        <p>Email: {userAccount.email}</p>
        <p>Birthday: {formatDate(userAccount.birthday)}</p>
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

        <form onSubmit={handleEmailUpdate}>
          <label>Update email: </label>
          <input
            type="text"
            name="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          ></input>
          <button type="submit">Enter</button>
        </form>

        <form onSubmit={handleBirthdayUpdate}>
          <label>Update birthday: </label>
          <input
            type="date"
            name="Birthday"
            value={newBirthday}
            onChange={(e) => setNewBirthday(e.target.value)}
          ></input>
          <button type="submit">Enter</button>
        </form>

        <form onSubmit={deleteAccount}>
          <label>Delete account?</label>
          <button type="submit">Confirm</button>
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