const Fakerator = require('fakerator');
const sqlite3 = require('sqlite3').verbose();

const fakerator = Fakerator('it-IT');
const db = new sqlite3.Database('./db/database.sqlite3');

db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, nome TEXT, cognome TEXT, ' +
      'ruolo TEXT, classe TEXT)'
  );

  db.run(
    'CREATE TABLE IF NOT EXISTS loans (id INTEGER PRIMARY KEY, book_id INTEGER, fromdate TEXT, todate TEXT, ' +
      'ended TEXT, user_id INTEGER, json TEXT)'
  );

  const stmt = db.prepare(
    'INSERT INTO users ' + '(nome, cognome, ruolo, classe) ' + 'VALUES (?, ?, ?, ?)'
  );

  for (let i = 0; i < 50; i += 1) {
    stmt.run(
      fakerator.names.firstName(),
      fakerator.names.lastName(),
      'Alievo',
      fakerator.random.number(1, 5)
    );
  }
  stmt.finalize();
  db.close();
});
