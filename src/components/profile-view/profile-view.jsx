import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import React from "react";

export const ProfileView = ({ user, token, onMovieUpdate, onUpdateUser, movies, userInfo, onUpdateInfo }) => {
  const { Username } = useParams();
  const [newUsername, setNewUsername] = useState(user.Username);
  const [newEmail, setNewEmail] = useState(userInfo?.email || '');
  const [newBirthday, setNewBirthday] = useState('');
  const [userAccount, setUserAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const bearerToken = localStorage.getItem("token");
  const [currentView, setCurrentView] = useState("personal"); 
  
  if (Username === user.Username) {
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
        setNewBirthday(formatDateForInput(myUser.birthday));
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [user.Username, token]);
}

  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      Username: newUsername,
      Email: newEmail,
      Birthday: newBirthday
    };

    if (newBirthday === formatDateForInput(userAccount.birthday)) {
      delete data.Birthday;
    }

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
        onUpdateInfo({email: newEmail});
        onUpdateInfo({birthday: newBirthday});
        window.location.href = `/users/${newUsername}`;
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
        <div className="favorite-movie-flex">
        <img alt={movie.title} className="favorites-poster" src={movie.image} />
        <div className="favorite-movie-text">
        <h3>{movie.title}</h3>
        <p>{movie.description}</p>
        <div className="favorites-button-flex">
        <button onClick={(event) => removeFavorite(movie.id, event)}>
          Remove Favorite
        </button>
        </div>
        </div>
        </div>
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
      onMovieUpdate();
    });
  };

  const formatDateForInput = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDateForDisplay = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate)

    const localDate = new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    );

    return localDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (Username === user.Username && !loading) {
    return (
      <>
        <div className="profile-view">
          <ul className="account-menu">
            <p className="account-menu-title my-account">My Account</p>
            <li
              className={`account-menu-item ${currentView === 'personal' ? 'active' : ''}`}
              onClick={() => setCurrentView("personal")}
            >
              <img alt="Settings Icon"
                className="menu-icon"
                src={require("../../images/Settings.svg")}
              />
              <p>Personal</p>
            </li>

            <li
              className={`account-menu-item ${currentView === 'favorites' ? 'active' : ''}`}
              onClick={() => setCurrentView("favorites")}
            >
              <img alt="Heart Icon"
                className="menu-icon"
                src={require("../../images/Heart.svg")}
              />
              <p>My Favorites</p>
            </li>

            <li
              className={`account-menu-item ${currentView === 'security' ? 'active' : ''}`}
              onClick={() => setCurrentView("security")}
            >
              <img alt="Lock Icon"
                className="menu-icon"
                src={require("../../images/Lock2.svg")}
              />
              <p>Security</p>
            </li>
          </ul>
          {currentView === "personal" && (
            <>
              <div className="personal-view">
                <div className="personal-view-heading">
                  <h2>My Account</h2>

                  <div className="personal-view-user">
                    <div className="user-description">
                      <p className="user-name">{user.Username}</p>
                      <p className="account-menu-title">
                        Manage your personal details including your username,
                        email, and birthday.
                      </p>
                    </div>

                    <div className="user-info">
                      <div className="user-info-item">
                        <img alt="Email Icon"
                          className="menu-icon"
                          src={require("../../images/Email.png")}
                        />
                        <p className="account-menu-title">
                          {userAccount.email}
                        </p>
                      </div>

                      <div className="user-info-item">
                        <img alt="Birthday Cake Icon"
                          className="menu-icon"
                          src={require("../../images/Birthday-Cake.png")}
                        />
                        <p className="account-menu-title">
                          {formatDateForDisplay(userAccount.birthday)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-flexbox">
                  <div className="update-box">
                    <form className="profile-view-form" onSubmit={handleUpdate}>
                      <label>Username</label>
                      <input
                        type="text"
                        name="Username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className="input-box"
                      ></input>
                      <label>Email</label>
                      <input
                        type="text"
                        name="Email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="input-box"
                      ></input>
                      <label>Birthday</label>
                      <input
                        type="date"
                        name="Birthday"
                        value={newBirthday}
                        onChange={(e) => {
                          setNewBirthday(e.target.value)
                        }}
                        className="input-box"
                      ></input>
                      <div className="save-changes-box">
                        <button
                          className="save-changes-button cancel-button"
                          type="reset"
                        >
                          Cancel
                        </button>
                        <button
                          className="save-changes-button save-button"
                          type="submit"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}

          {currentView === "security" && (
            <>
              <div className="personal-view">
                <form onSubmit={deleteAccount}>
                  <label>Delete account?</label>
                  <button type="submit">Confirm</button>
                </form>
              </div>
            </>
          )}

          {currentView === "favorites" && (
            <div className="personal-view">
              <h2>Favorites</h2>
              {movieDetails.length > 0 ? (
                movieDetails
              ) : (
                <p>No favorite movies available.</p>
              )}
            </div>
          )}
        </div>
      </>
    )
  } else {
    return <div>Error: Unauthorized</div>;
  }
}
