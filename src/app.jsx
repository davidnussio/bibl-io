import React, { Fragment } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// import 'roboto-fontface/css/roboto/roboto-fontface.css';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import LibraryPage from './containers/library';
import BookPage from './containers/book';
// import UsersPage from './containers/users';
import HeaderMenu from './components/HeaderMenu';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

export default function Application() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Fragment>
          <Route path="/" component={HeaderMenu} />
          <Switch>
            <Route path="/" exact component={LibraryPage} />
            <Route path="/book" component={BookPage} />
            {/* <Route path="/users" component={UsersPage} /> */}
            <Route
              component={({ location }) => (
                <div>
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
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        window.open('https://github.com/davidnussio/bibl-io', '_blank')
                      }
                    >
                      Learn more
                    </Button>
                  </p>
                </div>
              )}
            />
          </Switch>
        </Fragment>
      </Router>
    </MuiThemeProvider>
  );
}
