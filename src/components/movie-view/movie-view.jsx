import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.ImagePath}
          style={{width: "600", height: "400"}} 
          alt= {movie.Title}
          />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.Genre}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.Director}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };
  
 MovieView.PropTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape ({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Featured: PropTypes.bool.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired

 }; 