var express = require('express');
const db = require('../configuration/database');

var router = express.Router();


require('dotenv').config()


router.get('/', function (req, res, next) {
  db.selectImagesAndProducts(function (productosConImagenes) {
    db.selectCategoria(function (categorias) {
      res.render('index', { title: 'Registros del formulario', productosConImagenes: productosConImagenes, categorias: categorias });
    });
  });
});

const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy

router.use(express.urlencoded({ extended: true }));

router.use(cookieParser('mi'));

router.use(session({
  secret: 'mi',
  resave: true,
  saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());

passport.use(new PassportLocal(function (username, password, done) {
  if (username === process.env.NOMBRE && password === process.env.CONTRASENA)
    return done(null, { id: 1, name: "cody" })
  done(null, false)
}))

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  done(null, { id: 1, name: "cody" })
})

router.get("/login", (req, res) => {
  res.render('login', { title: 'login' });
})

router.post("/login", passport.authenticate('local', {
  successRedirect: "/admin",
  failureRedirect: "/login"
}))

router.get('/categoria/:id/delete', (req, res, next) => {
  if (req.isAuthenticated()) return next();

  res.redirect("/login")
}, (req, res) => {
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

router.get('/imagenes/:id/delete', (req, res, next) => {
  if (req.isAuthenticated()) return next();

  res.redirect("/login")
}, (req, res) => {
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


router.get('/categoria', (req, res, next) => {
  if (req.isAuthenticated()) return next();

  res.redirect("/login")
}, (req, res) => {
  db.select(function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('categoria', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});
router.get('/imagenes', (req, res, next) => {
  if (req.isAuthenticated()) return next();

  res.redirect("/login")
}, (req, res) => {
  db.select(function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('imagenes', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});

router.get('/producto/:id', (req, res, next) => {
  let idImg = req.params.id
  console.log(idImg);
  db.selectImagesAndProducts3(idImg, function (productosConImagenes3) {
    db.selectImagesAndProducts2(idImg, function
      (productosConImagenes2) {
      db.selectCategoria(function (categorias) {
        res.render('producto', { title: 'Registros del formulario', productosConImagenes3: productosConImagenes3, productosConImagenes2: productosConImagenes2, categorias: categorias });
      });
    });
  })

});










module.exports = router;  
