var express = require('express');
const db = require('../database');

var router = express.Router();

/* GET home page. */

require('dotenv').config()

router.get('/', function(req, res, next) {
  db.selectImagesAndProducts(function (productosConImagenes) {
    db.selectCategoria(function (categorias) {
      res.render('index', { title: 'Registros del formulario', productosConImagenes: productosConImagenes, categorias: categorias });
    });
  });
});

 







 
  


router.post('/admin/agregarImagenes', function(req, res, next) {
  let url = req.body.url
  let producto_id = req.body.producto_id
  let destacado = req.body.destacado
  let id = req.body.id;
  if (id) {
    if (destacado == "si" || destacado == "no") {
    db.updateImg(id, producto_id, url, destacado); // call update function
  }
  } else {
    if (destacado == "si" || destacado == "no") {
      db.insertImagen(producto_id, url, destacado) // call insert function
    }


    
  }
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
  let categoria_id = req.body.categoria_id


  let id = req.body.id; // new line to get id from request body
  if (id) {
    db.update(id, name, code, price, description,brand, size,categoria_id); // call update function
  } else {
    db.insert(name, code, price, description,brand, size,categoria_id); // call insert function
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


router.get('/admin/:id/delete',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => {   
  let iddp = req.params.id
  console.log(iddp);
  db.delete(iddp);
  db.select(function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('admin', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
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


router.get('/categoria/:id/delete',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => {   
  let iddc = req.params.id
  console.log(iddc);
  db.delete2(iddc);
  let iddx = req.params.id
  console.log(iddx);
  db.delete4(iddx);
  db.select(function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('categoria', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});










router.get('/admin/:id/actualizarImg',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => {   
  let idImg = req.params.id
  console.log(idImg);
  db.select(function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen2(idImg,function (imagenes) {
        res.render('actualizarImg', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});


router.get('/imagenes/:id/delete',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => {   
  let iddi = req.params.id
  console.log(iddi);
  db.delete3(iddi);
  db.select(function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('imagenes', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
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
