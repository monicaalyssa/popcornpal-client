import React from "react";
import { Link } from "react-router-dom";

export const UserMenu = ({ user, onLogout }) => {

  return (
    <div className="user-menu-dropdown">
      <ul className="dropdown-list">
        <p className="my-account">My Account</p>
        <p className="hero-duration">{user}</p>
        <div className="line menu-line"></div>
        <Link to={`/users/${user}`}>
        <li className="user-menu-item">
          <img alt="Settings Icon"
            className="menu-icon"
            src={require("../../images/Settings.svg")}/>
          <p>Settings</p>
        </li>
        </Link>
        <Link to={`/users/${user}`}>
        <li className="user-menu-item">
          <img alt="Favorite Icon" className="menu-icon" src={require("../../images/Heart.svg")} />
          <p>My Favorites</p>
        </li>
        </Link>
        <li onClick={onLogout} className="user-menu-item">
          <img alt="Sign Out Icon"
            className="menu-icon sign-out-icon"
            src={require("../../images/Sign-Out.svg")}
          />
          <p>Sign Out</p>
        </li>
      </ul>
    </div>
  );
};
