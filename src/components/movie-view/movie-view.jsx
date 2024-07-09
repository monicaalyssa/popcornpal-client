export const MovieView = ({ movieprop, onBackClick }) => {
  return (
    <div>
      <div>
        <img className="poster" src={movieprop.image} />
      </div>
      <div>
        <h1 className="heading">{movieprop.title}</h1>
      </div>
      <div>
        <h2>Director</h2>
        <span>{movieprop.director}</span>
      </div>
      <button onClick={onBackClick}>
        Go Back
      </button>
    </div>
  );
};
