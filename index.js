const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const db = require('./db');
const multer = require('multer');
const cloudinary = require('cloudinary');
const sha256 = require('js-sha256');
const SALT = 'fQdkaUjfieowavwEivorutyFvdaljfLoewKdkfj';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

const app = express();

const upload = multer({ dest: 'public/uploads/' });
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({
  extended: true
}));

const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

cloudinary.config({
  cloud_name: 'nliangxin',
  api_key: '529894273248595',
  api_secret: 'yd5Clv37vQXIixv6N27GpvS5310'
});

const isAuthenticated = (cookie) => {
  const userId = cookie.userId;
  const hashedValue = sha256(userId + 'loggedIn' + SALT);
  if (hashedValue === cookie.loggedIn) {
    return true;
  }

  return false;
};

/**
 * ===================================
 * Routes
 * ===================================
 */

require('./routes')(app, db, isAuthenticated, upload, cloudinary);

app.get('/', (request, response) => {
  if (isAuthenticated(request.cookies)) {
    response.redirect('/goals');
  } else {
    response.render('Home');
  }
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port ' + PORT + ' ~~~'));

server.on('close', () => {
  console.log('Closed express server');

  db.pool.end(() => {
    console.log('Shut down db connection pool');
  });
});
