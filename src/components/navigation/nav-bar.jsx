import { UserMenu } from "../user-menu/user-menu";
import { GenreDropdown } from "../genre-dropdown/genre-dropdown";
import { useState, useEffect, useRef } from "react";
import { React } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const NavBar = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  let menuRef = useRef(null);
  const location = useLocation();
  const lastHash = useRef("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    if (location.hash === "#movies") {
      setTimeout(() => {
        document
          .getElementById("movies")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        location.hash = "";
        console.log(location.hash);
      }, 100);
    }
  }, [location, location.hash]);

  return (
    <header>
      <div className="nav-bar">
        <Link to={`/`}>
          <div className="logo">PopcornPal</div>
        </Link>

        <div className="menu-bar">
          <Link to={`/#movies`}>
            <p className="menu-item">Movies</p>
          </Link>

          <div className="genre-cursor">
            <p
              className="menu-item genre-menu-item"
              onMouseEnter={() => setOpenDropdown(true)}
            >
              Genres
            </p>
            <div
              className={`open-dropdown ${
                openDropdown ? "active" : "inactive"
              }`}
            >
              <div onMouseLeave={() => setOpenDropdown(false)}>
                <GenreDropdown />
              </div>
            </div>
          </div>

          <Link to={`/users/${user}`}>
          <p className="menu-item">My List</p>
          </Link>
        </div>
        <div ref={menuRef} className="right-logos">
          <img alt="Search Icon"
            className="search-btn"
            src={require("../../images/Search.svg")}
          />
          <img alt="User Profile Icon"
            onClick={() => setOpen(!open)}
            className="user-btn"
            src={require("../../images/User.svg")}
          />
          <div className={`open-profile ${open ? "active" : "inactive"}`}>
            <UserMenu user={user} onLogout={onLogout} />
          </div>
        </div>
      </div>
    </header>
  );
};
