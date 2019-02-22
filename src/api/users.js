import db, { cpsResolve } from './database';

function expiredLoan() {
  return new Promise((resolve, reject) => {
    const expiredLoanIndex = {};
    db.each(
      `SELECT user_id, book_id, json FROM loans WHERE todate < date('now') AND ended is null`,
      (err, expiredLoan) => {
        if (err) {
          reject(err);
        }
        expiredLoanIndex[expiredLoan.user_id] = true;
      },
      () => void cpsResolve(resolve, reject)(err, expiredLoanIndex)
    );
  });
}

function loadUser(orderByClause) {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT COUNT(*) AS activeLoan, loans.book_id, users.* 
      FROM users 
      LEFT JOIN loans ON users.id = loans.user_id 
      WHERE ended is null
      GROUP BY users.id ${orderByClause}`,
      cpsResolve(resolve, reject)
    );
  });
}

function findUsers({ orderByFields, order = 'ASC' }) {
  const orderByClause = orderByFields ? `ORDER BY ${orderByFields.join(', ')} ${order}` : '';
  return Promise.all([loadUser(orderByClause), expiredLoan()]);
}

function findLoans() {}

export default { findUsers, findLoans };
