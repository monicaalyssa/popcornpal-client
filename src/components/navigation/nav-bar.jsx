import { UserMenu } from "../user-menu/user-menu";
import { useState, useEffect, useRef } from "react";
import { React } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom"

export const NavBar = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  let menuRef = useRef(null);
  const location = useLocation();
  const lastHash = useRef('');

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
    if (location.hash) {
      lastHash.current = location.hash.slice(1);
    }

    if (lastHash.current && document.getElementById(lastHash.current)) {
      setTimeout(() => {
        document
          .getElementById(lastHash.current)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        lastHash.current = '';
      }, 100);
    }
  }, [location]);

  return (
    <header>
      <div className="nav-bar">
        <Link to={`/`}>
          <div className="logo">PopcornPal</div>
        </Link>
        <div className="menu-bar">
        <Link to={`/#movies`}>
            <p>Movies</p>
        </Link>
          <p>Genres</p>
          <p>My List</p>
        </div>
        <div ref={menuRef} className="right-logos">
          <img
            className="search-btn"
            src={require("../../images/Search.svg")}
          />
          <img
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
