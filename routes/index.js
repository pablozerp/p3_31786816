var express = require('express');
const db = require('../database');

var router = express.Router();

/* GET home page. */

require('dotenv').config()

router.get('/', function(req, res, next) {
  db.insert('camisa', 2, 23, 'camisa de bebe', 'baby', 'talla 2', 1);
  db.insertCategoria("camisa",  1);
  db.insertImagen(1, "url", 1);
  res.render('index', { title: 'pablo Zerpa,31786816, seccion 2' });
  
});

router.post('/admin/agregarImagenes', function(req, res, next) {
  let url = req.body.url
  let producto_id = req.body.producto_id
  let destacado = req.body.destacado
  db.insertImagen(producto_id, url, destacado) 
  res.redirect('/imagenes');
});


router.post('/admin/agregarCategoria', function(req, res, next) {
  let nameCategoria = req.body.nameCategoria;
  let idCategoria = req.body.idCategoria
  if (idCategoria) {
    db.updateCategoria(idCategoria, nameCategoria); // call update function
  } else {
    db.insertCategoria(nameCategoria); // call insert function
  }
  res.redirect('/categoria');
});

router.post('/admin/agregar', function(req, res, next) {
  let name = req.body.name;
  let code = req.body.code;
  let price = req.body.price;
  let description = req.body.description;
  let brand  = req.body.brand;
  let size  = req.body.size;
  
  let id = req.body.id; // new line to get id from request body
  if (id) {
    db.update(id, name, code, price, description,brand, size); // call update function
  } else {
    db.insert(name, code, price, description,brand, size); // call insert function
  }
  res.redirect('/admin');
});














const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy


router.use(express.urlencoded({extended:true}));

router.use(cookieParser('mi'));

router.use(session({
    secret:'mi',
    resave:true,
    saveUninitialized:true
}));

router.use(passport.initialize());
router.use(passport.session());




passport.use(new PassportLocal(function(username,password,done){
    if (username === process.env.NOMBRE && password === process.env.CONTRASENA) 
    return done(null,{id:1,name:"cody"})
    done(null,false)
}))

passport.serializeUser(function (user,done) {
 done(null,user.id)   
})

passport.deserializeUser(function (id,done) {
  done(null,{id:1,name:"cody"})  
})











router.get('/admin',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => {
  db.select(function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('admin', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});











router.get("/login",(req,res)=>{
  res.render('login', { title: 'login' });
})

router.post("/login",passport.authenticate('local',{
  successRedirect:"/admin",
  failureRedirect:"/login"
}))












router.get('/admin/agregar',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => {   
  db.select(function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('agregar', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});

router.get('/admin/agregarCategoria',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => {   
  res.render('agregarCategoria', { title: 'Registros del formulario'});
});
router.get('/admin/agregarImagenes',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => {   
  res.render('agregarImagenes', { title: 'Registros del formulario'});
});







router.get('/admin/:id/actualizar',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => {   
  let idp = req.params.id
  console.log(idp);
  db.select2(idp,function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('actualizar', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});

router.get('/admin/:id/actualizarCat',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => { 
  let idc = req.params.id
  console.log(idc);
  db.select(function (productos) {
    db.selectCategoria2(idc,function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('actualizarCat', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});

router.get('/admin/actualizarImg',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => {   
  res.render('actualizarImg', { title: 'Registros del formulario'});
});




router.get('/categoria',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => {
  db.select(function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('categoria', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});
router.get('/imagenes',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => {
  db.select(function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('imagenes', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});


module.exports = router;  
