module.exports = (app, db, isAuthenticated) => {

  const users = require('./controllers/user')(db, isAuthenticated);
  const goals = require('./controllers/goal')(db, isAuthenticated);

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
  app.get('/goals/today', goals.getToday);
  app.get('/goals/:id/edit', goals.editForm);
  app.get('/goals', goals.getGoals);
  app.put('/goals/:id', goals.update);
  app.post('/goals/new', goals.create);
};
