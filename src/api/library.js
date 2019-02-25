import db, { cpsResolve } from './database';

function findBooks(whereClause, limitClause) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM biblioteca, biblioteca_idx ${whereClause} ${limitClause}`,
      cpsResolve(resolve, reject)
    );
  });
}

function countBooks(whereClause) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT COUNT(*) FROM biblioteca, biblioteca_idx ${whereClause}`,
      cpsResolve(resolve, reject)
    );
  });
}

function get(id) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM biblioteca WHERE id = ?`, id, cpsResolve(resolve, reject));
  });
}

function save(book) {
  if (book.id) {
    console.warn('Need to be implemented, update data:', book);
  } else {
    console.warn('Need to be implemented, insert data:', book);
  }
}

function find(activePage, itemPerPage, query = [], ftsValue = '') {
  return new Promise((resolve, reject) => {
    query.push('biblioteca.id = biblioteca_idx.rowid');
    if (ftsValue) {
      query.push(
        `biblioteca_idx MATCH '${ftsValue
          .split(' ')
          .map(term => term.replace(/[^a-z0-9]+/gi, ''))
          .filter(term => term)
          .map(term => `${term}*`)
          .join(' ')}'`
      );
    }
    const whereClause = query.length ? `WHERE ${query.join(' AND ')}` : '';
    const limitClause = `LIMIT ${itemPerPage * (activePage - 1)},${itemPerPage}`;
    Promise.all([countBooks(whereClause), findBooks(whereClause, limitClause)])
      .then(([numRows, books]) => {
        resolve({ numRows: numRows[0]['COUNT(*)'], books });
      })
      .catch(reject);
  });
}

function create() {}

export default { get, find, create, save };
