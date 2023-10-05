import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([

    {
      id: 1,

      Title: "Silence of the Lambs",

      Description: "To catch a serial killer, a yound FBI cadet seeks the help of an incarcerated and manipulative cannibal killer.",

      Genre: "Thriller",

      Director: "Jonathan Demme",

      ImagePath: "https://placehold.co/600x400",

      Featured: true
    },

    {
      id: 2,

      Title: "Star Wars: Episode IV - A New Hope",

      Description: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",

      Genre: "Fantasy",

      Director: "George Lucas",

      ImagePath: "https://placehold.co/600x400",

      Featured: true
    },

    {
      id: 3,

      Title: "Star Wars: Episode X – The Rose of Skywalker",

      Description: "In the riveting conclusion of the landmark Skywalker saga, Luke finally finds his peace in becoming a gardrner.",

      Genre: "Fantasy",

      Director: "J.J. Abrams",

      ImagePath: "https://placehold.co/600x400",

      Featured: true
    },

  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
          key={movie.id}
          movieData={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
