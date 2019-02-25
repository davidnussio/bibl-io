import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSignInAlt } from 'react-icons/fa';
import Settore from './Settore';

export default function BookList({ books }) {
  return (
    <Fragment>
      {books.length ? (
        books.map(item => {
          const listGroupItemProps = item.in_house ? {} : { className: 'light-gray-background' };
          return (
            <ListGroup.Item key={item.id} {...listGroupItemProps}>
              <Row>
                <Col xs={1} className="text-left">
                  <Link to={item.in_house ? `/new/loan/${item.id}` : `/end/loan/${item.id}`}>
                    {item.in_house ? <FaShoppingCart /> : <FaSignInAlt />}
                  </Link>{' '}
                  <span style={{ fontSize: '1rem' }}>
                    <Badge pill>{item.id}</Badge>
                  </span>
                </Col>
                <Col>
                  <Link to={`/book/${item.id}`} className="tour-titolo-libro">
                    {item.titolo}
                  </Link>
                </Col>
                <Col>
                  {item.nome} {item.cognome}
                </Col>
                <Col xs={1} className="text-right">
                  <Settore color={item.settore} />
                </Col>
              </Row>
            </ListGroup.Item>
          );
        })
      ) : (
        <ListGroup.Item className="text-center">
          <h4>Nessun risultato</h4>
        </ListGroup.Item>
      )}
    </Fragment>
  );
}

BookList.propTypes = { books: PropTypes.arrayOf.isRequired };
