import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

const PagesButtons = ({ pages, activePage, boundaryButtons, onChange }) => {
  const results = [];
  const firstPage = Math.max(1, activePage - boundaryButtons);
  const lastPage = Math.min(pages, activePage + boundaryButtons);
  for (let i = firstPage; i <= lastPage; i += 1) {
    results.push(
      <Pagination.Item key={i} onClick={() => onChange(i)} active={i === activePage}>
        {i}
      </Pagination.Item>
    );
  }
  return results;
};
export default function FooterPaginator({ items, activePage, itemsPerPage, maxButtons, onChange }) {
  const pages = Math.ceil(items / itemsPerPage);
  const boundaryButtons = Math.floor(maxButtons / 2) - 1;
  const hasPrevEllipsis = !(activePage - boundaryButtons <= 1);
  const hasNextEllipsis = !(activePage + boundaryButtons >= pages);
  return (
    <Pagination>
      <Pagination.First onClick={() => onChange(1)} />
      <Pagination.Prev disabled={activePage <= 1} onClick={() => onChange(activePage - 1)} />
      {hasPrevEllipsis ? (
        <Fragment>
          <Pagination.Item onClick={() => onChange(1)}>{1}</Pagination.Item>
          <Pagination.Ellipsis />
        </Fragment>
      ) : (
        ''
      )}

      <PagesButtons
        pages={pages}
        activePage={activePage}
        boundaryButtons={boundaryButtons}
        onChange={onChange}
      />

      {hasNextEllipsis ? (
        <Fragment>
          <Pagination.Ellipsis />
          <Pagination.Item onClick={() => onChange(pages)}>{pages}</Pagination.Item>
        </Fragment>
      ) : (
        ''
      )}
      <Pagination.Next disabled={activePage >= pages} onClick={() => onChange(activePage + 1)} />
      <Pagination.Last onClick={() => onChange(pages)} />
    </Pagination>
  );
}

FooterPaginator.propTypes = {
  items: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number,
  maxButtons: PropTypes.number,
  onChange: PropTypes.func,
};

FooterPaginator.defaultProps = {
  itemsPerPage: 10,
  maxButtons: 10,
  onChange: () => {},
};
