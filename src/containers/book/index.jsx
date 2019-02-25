import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import ShowBook from './show';

export default function Book({ location, history, match }) {
  return (
    <Switch>
      <Route path={`${match.url}/:id?`} component={ShowBook} />;
    </Switch>
  );
}

Book.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.number.isRequired }) })
    .isRequired,
  history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
};
