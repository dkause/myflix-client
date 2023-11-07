/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'

export const MovieView = ({ movies }) => {
  console.log('movies', movies)
  const { movieId } = useParams()
  console.log('movie-view', movieId)
  const movie = movies.find((b) => b._id === movieId)
  console.log('movie', movie)
  if (!movie) {
    // Handle the case where the movie is not found or undefined
    return <div>Movie not found</div>
  }
  return (
      <>

          <Col lg={6} md={12}>
            <Image className='mt-4' rounded src={movie.ImagePath}
            style={{ width: '100%', height: '400' }}
            alt= {movie.Title}
            />
          </Col>

        <Col lg={6} md={12}>
          <h3 className='mt-4'>
            <span>Title: </span>
            <span>{movie.Title}</span>
          </h3>
          <div>
            <span>Description: </span>
            <span>{movie.Description}</span>
          </div>
          <div>
            <span>Genre: </span>
            <span>{movie.Genre.Name}</span>
          </div>
          <div className='mb-3'>
            <span>Director: </span>
            <span>{movie.Director.Name}</span>
          </div>
          <Link to={'/'}>
          <Button>Back</Button>
          </Link>
        </Col>
      </>
  )
}

MovieView.propTypes = {
  movies: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired
      // Death: PropTypes.string.isRequired
    }),
    Featured: PropTypes.bool.isRequired
  }).isRequired
}
