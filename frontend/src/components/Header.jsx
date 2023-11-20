import React from 'react'
import {Container, Navbar,Nav, NavDropdown,Badge} from 'react-bootstrap'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useSelector,useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


const Header = () => {
  const {userInfo} = useSelector((state) => state.auth)
  const [logoutApiCall] =useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {logoutHandler} = async() =>{
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <header>
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <Container>
        <LinkContainer to ='/'>
          <Navbar.Brand>MERN App</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
            {userInfo ? (
              <>
              <NavDropdown title={userInfo.name} id={username}>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>
                    Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              </>
            ) : (
              <>
              <LinkContainer to='/login'>
                <Nav.Link >
                  <FaSignInAlt /> Sign In
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/register'>
                <Nav.Link >
                  <FaSignOutAlt /> Sign Up
                </Nav.Link>
              </LinkContainer>
              </>
            )}
              
              
            </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
  )
}

export default Header