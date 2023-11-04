var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'nombre: pablo zerpa, cedula:31 786 816, seccion:2' });
});

module.exports = router;  
