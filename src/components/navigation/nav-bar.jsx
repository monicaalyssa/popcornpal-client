export const NavBar = () => {
  return (
    <header>
      <div className="nav-bar">
        <div className="logo">PopcornPal</div>
        <div className="menu-bar">
          <p>Movies</p>
          <p>Genres</p>
          <p>My List</p>
        </div>
        <div className="right-logos">
          <img
            className="search-btn"
            src={require("../../images/Search.svg")}
          />
          <img className="user-btn" src={require("../../images/User.svg")} />
        </div>
      </div>
    </header>
  );
};
