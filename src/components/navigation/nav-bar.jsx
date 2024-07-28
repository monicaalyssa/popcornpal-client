import { UserMenu } from "../user-menu/user-menu";
import { useState, useEffect, useRef } from "react";
import { React } from "react";

export const NavBar = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);

  let menuRef = useRef(null);

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

  return (
    <header>
      <div className="nav-bar">
        <div className="logo">PopcornPal</div>
        <div className="menu-bar">
          <a href="/movies">
            <p>Movies</p>
          </a>
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
