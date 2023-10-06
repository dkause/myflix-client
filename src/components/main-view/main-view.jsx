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
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            ImagePath: movie.ImagePath,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name
            },
            Director: {
              Name: movie.Director.name
            },
            Featured: movie.Featured
          };
        });
     

    setMovies(moviesFromApi);
    // console.log("Movies from my Render API:", data);   
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
        movieData={movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}
      />
    ))}
  </div>
);
};
