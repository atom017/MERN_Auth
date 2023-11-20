import React from 'react'
import {Container, Navbar,Nav} from 'react-bootstrap'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const Test = () => {
  return (
    <header>
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <Container>
        <Navbar.Brand href='/'>MERN App</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link href='/login'>
                <FaSignInAlt /> Sign In
              </Nav.Link>
              <Nav.Link href='/login'>
                <FaSignOutAlt /> Sign Up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
  )
}

export default Test