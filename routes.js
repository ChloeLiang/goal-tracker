module.exports = (app, db, isAuthenticated) => {

  const users = require('./controllers/user')(db, isAuthenticated);
  const goals = require('./controllers/goal')(db, isAuthenticated);
  const progress = require('./controllers/progress')(db, isAuthenticated);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */

  app.get('/login', users.loginForm);
  app.get('/logout', users.logout);
  app.post('/login', users.login);

  app.get('/users/new', users.newForm);
  app.post('/users', users.create);

  /*
   *  =========================================
   *  Goals
   *  =========================================
   */

  app.get('/goals/:id/edit', goals.editForm);
  app.get('/goals', goals.index);
  app.put('/goals/:id', goals.update);
  app.post('/goals', goals.create);

  /*
   *  =========================================
   *  Goals
   *  =========================================
   */

  app.get('/progress', progress.get);
  app.post('/progress', progress.create);
};
