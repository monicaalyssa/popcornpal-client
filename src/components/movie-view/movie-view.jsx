export const MovieView = ({ movieprop, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movieprop.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movieprop.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movieprop.director}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
