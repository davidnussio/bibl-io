import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSignInAlt } from 'react-icons/fa';
import { makeStyles } from '@material-ui/styles';
import { TableCell, TableRow, Chip, Avatar, withStyles, Button } from '@material-ui/core';

import { ShoppingCart } from '@material-ui/icons';
import Settore from './Settore';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

function BookList({ books }) {
  return (
    <Fragment>
      {books.length ? (
        books.map(item => {
          const listGroupItemProps = item.in_house ? {} : { className: 'light-gray-background' };
          return (
            <TableRow key={item.id} {...listGroupItemProps}>
              <TableCell>
                <Link to={item.in_house ? `/new/loan/${item.id}` : `/end/loan/${item.id}`}>
                  <Chip
                    icon={
                      <Avatar>
                        <ShoppingCart />
                      </Avatar>
                    }
                    color="primary"
                    label="Primary Clickable Chip"
                    clickable
                    variant="outlined"
                  />
                  {item.in_house ? <FaShoppingCart /> : <FaSignInAlt />}
                </Link>
              </TableCell>
              <TableCell>
                <Link to={`/book/${item.id}`} className="tour-titolo-libro">
                  <Button color="primary">{item.titolo}</Button>
                </Link>
              </TableCell>
              <TableCell>
                {item.nome} {item.cognome}
              </TableCell>
              <TableCell align="right">
                <Settore color={item.settore} />
              </TableCell>
            </TableRow>
            // <ListGroup.Item key={item.id} {...listGroupItemProps}>
            //   <Row>
            //     <Col xs={1} className="text-left">
            //       <Link to={item.in_house ? `/new/loan/${item.id}` : `/end/loan/${item.id}`}>
            //         {item.in_house ? <FaShoppingCart /> : <FaSignInAlt />}
            //       </Link>{' '}
            //       <span style={{ fontSize: '1rem' }}>
            //         <Badge pill>{item.id}</Badge>
            //       </span>
            //     </Col>
            //     <Col>
            //       <Link to={`/book/${item.id}`} className="tour-titolo-libro">
            //         {item.titolo}
            //       </Link>
            //     </Col>
            //     <Col>
            //       {item.nome} {item.cognome}
            //     </Col>
            //     <Col xs={1} className="text-right">
            //       <Settore color={item.settore} />
            //     </Col>
            //   </Row>
            // </ListGroup.Item>
          );
        })
      ) : (
        <TableRow>
          <TableCell rowSpan={3}>
            <h4>Nessun risultato</h4>
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  );
}

BookList.propTypes = { books: PropTypes.arrayOf.isRequired };

export default BookList;
