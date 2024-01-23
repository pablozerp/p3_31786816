
const db = require('./configDB.js');
const {
  selectImagesAndProducts,
  selectImagesAndProducts2,
  selectImagesAndProducts3 } = require("./consultas/selectImagesAndProduct")

const {
  insert,
  insertCategoria,
  insertImagen } = require("./consultas/insert")

const {
  select,
  selectCategoria,
  selectCategoria2,
  select2,
  selectImagen,
  selectImagen2
} = require("./consultas/select")

const {
  updateImg,
  updateCategoria,
  update
} = require("./consultas/update")

const {
  deletex,
  delete2,
  delete4,
  delete3
} = require("./consultas/delete")

module.exports = {
  insert,
  insertCategoria,
  insertImagen,

  select,
  selectCategoria,
  selectCategoria2,
  select2,
  selectImagen,
  selectImagen2,

  selectImagesAndProducts,
  selectImagesAndProducts2,
  selectImagesAndProducts3,

  updateImg,
  updateCategoria,
  update,
  delete: deletex,
  delete2,
  delete4,
  delete3
}
























