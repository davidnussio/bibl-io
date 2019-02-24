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
    console.log('_DEBUG_QUERY_', whereClause);
    const limitClause = `LIMIT ${itemPerPage * (activePage - 1)},${itemPerPage}`;
    Promise.all([countBooks(whereClause), findBooks(whereClause, limitClause)])
      .then(([numRows, books]) => {
        resolve({ numRows: numRows[0]['COUNT(*)'], books });
      })
      .catch(reject);
  });
}

function create() {}

export default { find, create };
