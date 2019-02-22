import sqlite3 from 'sqlite3';

const { Database } = sqlite3.verbose();
const db = new Database('./db/database.sqlite3');

function cpsResolve(resolve, reject) {
  return (err, data) => {
    if (err) {
      reject(err);
    }
    resolve(data);
  };
}

export default db;
export { cpsResolve };
