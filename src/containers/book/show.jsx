import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { number, string, object } from 'yup';
import { ListGroup, Row, Col, Button, Form } from 'react-bootstrap';
import { FaPen, FaArrowLeft, FaSave } from 'react-icons/fa';

import { Link, Prompt } from 'react-router-dom';
import * as api from '../../api';

function useForm({ data, schema, changedFieldClass = 'changed-field-value' }) {
  const [pristine, setPristine] = useState(null);
  const [fields, setFields] = useState({});

  function getData() {
    return Object.keys(fields).reduce(
      (prev, name) => ({ ...prev, [name]: fields[name].value }),
      {}
    );
  }

  function initialize(name, value) {
    return {
      onChange: event => {
        event.persist();
        setFields(prevFields => ({
          ...prevFields,
          [name]: {
            ...prevFields[name],
            value: event.target.value,
            className: value === event.target.value ? '' : changedFieldClass,
          },
        }));
      },
      value: value || '',
      className: '',
    };
  }

  useEffect(() => {
    console.warn('new data...');
    setFields(
      Object.keys(schema.describe().fields).reduce(
        (prev, name) => ({
          ...prev,
          [name]: {
            name,
            ...initialize(name, data[name]),
          },
        }),
        {}
      )
    );
  }, [data]);

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    const changedFields = Object.keys(fields).filter(key => fields[key].value !== data[key]);
    if (changedFields.length) {
      setPristine(false);
    } else {
      setPristine(true);
    }
  });

  return { fields, schema, pristine, getData };
}

export default function ShowBook({ history, match }) {
  const [book, setBook] = useState({});
  const [editing, setEditing] = useState(false);
  const form = useForm({
    data: book,
    schema: object().shape({
      titolo: string().required(),
      anno: string().required(),
      cognome: string().required(),
      collana: string(),
      difficolta: string(),
      editore: string(),
      genere: string(),
      id: number(),
      in_house: number().default(1),
      nome: string(),
      parole_chiave: string(),
      prezzo: string(),
      settore: string(),
    }),
  });

  console.log('form.fields', form.fields);

  useEffect(() => {
    if (editing === false && form.pristine === false) {
      const data = form.getData();
      console.log('form.getData', form.getData());
      form.schema
        .validate(data)
        .then(valid => {
          console.log('is form valid?', valid); // => true
          api.library.save(data);
        })
        .catch(function(err) {
          console.log(err); // 'ValidationError'
          api.library.save(data);
        });
    }
  }, [editing]);

  useEffect(() => {
    if (match.params.id) {
      api.library.get(match.params.id).then(setBook);
    } else {
      setEditing(true);
      setBook({});
    }
  }, [match.params.id]);

  return (
    <ListGroup>
      <Prompt
        when={editing && form.pristine === false}
        message={() => 'Attenzione, continuando le modifiche non salvate verranno perse!'}
      />

      <ListGroup.Item className="title">
        <Row>
          <Col xs={2} md={1}>
            <h4>
              <Button variant="light" size="sm" disabled={editing}>
                <Link to="/">
                  <FaArrowLeft />
                </Link>
              </Button>
            </h4>
          </Col>
          <Col>
            <h4>
              <b>{book.titolo}</b> <em>({book.id || 'Nuovo libro'})</em>
            </h4>
          </Col>
          <Col xs={1} className="text-right">
            <h4>
              <Button
                variant={editing ? 'danger' : 'light'}
                size="sm"
                onClick={() => setEditing(!editing)}
              >
                {editing ? <FaSave /> : <FaPen />}
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
          <Col>{editing ? <Form.Control type="text" {...form.fields.titolo} /> : book.titolo}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col sm={3} md={2}>
            <b>Autore</b>
          </Col>

          {editing ? (
            <Fragment>
              <Col>
                <Form.Control type="text" {...form.fields.nome} />
              </Col>
              <Col>
                <Form.Control type="text" {...form.fields.cognome} />
              </Col>
            </Fragment>
          ) : (
            <Col>
              {book.nome} {book.cognome}
            </Col>
          )}
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col sm={3} md={2}>
            <b>Collana</b>
          </Col>
          <Col>
            {editing ? <Form.Control type="text" {...form.fields.collana} /> : book.collana}
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col sm={3} md={2}>
            <b>Editore</b>
          </Col>
          <Col>
            {editing ? <Form.Control type="text" {...form.fields.editore} /> : book.editore}
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col sm={3} md={2}>
            <b>Difficoltà</b>
          </Col>
          <Col>
            {editing ? <Form.Control type="text" {...form.fields.difficolta} /> : book.difficolta}
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col sm={3} md={2}>
            <b>Genere</b>
          </Col>
          <Col>{editing ? <Form.Control type="text" {...form.fields.genere} /> : book.genere}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col sm={3} md={2}>
            <b>Settore</b>
          </Col>
          <Col>
            {editing ? <Form.Control type="text" {...form.fields.settore} /> : book.settore}
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col sm={3} md={2}>
            <b>Parole chiave</b>
          </Col>
          <Col>
            {editing ? (
              <Form.Control type="text" {...form.fields.parole_chiave} />
            ) : (
              book.parole_chiave
            )}
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col sm={3} md={2}>
            <b>Anno</b>
          </Col>
          <Col>{editing ? <Form.Control type="text" {...form.fields.anno} /> : book.anno}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col sm={3} md={2}>
            <b>Prezzo</b>
          </Col>
          <Col>{editing ? <Form.Control type="text" {...form.fields.prezzo} /> : book.prezzo}</Col>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  );
}

ShowBook.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.number.isRequired }) })
    .isRequired,
  history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
};
