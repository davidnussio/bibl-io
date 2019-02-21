import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import { getLoanStats } from '../api';

export default function HeaderMenu({ location }) {
  return (
    <div style={{ zIndex: '100', position: 'sticky', top: '0' }}>
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto" activeKey={location.pathname}>
          <Nav.Link href="/" as={Link} to="/" disabled={location.pathname === '/'}>
            Biblioteca
          </Nav.Link>
          <Nav.Link href="/loans" as={Link} to="/loans" disabled={location.pathname === '/loans'}>
            <Badge className="alert-info">{100}</Badge>
            Prestiti
            <Badge className="alert-danger">{12}</Badge>
          </Nav.Link>
          <Nav.Link href="/users" as={Link} to="/users" disabled={location.pathname === '/users'}>
            Utenti
          </Nav.Link>
        </Nav>
        <Nav className="justify-content-end" activeKey={location.pathname}>
          <Nav.Link as={Link} to="/edit/book">
            Registra nuovo libro
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

HeaderMenu.propTypes = {
  location: PropTypes.object,
};
