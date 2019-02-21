import React from 'react';
import { Badge } from 'react-bootstrap';

const Settore = ({ color }) => {
  switch ((color || '').toLowerCase()) {
    case 'azzurro':
      return (
        <Badge pill style={{ backgroundColor: '#84D7FF' }}>
          &nbsp;
        </Badge>
      );
    case 'rosso':
      return (
        <Badge pill style={{ backgroundColor: '#FF4844' }}>
          &nbsp;
        </Badge>
      );
    case 'verde':
      return (
        <Badge pill style={{ backgroundColor: '#72C86D' }}>
          &nbsp;
        </Badge>
      );
    case 'giallo':
      return (
        <Badge pill style={{ backgroundColor: '#FFE258' }}>
          &nbsp;
        </Badge>
      );
    case 'viola':
      return (
        <Badge pill style={{ backgroundColor: '#D8A9FF' }}>
          &nbsp;
        </Badge>
      );
    default:
      return <div />;
  }
};

export default Settore;
