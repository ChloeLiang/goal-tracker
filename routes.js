module.exports = (app, db, isAuthenticated, upload) => {

  const users = require('./controllers/user')(db, upload);
  const goals = require('./controllers/goal')(db, isAuthenticated, upload);
  const progress = require('./controllers/progress')(db, isAuthenticated, upload);

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

  app.get('/goals', goals.index);
  app.put('/goals/:id', upload.single('cover'), goals.update);
  app.post('/goals', upload.single('cover'), goals.create);
  app.delete('/goals/:id', goals.destroy);

  /*
   *  =========================================
   *  Progress
   *  =========================================
   */

  app.get('/progress', progress.get);
  app.post('/progress', progress.create);
};
