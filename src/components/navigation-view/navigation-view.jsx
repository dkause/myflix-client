import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const NavigationView = ({ user: userProp, onLoggedOut }) => {
  console.log('user in NavigationView', userProp)
  const location = useLocation()
  const [user, setUser] = useState(userProp)
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container><Row>
<Col>
        <Navbar.Brand className='logo'><i className="bi bi-play-circle-fill"></i>MyFlix</Navbar.Brand>
</Col>
      </Row>
      <Row>
  <Col>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='me-auto'>
        {!user && (
          <>
            {location.pathname === '/signup' && (
              <Nav.Link as={Link} to='/login'>
                <Button>
                  <i className='bi bi-box-arrow-in-left'></i>Login
                </Button>
              </Nav.Link>
            )}
            {location.pathname === '/login' && (
              <Nav.Link as={Link} to='/signup'>
                <Button className='btn btn-info'>
                  <i className='bi bi-person-fill-add'></i> SignUp
                </Button>
              </Nav.Link>
            )}
          </>
        )}
          {user && (
          <>
            <Nav.Link as={Link} to='/'>
              <i className='bi bi-film'></i>All Movies
            </Nav.Link>
            <Nav.Link as={Link} to='/profile'>
              <i className='bi bi-person'></i>My Profile
            </Nav.Link>
            <Nav.Link as={Link} to='/' onClick={onLoggedOut}>
              <i className='bi bi-escape'></i>Logout
            </Nav.Link>
          </>
          )}
      </Nav>
    </Navbar.Collapse>
  </Col>
</Row>

      </Container>
    </Navbar>
  )
}

NavigationView.propTypes = {
  // user: PropTypes.object.isRequired,
  // onLoggedOut: PropTypes.func.isRequired
}
