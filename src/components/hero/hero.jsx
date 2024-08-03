import { Link } from "react-router-dom"

export const Hero = () => {
  return (
    <div className="hero-container">
      <img className="hero-img" src={require("../../images/avatar-bkg.jpg")} />
      <div className="hero-text">
        <div className="left-hero">
          <p className="hero-duration">Duration: 3h12m • Action</p>
            <h1 className="hero-title">Avatar: The Way of Water</h1>
          <p className="hero-desc">
            On the lush alien world of Pandora live the Na'vi, beings who appear
            primitive but are highly evolved.
          </p>
          <div className="hero-btns">
            <Link to={`/movies/66a99600da099ad62d373c3f`}>
              <button className="read-more-btn">Read More</button>
            </Link>
            <img
              className="white-heart"
              src={require("../../images/Heart.svg")}
            />
          </div>
        </div>
        <div className="right-hero">
          <img
            className="featured-star"
            src={require("../../images/Star.svg")}
          />
          <p>featured</p>
        </div>
      </div>
    </div>
  );
};
