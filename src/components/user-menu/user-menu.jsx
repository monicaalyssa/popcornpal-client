import React from "react";
import { Link } from "react-router-dom";

export const UserMenu = ({ user, onLogout }) => {

  const handleSettingsClick = () => {
    // Code to handle settings click
    console.log("Settings clicked");
  };

  return (
    <div className="user-menu-dropdown">
      <ul className="dropdown-list">
        <p className="my-account">My Account</p>
        <p className="hero-duration">{user}</p>
        <div className="line menu-line"></div>
        <Link to={`/users/${user}`}>
        <li className="user-menu-item">
          <img
            className="menu-icon"
            src={require("../../images/Settings.svg")}
          />
          <p>Settings</p>
        </li>
        </Link>
        <li className="user-menu-item">
          <img className="menu-icon" src={require("../../images/Heart.svg")} />
          <p>My Favorites</p>
        </li>
        <li className="user-menu-item">
          <img
            className="menu-icon sign-out-icon"
            src={require("../../images/Sign-Out.svg")}
          />
          <p onClick={onLogout}>Sign Out</p>
        </li>
      </ul>
    </div>
  );
};
