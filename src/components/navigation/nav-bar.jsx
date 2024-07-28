import { UserMenu } from "../user-menu/user-menu";
import { useState } from "react";
import { React } from "react";

export const NavBar = ({ user, onLogout }) => {
  const [openProfile, setOpenProfile] = useState(false);

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
        <div className="right-logos">
          <img
            className="search-btn"
            src={require("../../images/Search.svg")}
          />
          <img
            onClick={() => setOpenProfile((prev) => !prev)}
            className="user-btn"
            src={require("../../images/User.svg")}
          />
          {openProfile && <UserMenu user={user} onLogout={onLogout} />}
        </div>
      </div>
    </header>
  );
};
