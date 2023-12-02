const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('sqlite3', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQLite database.');

    // Create the 'categoria' table
    db.run("CREATE TABLE IF NOT EXISTS categoria (idCategoria INTEGER PRIMARY KEY AUTOINCREMENT, nameCategoria TEXT NOT NULL)");

    // Create the 'productos' table
    db.run("CREATE TABLE IF NOT EXISTS productos (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, code TEXT NOT NULL, price REAL NOT NULL, description TEXT NOT NULL, brand TEXT NOT NULL, size TEXT NOT NULL, categoria_id INTEGER, FOREIGN KEY(categoria_id) REFERENCES categoria(id))");

    // Create the 'imagenes' table
    db.run("CREATE TABLE IF NOT EXISTS imagenes (id INTEGER PRIMARY KEY AUTOINCREMENT, producto_id INTEGER, url TEXT NOT NULL, destacado BLOB NOT NULL, FOREIGN KEY(producto_id) REFERENCES productos(id))");

    
}); 
module.exports = {
    insert: function (name, code, price, description, brand, size, categoria_id) {
        db.run("INSERT INTO productos (name, code, price, description, brand, size, categoria_id) VALUES (?, ?, ?, ?, ?, ?, ?)", [name, code, price, description, brand, size, categoria_id], function (err) {
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
      },selectCategoria2: function (idCategoria, callback) {
        db.all("SELECT * FROM categoria WHERE idCategoria = ?", [idCategoria], (err, rows) => {
            if (err) {
                throw err;
            }
            callback(rows);
        });
    },
    select2: function (id, callback) {
      db.all("SELECT * FROM productos WHERE id = ?", [id], (err, rows) => {
          if (err) {
              throw err;
          }
          callback(rows);
      });
  },
  selectImagen2: function (idImg,callback) {
    db.all("SELECT * FROM imagenes WHERE id = ?", [idImg], (err, rows) => {
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
      selectImagesAndProducts: function (callback) {
        db.all("SELECT p.id, p.name, p.code, p.price, p.description, p.brand, p.size, c.nameCategoria , i.url FROM productos p INNER JOIN categoria c ON p.categoria_id = c.idCategoria LEFT JOIN imagenes i ON p.id = i.producto_id WHERE i.destacado = 'si'",
         [], (err, rows) => {
          if (err) {
            throw err;
          }
          callback(rows);
        });
      },
      selectImagesAndProducts2: function (idImg,callback) {
        db.all("SELECT p.name, p.code, p.price, p.description, p.brand, p.size, c.nameCategoria , i.url, i.destacado FROM productos p INNER JOIN categoria c ON p.categoria_id = c.idCategoria LEFT JOIN imagenes i ON p.id = i.producto_id  WHERE p.id = ?", [idImg]
         , (err, rows) => {
          if (err) {
            throw err;
          }
          callback(rows);
        });
      },
      


      selectImagesAndProducts3: function (idImg,callback) {
        db.all("SELECT p.name, p.code, p.price, p.description, p.brand, p.size, c.nameCategoria , i.url FROM productos p INNER JOIN categoria c ON p.categoria_id = c.idCategoria LEFT JOIN imagenes i ON p.id = i.producto_id WHERE p.id = ? AND  i.destacado = 'si'",
         [idImg], (err, rows) => {
          if (err) {
            throw err;
          }
          callback(rows);
        });
      },
      updateImg: function (id, producto_id, url, destacado) {
        db.run("UPDATE imagenes SET producto_id = ?, url = ?, destacado = ? WHERE id = ?", [producto_id, url, destacado, id], function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`Row(s) updated: ${this.changes}`);
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
    update: function (id, name, code, price, description, brand, size, categoria_id) {
        db.run("UPDATE productos SET name = ?, code = ?, price = ?, description = ?, brand = ?, size = ?, categoria_id = ?  WHERE id = ?", [ name, code, price, description, brand, size,categoria_id, id], function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`Row(s) updated: ${this.changes}`);
        });
    },
    delete : function (iddp){
        db.run("DELETE FROM productos WHERE id = ?", [iddp], 
        function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`Row(s) updated: ${this.changes}`);
        });
    },
    delete2 : function (iddc){
        db.run("DELETE FROM categoria WHERE idCategoria = ?;", [iddc], 
        function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`Row(s) updated: ${this.changes}`);
        });
    },
    delete4 : function (iddx){
      db.run("DELETE FROM productos WHERE categoria_id = ?", [iddx], 
      function (err) {
          if (err) {
              return console.log(err.message);
          }
          console.log(`Row(s) updated: ${this.changes}`);
      });
  },
    delete3 : function (iddi){
        db.run("DELETE FROM imagenes WHERE id = ?", [iddi], 
        function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`Row(s) updated: ${this.changes}`);
        });
    }   
}