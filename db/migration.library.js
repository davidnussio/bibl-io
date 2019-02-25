// var Engine = require('tingodb')();
const Datastore = require('nedb');

const collectionName = 'biblioteca';
const nedb = new Datastore({
  filename: `./db/${collectionName}.nedb`,
  autoload: true,
});

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/database.sqlite3');

const dbTriggerSyncDelete = `INSERT INTO biblioteca_idx(biblioteca_idx, rowid, titolo, nome, cognome, collana, editore, genere) VALUES('delete', old.id, old.titolo, old.nome, old.cognome, old.collana, old.editore, old.genere);`;
const dbTriggerSyncInsert = `INSERT INTO biblioteca_idx(rowid, titolo, nome, cognome, collana, editore, genere) VALUES (new.id, new.titolo, new.nome, new.cognome, new.collana, new.editore, new.genere);`;

db.serialize(function setUpDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS biblioteca (id INTEGER PRIMARY KEY, nome TEXT, cognome TEXT,
    collana TEXT, editore TEXT, difficolta TEXT, settore TEXT, genere TEXT,
    titolo TEXT, parole_chiave TEXT, prezzo TEXT, anno TEXT, in_house INTEGER)
  `);
  db.run(`
    CREATE VIRTUAL TABLE biblioteca_idx 
    USING fts5(titolo, nome, cognome, collana, editore, genere, content='biblioteca', content_rowid='id')
  `);

  db.run(`
    CREATE TRIGGER tbl_ai AFTER INSERT ON biblioteca BEGIN
      ${dbTriggerSyncInsert}
    END;
  `);
  db.run(`
    CREATE TRIGGER tbl_ad AFTER DELETE ON biblioteca BEGIN
      ${dbTriggerSyncDelete}
    END;
  `);
  db.run(`
    CREATE TRIGGER tbl_au AFTER UPDATE ON biblioteca BEGIN
      ${dbTriggerSyncDelete}
      ${dbTriggerSyncInsert}
    END;
  `);

  const stmt = db.prepare(`
    INSERT INTO biblioteca
    (id, nome, cognome, collana, editore, difficolta, settore, genere, titolo, parole_chiave, prezzo, anno, in_house)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  nedb.find({}, function(err, docs) {
    console.log('Found the following records', err);
    docs.forEach(
      ({
        _id,
        nome,
        cognome,
        collana,
        editore,
        difficolta,
        settore,
        genere,
        titolo,
        parole_chiave,
        prezzo,
        anno,
        in_house,
      }) => {
        stmt.run(
          _id,
          nome,
          cognome,
          collana,
          editore,
          difficolta,
          settore,
          genere,
          titolo,
          parole_chiave,
          prezzo,
          anno,
          in_house ? 1 : 0
        );
      }
    );
    stmt.finalize();
    db.close();
  });
});
