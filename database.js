const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');

    db.run("CREATE TABLE IF NOT EXISTS categoria (idCategoria INTEGER PRIMARY KEY AUTOINCREMENT, nameCategoria TEXT NOT NULL)");
    db.run("CREATE TABLE IF NOT EXISTS productos (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, code INTEGER NOT NULL, price REAL NOT NULL, description TEXT NOT NULL, categoria_id INTEGER, FOREIGN KEY(categoria_id) REFERENCES categoria(id))");
    
    db.run("CREATE TABLE IF NOT EXISTS imagenes (id INTEGER PRIMARY KEY AUTOINCREMENT, producto_id INTEGER, url TEXT NOT NULL, destacado INTEGER NOT NULL, FOREIGN KEY(producto_id) REFERENCES productos(id))");


    

});



module.exports = {
    insert: function (name, code, price, description) {
        db.run("INSERT INTO productos (name, code, price, description) VALUES (?, ?, ?, ?)", [name, code, price, description], function (err) {
            if (err) {
                return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        });
    },
    insertCategoria: function (nameCategoria) {
        db.run("INSERT INTO categoria (nameCategoria) VALUES (?)", [nameCategoria], function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        });
    },
    
    insertImagen: function (producto_id, url, destacado) {
        db.run("INSERT INTO imagenes (producto_id, url, destacado) VALUES (?, ?, ?)", [producto_id, url, destacado], function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        });
    },
    select: function (callback) {
        db.all("SELECT * FROM productos", [], (err, rows) => {
          if (err) {
            throw err;
          }
          callback(rows);
        });
      },
      selectCategoria: function (callback) {
        db.all("SELECT * FROM categoria", [], (err, rows) => {
          if (err) {
            throw err;
          }
          callback(rows);
        });
      },
      selectImagen: function (callback) {
        db.all("SELECT * FROM imagenes", [], (err, rows) => {
          if (err) {
            throw err;
          }
          callback(rows);
        });
      },
      updateCategoria: function (idCategoria, nameCategoria) {
        db.run("UPDATE categoria SET nameCategoria = ? WHERE idCategoria = ?", [ nameCategoria, idCategoria], function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`Row(s) updated: ${this.changes}`);
        });
    },
    update: function (id, name, code, price, description) {
        db.run("UPDATE productos SET name = ?, code = ?, price = ?, description = ? WHERE id = ?", [ name, code, price, description, id], function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`Row(s) updated: ${this.changes}`);
        });
    }
}