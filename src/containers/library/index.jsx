import React, { useState, useEffect } from 'react';
import { ListGroup, Row, Col, Container } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import FooterPaginator from '../../components/FooterPaginator';
import * as api from '../../api';

export default function Library() {
  const [state, setState] = useState({
    books: [],
    activePage: 1,
    itemsPerPage: 10,
    numRows: 0,
    filterType: { label: 'Tutti', value: 0 },
    filterSector: { label: 'Tutti i settori', value: 'Tutti i settori' },
    freeTextSearch: '',
    queries: { filterTypeQuery: undefined, filterSectorQuery: undefined },
  });

  useEffect(() => {
    api.library.get(
      state.activePage,
      state.itemsPerPage,
      (books, numRows) => setState(prevState => ({ ...prevState, books, numRows })),
      Object.entries(state.queries)
        .filter(([_, value]) => value)
        .map(value => value[1])
    );
  }, [state.activePage, state.itemsPerPage, state.queries]);

  const onChangePagination = activePage => setState(prevState => ({ ...prevState, activePage }));

  const onChangeFilterType = filterType => {
    const filtersQuery = {
      0: '',
      1: 'in_house = 1',
      2: 'in_house = 0',
    };
    const filterTypeQuery = filtersQuery[filterType.value];
    setState(prevState => ({
      ...prevState,
      activePage: 1,
      filterType,
      queries: { ...state.queries, filterTypeQuery },
    }));
  };

  const onChangeFilterSector = filterSector => {
    const filterSectorQuery =
      filterSector.value && filterSector.value !== 'Tutti i settori'
        ? `settore = '${filterSector.value}'`
        : '';
    setState(prevState => ({
      ...prevState,
      activePage: 1,
      filterSector,
      queries: { ...state.queries, filterSectorQuery },
    }));
  };

  const onFreeTextSearch = value => {
    const freeTextSearchQuery = value
      ? `(${value
          .split(' ')
          .map(term => `titolo LIKE '%${term}%'`)
          .join(' AND ')})`
      : '';
    setState(prevState => ({
      ...prevState,
      activePage: 1,
      freeTextSearch: value,
      queries: { ...state.queries, freeTextSearchQuery },
    }));
  };

  const {
    books,
    activePage,
    itemsPerPage,
    numRows,
    filterType,
    filterSector,
    freeTextSearch,
  } = state;

  return (
    <ListGroup>
      <SearchBar
        onChangeFilterType={onChangeFilterType}
        filterType={filterType}
        filterSector={filterSector}
        onChangeFilterSector={onChangeFilterSector}
        onFreeTextSearch={onFreeTextSearch}
        freeTextSearch={freeTextSearch}
      />
      <ListGroup.Item style={{ background: '#0288D1', color: '#ffffff' }}>
        <Row>
          <Col xs={2}>
            <h4>&nbsp;</h4>
          </Col>
          <Col>
            <h4>Titolo</h4>
          </Col>
          <Col>
            <h4>Autore</h4>
          </Col>
          <Col xs={1}>
            <h4>&nbsp;</h4>
          </Col>
        </Row>
      </ListGroup.Item>
      <BookList books={books} />
      {books.length ? (
        <ListGroup.Item>
          <Row>
            <Col className="text-right" md={10}>
              <FooterPaginator
                items={numRows}
                itemsPerPage={itemsPerPage}
                activePage={activePage}
                onChange={onChangePagination}
              />
            </Col>

            <Col md={2} className="text-right">
              <i>Trovati {numRows} libri. </i>
            </Col>
          </Row>
        </ListGroup.Item>
      ) : (
        undefined
      )}
    </ListGroup>
  );
}
