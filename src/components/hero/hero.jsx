export const Hero = () => {
  return (
    <div className="hero-container">
      <img className="hero-img" src={require("../../images/avatar-bkg.jpg")} />
      <div className="hero-text">
        <div className="left-hero">
          <p className="hero-duration">Duration: 3h12m • Action</p>
          <h1 className="hero-title">Avatar: The Way of Water</h1>
          <p className="hero-desc">On the lush alien world of Pandora live the Na'vi, beings who appear primitive but are highly<span className="dots">...</span><span className="hero-more-desc"> evolved. Because the planet's environment is poisonous, human/Na'vi hybrids, called Avatars, must link...</span></p>
          <button>Read More</button>
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
