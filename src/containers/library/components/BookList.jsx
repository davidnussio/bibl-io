import React, { Component, Fragment } from 'react';
import { ListGroup, Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSignInAlt } from 'react-icons/fa';
import Settore from './Settore';

const LoanButtonState = ({ book, action }) => {
  const otherClass = book.in_house ? '' : ' info';
  return (
    <span style={{ float: 'left' }}>
      <Link to={action}>{book.in_house ? <FaShoppingCart /> : <FaSignInAlt />}</Link>
    </span>
  );
};

class BookList extends Component {
  render() {
    const { books } = this.props;
    return (
      <Fragment>
        {books.length ? (
          books.map(item => {
            const listGroupItemProps = item.in_house ? {} : { className: 'lightgrayBackground' };
            return (
              <ListGroup.Item key={item.id} {...listGroupItemProps}>
                <Row>
                  <Col xs={2} className="text-left">
                    <LoanButtonState
                      book={item}
                      action={item.in_house ? `/new/loan/${item.id}` : `/end/loan/${item.id}`}
                    />
                    {' - '}
                    <Badge variant="light">{item.id}</Badge>
                  </Col>
                  <Col>
                    <Link to={`/show/book/${item.id}`} className="tour-titolo-libro">
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
}

export default BookList;
