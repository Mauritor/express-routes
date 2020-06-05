# Express ejs Router
**Ejemplo basico de rutas usando express y ejs**

## *app.js*
```javascript
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// import routes
const indexRoutes = require('./routes/index');

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
      return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
  }
  app.get(requireHTTPS);

//routes
app.use('/', indexRoutes);


//starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});
```

## *routes/index.js*
```javascript 
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.locals.title = 'Home';
    res.render('index.ejs');
});
router.get('/about', (req, res) => {
    res.locals.title = 'About';
    res.render('about.ejs');
});

module.exports = router;
```