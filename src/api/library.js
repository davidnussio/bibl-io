import db, { cpsResolve } from './database';

function findBooks(whereClause, limitClause) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM biblioteca ${whereClause} ${limitClause}`, cpsResolve(resolve, reject));
  });
}

function countBooks(whereClause) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT COUNT(*) FROM biblioteca ${whereClause}`, cpsResolve(resolve, reject));
  });
}

function find(activePage, itemPerPage, query = []) {
  return new Promise((resolve, reject) => {
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

export default { find, create };
