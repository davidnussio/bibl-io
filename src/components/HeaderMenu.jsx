import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import { getLoanStats } from '../api';

export default function HeaderMenu({ location }) {
  const [lightTheme, setLightTheme] = useState(0);
  useEffect(() => {
    document.getElementById('bootstrap-theme').href = `bootstrap-${lightTheme}.css`;
  }, [lightTheme]);
  return (
    <div style={{ zIndex: '100', position: 'sticky', top: '0' }}>
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto" activeKey={location.pathname}>
          <Nav.Link href="/" as={Link} to="/" disabled={location.pathname === '/'}>
            Biblioteca
          </Nav.Link>
          <Nav.Link href="/loans" as={Link} to="/loans" disabled={location.pathname === '/loans'}>
            Prestiti{' '}
            <Badge pill variant="info">
              {100}
            </Badge>
            {' / '}
            <Badge pill variant="danger">
              {25}
            </Badge>
          </Nav.Link>
          <Nav.Link href="/users" as={Link} to="/users" disabled={location.pathname === '/users'}>
            Utenti
          </Nav.Link>
          <Nav.Item>
            <Button onClick={() => setLightTheme((lightTheme + 1) % 7)}>Next theme</Button>
          </Nav.Item>
        </Nav>
        <Nav className="justify-content-end" activeKey={location.pathname}>
          <Nav.Link as={Link} to="/book">
            Registra nuovo libro
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

HeaderMenu.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};
