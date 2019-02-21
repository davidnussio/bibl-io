import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ListGroupItem,
  Container,
  Row,
  Col,
  InputGroup,
  Button,
  FormControl,
} from 'react-bootstrap';
import { FaEraser } from 'react-icons/fa';
import Select, { components } from 'react-select';
import Settore from './Settore';

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

const Option = props => (
  <components.Option {...props}>
    {props.data.label === 'Tutti i settori' ? (
      <span>Tutti i settori</span>
    ) : (
      <span>
        <Settore color={props.data.value} /> {capitalize(props.data.label)}
      </span>
    )}
  </components.Option>
);

const SearchBar = ({
  filterType,
  onChangeFilterType,
  filterSector,
  onChangeFilterSector,
  onFreeTextSearch,
  freeTextSearch,
}) => (
  <ListGroupItem>
    <Row>
      <Col sm={3} md={2}>
        <Select
          searchable={false}
          clearable={false}
          value={filterType}
          options={[
            { label: 'Tutti', value: 0 },
            { label: 'In biblioteca', value: 1 },
            { label: 'In prestito', value: 2 },
          ]}
          onChange={onChangeFilterType}
        />
      </Col>
      <Col sm={3} md={2}>
        <Select
          className="react-select-container"
          searchable={false}
          clearable={false}
          value={filterSector}
          options={['Tutti i settori', 'azzurro', 'verde', 'giallo', 'rosso', 'viola'].map(i => ({
            label: i,
            value: i,
          }))}
          components={{ Option }}
          onChange={onChangeFilterSector}
        />
      </Col>
      <Col md={2} />
      <Col sm={6} md={6}>
        <InputGroup className="serach-book-input">
          <FormControl
            style={freeTextSearch ? { background: '#0288D1', color: 'white' } : {}}
            type="text"
            placeholder="Cerca..."
            value={freeTextSearch}
            onChange={event => onFreeTextSearch(event.target.value)}
          />
          <InputGroup.Append>
            <Button variant="outline-dark" onClick={() => onFreeTextSearch('')}>
              <FaEraser />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Col>
    </Row>
  </ListGroupItem>
);

SearchBar.propTypes = {
  filterType: PropTypes.number,
  onChangeFilterType: PropTypes.func,
};

SearchBar.defaultProps = {
  filterType: 0,
  onChangeFilterType: () => {},
};

export default SearchBar;
