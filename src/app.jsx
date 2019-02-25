import React, { Fragment } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Jumbotron, Button } from 'react-bootstrap';
import LibraryPage from './containers/library';
import BookPage from './containers/book';
// import UsersPage from './containers/users';
import HeaderMenu from './components/HeaderMenu';

export default function Application() {
  return (
    <Router>
      <Fragment>
        <Route path="/" component={HeaderMenu} />
        <Switch>
          <Route path="/" exact component={LibraryPage} />
          <Route path="/book" component={BookPage} />
          {/* <Route path="/users" component={UsersPage} /> */}
          <Route
            component={({ location }) => (
              <Jumbotron>
                <h1>
                  <span role="img" aria-label="Faccina che piange">
                    😭
                  </span>{' '}
                  This page is not ready yet
                </h1>
                <p>This project want to upgrade the old one with new electron boilerplate.</p>
                <p>
                  <pre>
                    Location pathname: <b>{location.pathname}</b>
                  </pre>
                </p>
                <p>
                  <Button
                    variant="primary"
                    onClick={() => window.open('https://github.com/davidnussio/bibl-io', '_blank')}
                  >
                    Learn more
                  </Button>
                </p>
              </Jumbotron>
            )}
          />
        </Switch>
      </Fragment>
    </Router>
  );
}
