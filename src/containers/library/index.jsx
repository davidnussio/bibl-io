import React, { useState, useEffect } from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
} from '@material-ui/core';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import FooterPaginator from '../../components/FooterPaginator';
import * as api from '../../api';
import MBookList from './components/MBookList';

export default function Library() {
  const [state, setState] = useState({
    books: [],
    activePage: 0,
    itemsPerPage: 10,
    numRows: 0,
    filterType: { label: 'Tutti', value: 0 },
    filterSector: { label: 'Tutti i settori', value: 'Tutti i settori' },
    freeTextSearch: '',
    queries: {
      column: { filterTypeQuery: undefined, filterSectorQuery: undefined },
      fts: { freeTextSearchQuery: undefined },
    },
  });

  useEffect(() => {
    api.library
      .find(
        state.activePage + 1,
        state.itemsPerPage,
        Object.entries(state.queries.column)
          .filter(([_, value]) => value)
          .map(value => value[1]),
        state.queries.fts.freeTextSearchQuery
      )
      .then(({ books, numRows }) => setState(prevState => ({ ...prevState, books, numRows })))
      .catch(err => console.error('errore...', err));
  }, [state.activePage, state.itemsPerPage, state.queries]);

  const onChangePagination = (event, activePage) =>
    setState(prevState => ({ ...prevState, activePage }));

  const onChangeFilterType = filterType => {
    const filtersQuery = {
      0: '',
      1: 'in_house = 1',
      2: 'in_house = 0',
    };
    const filterTypeQuery = filtersQuery[filterType.value];
    setState(prevState => ({
      ...prevState,
      activePage: 0,
      filterType,
      queries: { ...state.queries, column: { ...state.queries.column, filterTypeQuery } },
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
      queries: { ...state.queries, column: { ...state.queries.column, filterSectorQuery } },
    }));
  };

  const onFreeTextSearch = freeTextSearch => {
    setState(prevState => ({
      ...prevState,
      activePage: 0,
      freeTextSearch,
      queries: {
        ...state.queries,
        fts: { ...state.queries.fts, freeTextSearchQuery: freeTextSearch },
      },
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
    <Paper elevation={1}>
      <SearchBar
        onChangeFilterType={onChangeFilterType}
        filterType={filterType}
        filterSector={filterSector}
        onChangeFilterSector={onChangeFilterSector}
        onFreeTextSearch={onFreeTextSearch}
        freeTextSearch={freeTextSearch}
      />
      <Table>
        <TableHead className="title">
          <TableRow>
            <TableCell />
            <TableCell>Titolo</TableCell>
            <TableCell>Autore</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <MBookList books={books} />
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={4}
              count={numRows}
              rowsPerPage={itemsPerPage}
              page={activePage}
              onChangePage={onChangePagination}
              onChangeRowsPerPage="this.handleChangeRowsPerPage"
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  );
}
