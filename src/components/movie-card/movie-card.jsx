export const MovieCard = ({ movieprop, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movieprop);
      }}
    >
      {movieprop.title}
    </div>
  );
};
