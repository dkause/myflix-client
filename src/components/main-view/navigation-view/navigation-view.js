import PropTypes from 'prop-types'

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export const NavigationView = ({ user, onLoggedOut }) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        {!user && (
                            <>
                                                            </>
                        )}
                        {user && (
                            <>

                                <Nav.Link onClick={onLoggedOut}>
                                    Logout
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
        {/* <Button variant='warning' onClick={() => { user(null); setToken(null); localStorage.clear() }}>Logout</Button> */}

      </Container>
    </Navbar>
  )
}

NavigationView.propTypes = {
  user: PropTypes.string.isRequired,
  onLoggedOut: PropTypes.func.isRequired
}
