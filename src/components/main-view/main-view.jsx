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
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [userInfo, setUserInfo] = useState(null);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);
  const location = useLocation();

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
            banner: movie.BannerURL,
          };
        });
        setMovies(moviesFromApi);
        setFilterList(moviesFromApi)
      });
  }, [token]);


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
        setUserInfo(myUser);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

  useEffect(() => {
    if (user && token) {
      fetchUserData();
    }
  }, [location, location.hash, location.pathname, user, token]);

  const handleLogout = () => {
    setUser(null); 
    setToken(null); 
    localStorage.clear();
  }

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser)); 
  };

  const handleUpdateInfo = (updatedInfo) => {
    setUserInfo(updatedInfo);
  }

  const genreClick = (genrename) => {
    setFilterList(movies.filter(movies => movies.genre === genrename));
  }

  const genreReset = () => {
    setFilterList(movies);
  }
  
  useEffect(() => {
    setIsHeroLoaded(false);
  }, [location]);

  const handleHeroLoad = () => {
    setIsHeroLoaded(true);
  }

  const handleMovieUpdate = () => {
    fetchUserData();
  }

  return (
        
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
      <Helmet><title>PopcornPal: Log In</title>
      <meta property="og:title" content="PopcornPal: Favorite & Discover Films!" />
      <meta property="og:description" content="Browse a vast collection of movies, explore detailed information about directors and genres, and personalize your experience by managing your favorite films. Sign up to track your favorites and modify your profile—perfect for film enthusiasts." />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="PopcornPal" />
      </Helmet>
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
        <MovieView onMovieUpdate={handleMovieUpdate} movies={movies} user={user} userInfo={userInfo} onLogout={handleLogout} token={token} />
        </>
         )}
      />

      <Route path="/" element={ <> {!user ? ( <Navigate to ="/login" replace /> ) :
      movies.length === 0 ? ( <div></div> ) :
      ( <> 
      <Helmet><title>PopcornPal: Your Movie Database - Favorite & Discover Films!</title></Helmet>
      <NavBar user={user?.Username} onLogout={handleLogout}/>
      <Hero onLoad={handleHeroLoad}/>
        {isHeroLoaded && (
          <>
            <MovieGrid movies={movies} onMovieUpdate={handleMovieUpdate} genreClick={genreClick} genreReset={genreReset}/>
            <motion.div layout className="grid">
            <AnimatePresence>
            {filterList.map((movieprop) => (
              <MovieCard onMovieUpdate={handleMovieUpdate} user={user} userInfo={userInfo} token={token} key={movieprop.id} movieprop={movieprop} />
            ))}
          </AnimatePresence> 
          </motion.div> 
          </>
        )}
        </> )} </> } 
      />

      <Route path="/users/:Username"
      element={!user ? ( <Navigate to ="/login" replace /> ) : (
      <>
      <Helmet><title>PopcornPal: Manage Your Account Settings</title></Helmet>
      <NavBar user={user?.Username} onLogout={handleLogout}/>
      <ProfileView user={user} userInfo={userInfo} onMovieUpdate={handleMovieUpdate} token ={token} onUpdateUser={handleUpdateUser} onUpdateInfo={handleUpdateInfo} movies={movies}/> </> )}
      />

    </Routes>
  )
};