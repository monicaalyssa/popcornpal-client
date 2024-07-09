export const MovieView = ({ movieprop, onBackClick }) => {
  return (
    <div>
      <div>
        <img className="poster" src={movieprop.image} />
      </div>
      <div>
        <span className="heading">{movieprop.title}</span>
      </div>
      <div>
        <span className="subtitle">Director</span>
        <br></br>
        <span>{movieprop.director}</span>
      </div>
      <button className="go-back-btn" onClick={onBackClick}>
        Go Back
      </button>
    </div>
  );
};
