import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {

    fetch("https://movie-api-5rhq.onrender.com/movies")

      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((singleMovie) => {
          return {
            _id: singleMovie._id,
            Title: singleMovie.Title,
            Description: singleMovie.Description,
            Genre: singleMovie.Genre,
            Director: singleMovie.Director,
            ImagePath: singleMovie.ImagePath,
            Featured: singleMovie.Featured,
          };
          });
        setMovies(moviesFromApi);
      });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>

      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
