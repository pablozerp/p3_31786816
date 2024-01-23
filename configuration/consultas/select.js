const db = require('../configDB.js');

const select = (callback) => {
    db.all("SELECT * FROM productos", [], (err, rows) => {
        if (err) {
            throw err;
        }
        callback(rows);
    });
}
const selectCategoria = (callback) => {
    db.all("SELECT * FROM categoria", [], (err, rows) => {
        if (err) {
            throw err;
        }
        callback(rows);
    });
}
const selectCategoria2 = (idCategoria, callback) => {
    db.all("SELECT * FROM categoria WHERE idCategoria = ?", [idCategoria], (err, rows) => {
        if (err) {
            throw err;
        }
        callback(rows);
    });
}
const select2 = (id, callback) => {
    db.all("SELECT * FROM productos WHERE id = ?", [id], (err, rows) => {
        if (err) {
            throw err;
        }
        callback(rows);
    });
}

const selectImagen = (callback) => {
    db.all("SELECT * FROM imagenes", [], (err, rows) => {
        if (err) {
            throw err;
        }
        callback(rows);
    });
}

const selectImagen2 = (idImg, callback) => {
    db.all("SELECT * FROM imagenes WHERE id = ?", [idImg], (err, rows) => {
        if (err) {
            throw err;
        }
        callback(rows);
    });
}

module.exports = {
    select,
    selectCategoria,
    selectCategoria2,
    select2,
    selectImagen,
    selectImagen2
}