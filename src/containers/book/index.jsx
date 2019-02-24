import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Row, Col, Button } from 'react-bootstrap';
import { FaPen, FaArrowLeft } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import * as api from '../../api';

export default function Book({ history, match }) {
  const [book, setBook] = useState({});

  useEffect(() => {
    if (match.params.id) {
      api.library.get(match.params.id).then(setBook);
    } else {
      history.goBack();
    }
  }, [match.params.id]);

  return (
    <ListGroup>
      <ListGroup.Item className="title">
        <Row>
          <Col xs={2} md={1}>
            <h4>
              <Button variant="light" size="sm">
                <Link to="/">
                  <FaArrowLeft />
                </Link>
              </Button>
            </h4>
          </Col>
          <Col>
            <h4>
              <b>{book.titolo}</b> <em>({book.id})</em>
            </h4>
          </Col>
          <Col xs={1} className="text-right">
            <h4>
              <Button variant="light" size="sm" href={`#/edit/book/${book.id}`}>
                <FaPen />
              </Button>
            </h4>
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col sm={3} md={2}>
            <b>N°</b>
          </Col>
          <Col>{book.id}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col sm={3} md={2}>
            <b>Titolo</b>
          </Col>
          <Col>{book.titolo}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col sm={3} md={2}>
            <b>Autore</b>
          </Col>
          <Col>
            {book.nome} {book.cognome}
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col sm={3} md={2}>
            <b>Collana</b>
          </Col>
          <Col>{book.collana}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col sm={3} md={2}>
            <b>Editore</b>
          </Col>
          <Col>{book.editore}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col sm={3} md={2}>
            <b>Difficoltà</b>
          </Col>
          <Col>{book.difficolta}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col sm={3} md={2}>
            <b>Genere</b>
          </Col>
          <Col>{book.genere}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col sm={3} md={2}>
            <b>Settore</b>
          </Col>
          <Col>{book.settore}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col sm={3} md={2}>
            <b>Parole chiave</b>
          </Col>
          <Col>{book.parole_chiave}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col sm={3} md={2}>
            <b>Prezzo</b>
          </Col>
          <Col>{book.prezzo}</Col>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  );
}

Book.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.number.isRequired }) })
    .isRequired,
  history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
};
