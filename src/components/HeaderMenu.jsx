import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AppBar, Typography, Button, Toolbar, Tabs, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  grow: {
    flexGrow: 1,
  },
};

function LinkTab(props) {
  return <Tab component={Link} {...props} />;
}

const getUrlIndex = pathname => {
  console.log(pathname);
  switch (pathname.split('/')[1]) {
    case '':
    case 'book':
      return 0;
    case 'loans':
      return 1;
    case 'users':
      return 2;
    default:
      return -1;
  }
};
const HeaderMenu = ({ location, classes }) => {
  return (
    <div>
      <AppBar position="sticky">
        <Tabs
          className={classes.tabs}
          value={getUrlIndex(location.pathname)}
          onChange={(event, to) => console.log(event, to)}
        >
          <LinkTab label="Biblioteca" to="/" />
          <LinkTab label="Prestiti" to="/loans" />
          <LinkTab label="Utenti" to="/users" />
          <div className={classes.grow} />
          <Button color="inherit">Registra nuovo libro</Button>
        </Tabs>
        {/* <Navbar bg="dark" variant="dark">
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
        </Nav>
        <Nav className="justify-content-end" activeKey={location.pathname}>
          <Nav.Link as={Link} to="/book">
            Registra nuovo libro
          </Nav.Link>
        </Nav>
      </Navbar> */}
      </AppBar>
    </div>
  );
};

HeaderMenu.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default withStyles(styles)(HeaderMenu);
