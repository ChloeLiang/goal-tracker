const pg = require('pg');
const user = require('./models/user');
const goal = require('./models/goal');
const progress = require('./models/progress');
const url = require('url');

let configs;

if (process.env.DATABASE_URL) {

  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };

} else {
  configs = {
    user: 'liangxin',
    host: '127.0.0.1',
    database: 'goal_tracker',
    port: 5432
  };
}

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

module.exports = {
  /*
   * ADD APP MODELS HERE
   */
  user: user(pool),
  goal: goal(pool),
  progress: progress(pool),

  // get a reference to end the connection pool at server end
  pool: pool
};
