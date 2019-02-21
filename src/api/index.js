const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/database.sqlite3');

const get = (activePage, itemPerPage, cb, query = []) => {
  const whereClause = query.length ? `WHERE ${query.join(' AND ')}` : [];

  db.serialize(() => {
    db.all(`SELECT COUNT(*) FROM biblioteca ${whereClause}`, (err, numRows) => {
      db.all(
        `SELECT * FROM biblioteca ${whereClause} LIMIT ${itemPerPage *
          (activePage - 1)},${itemPerPage}`,
        (_, rows) => {
          cb(rows, numRows[0]['COUNT(*)']);
        }
      );
    });
  });
};

const library = { get };

const users = {
  get: ({ orderByFields, order = 'ASC' }, cb) => {
    db.all(
      'SELECT count(*) as activeLoan, loans.book_id, users.* ' +
        'from users left join loans on users.id = loans.user_id ' +
        'where ended is null group by users.id ' +
        `${orderByFields ? `ORDER BY ${orderByFields.join(', ')} ${order}` : ''}`,
      (_, userRows) => {
        const expiredLoanIndex = {};
        db.each(
          "SELECT user_id, book_id, json FROM loans WHERE todate < date('now') AND ended is null",
          (_, expiredLoan) => {
            expiredLoanIndex[expiredLoan.user_id] = true;
          },
          () => {
            cb(userRows, expiredLoanIndex);
          }
        );
      }
    );
  },
};

export { library, users };
