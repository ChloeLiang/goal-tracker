module.exports = (app, db) => {

  const users = require('./controllers/user')(db);
  const goals = require('./controllers/goal')(db);
  const progress = require('./controllers/progress')(db);

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

  app.get('/goals/new', goals.newForm);
  app.get('/goals/:id/edit', goals.editForm);
  app.get('/goals', goals.getGoals);
  app.put('/goals/:id', goals.update);
  app.post('/goals/new', goals.create);

  /*
   *  =========================================
   *  Goals
   *  =========================================
   */

  app.get('/progress', progress.get);
  app.post('/progress', progress.create);
};
