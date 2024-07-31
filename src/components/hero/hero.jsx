export const Hero = () => {
  return (
    <div className="hero-container">
      <img className="hero-img" src={require("../../images/avatar-bkg.jpg")} />
      <div className="hero-text">
        <div className="left-hero">
          <p className="hero-duration">Duration: 3h12m • Action</p>
          <div className="hero-responsive-title">
            <h1 className="hero-title">Avatar: The Way of Water</h1>
          </div>
          <p className="hero-desc">
            On the lush alien world of Pandora live the Na'vi, beings who appear
            primitive but are highly
            <span className="hero-more-desc">
              {" "}
              evolved. Because the planet's environment is poisonous,
              human/Na'vi hybrids, called Avatars, must link
              <span className="dots">...&nbsp;</span>
            </span>
            <a class="read-more-span" href="#">
              read more
            </a>
          </p>
          <div className="hero-btns">
            <button className="read-more-btn">Read More</button>
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
