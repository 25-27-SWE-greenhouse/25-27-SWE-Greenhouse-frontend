/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
// import PropTypess from 'prop-types'
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>The Greenest Green House IN THE WORLD</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/indoorPlants">
              <Nav.Link>Indoor</Nav.Link>
            </Link>
            <Link passHref href="/">
              <Nav.Link>Outside</Nav.Link>
            </Link>
            <Link passHref href="/">
              <Nav.Link>Succulent</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link>Profile</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// NavBar.PropTypes = {
//   user: PropTypes.shape({
//     displayName: PropTypes.string,
//     photoURL: PropTypes.string,
//   }).isRequired,
// };
