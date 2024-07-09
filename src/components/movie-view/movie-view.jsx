export const MovieView = ({ movies }) => {
  return (
    <div>
      <div>
        <img src={movies.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movies.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movies.author}</span>
      </div>
    </div>
  );
};
