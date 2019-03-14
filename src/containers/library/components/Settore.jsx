import React from 'react';
import { Badge } from 'react-bootstrap';
import { Icon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  lightblu: { color: '#84D7FF' },
  red: { color: '#FF4844' },
  purple: { color: '#D8A9FF' },
  green: { color: '#72C86D' },
  yellow: { color: '#FFE258' },
});

const Settore = ({ color, classes }) => {
  switch ((color || '').toLowerCase()) {
    case 'azzurro':
      return <Icon className={classes.lightblu}>lens</Icon>;
    case 'rosso':
      return <Icon className={classes.red}>lens</Icon>;
    case 'verde':
      return <Icon className={classes.green}>lens</Icon>;
    case 'giallo':
      return <Icon className={classes.yellow}>lens</Icon>;
    case 'viola':
      return <Icon className={classes.purple}>lens</Icon>;
    default:
      return <div />;
  }
};

export default withStyles(styles)(Settore);
