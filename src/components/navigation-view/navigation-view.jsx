import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export const NavigationView = ({ user, onLoggedOut }) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className='logo'><i className="bi bi-tv"></i>MyFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            {!user && (
              <>
                <Nav.Link as={Link} to='/login'>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to='/signup'>SignUp</Nav.Link>
              </>
            )}
            {user && (
              <><Nav.Link as={Link} to='/'><i className='bi bi-film'></i>All Movies</Nav.Link>
                <Nav.Link as={Link} to='/profile'><i className='bi bi-person'></i>My Profile</Nav.Link>
                <Nav.Link as={Link} to='/' onClick={onLoggedOut}><i className='bi bi-escape'></i>
                Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  )
}

NavigationView.propTypes = {
  user: PropTypes.object.isRequired,
  onLoggedOut: PropTypes.func.isRequired
}
