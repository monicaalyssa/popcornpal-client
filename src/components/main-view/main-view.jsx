import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { NavBar } from "../navigation/nav-bar";
import { Hero } from "../hero/hero";
import { MovieGrid } from "../movie-grid/movie-grid";
import { LoginNavBar } from "../login-nav-bar/login-nav-bar";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ProfileView } from "../profile-view/profile-view";
import { Helmet } from "react-helmet";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://popcornpal-32d285ffbdf8.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            image: movie.ImageURL,
            director: movie.Director.Name,
            genre: movie.Genre.Name,
            description: movie.Description,
            duration: movie.Duration,
            banner: movie.BannerURL
          };
        });

        setMovies(moviesFromApi);
      });
  }, [token]);

  const handleLogout = () => {
    setUser(null); 
    setToken(null); 
    localStorage.clear();
  }

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser)); 
  };

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" 
      element={ user ? ( <Navigate to="/" /> ) : <> 
      <Helmet><title>PopcornPal: Sign Up</title></Helmet>
      <LoginNavBar />
      <SignupView />
      </> }
      />

      <Route path="/login"
      element={ user ? ( <Navigate to="/" /> ) : <>
      <Helmet><title>PopcornPal: Log In</title></Helmet>
      <LoginNavBar />
      <LoginView onLoggedIn={(user, token) => {
        setUser(user);
        setToken(token);
      }} />
      </> }
      />

      <Route path="/movies/:Title"
      element={!user ? ( <Navigate to ="/login" replace /> ) : 
        movies.length === 0 ? ( <div>Loading...</div> ) : 
        (
        <> 
        <NavBar user={user?.Username} onLogout={handleLogout}/>
        <MovieView movies={movies} user={user?.username} onLogout={handleLogout} />
        </>
         )}
      />

      <Route path="/" element={ <> {!user ? ( <Navigate to ="/login" replace /> ) :
      movies.length === 0 ? ( <div>Loading...</div> ) :
      ( <> 
      <Helmet><title>PopcornPal: Your Movie Database - Favorite & Discover Films!</title></Helmet>
      <NavBar user={user?.Username} onLogout={handleLogout}/>
      <Hero />
      <MovieGrid />
      <div className="grid">
      {movies.map((movieprop) => (
        <MovieCard user={user} token={token} key={movieprop.id} movieprop={movieprop} />
      ))} 
      </div> 
      </> )} </> } 
      />

      <Route path="/users/:Username"
      element={!user ? ( <Navigate to ="/login" replace /> ) : (
      <>
      <Helmet><title>PopcornPal: Manage Your Account Settings</title></Helmet>
      <ProfileView user={user} token ={token} onUpdateUser={handleUpdateUser} movies={movies}/> </> )}
      />

    </Routes>
    </BrowserRouter>
  )
};