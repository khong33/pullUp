// modules
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const hbs = require('express-hbs');
const dotenv = require('dotenv');

// note that we load the process.env from `dotenv`
// before we start to load any of our own code.
const envfile = process.env.NODE_ENV === 'production' ? '.env' : '.dev.env';
dotenv.config({
  silent: true,
  path: `${__dirname}/${envfile}`,
});

// *now* load our custom Stripe charing module
// which we'll use in the router later on
const charge = require('./charge');

// create the server, and all the routes and configuration
// go against this `router`
const router = express();

// render using handlebars, but use .html as the extention
router.engine('html', hbs.express3({ extname: '.html' }));
router.set('view engine', 'ejs');
router.set('views', __dirname);
router.disable('x-powered-by');

// expose `process` to the view templates
router.locals.process = process;

// serve static assets
router.use(express.static(path.join(__dirname, 'public')));

// enable the body parser middleware
router.use(bodyParser.urlencoded({ extended: true }));

// the router

// GET /
router.get('/', (req, res) => {
  res.render('payment');
});

// POST /charge
router.post('/charge', (req, res, next) => {
  charge(req).then(data => {
    res.render('thanks');
  }).catch(error => {
    res.render('error', error);
  });
});

// start
router.listen(process.env.PORT || 3000, () => {
  console.log('Listening');
});