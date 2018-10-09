module.exports = (app, db) => {

  const users = require('./controllers/user')(db);
  const goals = require('./controllers/goal')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */

  app.get('/login', users.loginForm);
  app.get('/logout', users.logout);
  app.post('/login', users.login);

  app.get('/users/new', users.newForm);
  app.post('/users/new', users.create);

  /*
   *  =========================================
   *  Goals
   *  =========================================
   */

  app.get('/goals', goals.index);
};
