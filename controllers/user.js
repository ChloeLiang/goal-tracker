const sha256 = require('js-sha256');
const SALT = 'fQdkaUjfieowavwEivorutyFvdaljfLoewKdkfj';

module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  const loginForm = (request, response) => {
    response.render('user/Login');
  };

  const login = (request, response) => {
    db.user.get(request.body.name)
      .then(queryResult => {
        const hashedPassword = sha256(request.body.password);
        if (hashedPassword !== queryResult.password) {
          response.render('user/Login', { error: 'Invalid password' });
        } else {
          const hashedUsername = sha256(queryResult.name + 'loggedIn' + SALT);
          response.cookie('username', queryResult.name);
          response.cookie('loggedIn', hashedUsername);
          response.redirect('/');
        }
      })
      .catch(error => {
        console.log(error);
        response.render('user/Login', { error: 'Invalid username' });
      });
  };

  const logout = (request, response) => {
    response.clearCookie('username');
    response.clearCookie('loggedIn');
    response.redirect('/');
  };

  const newForm = (request, response) => {
    response.render('user/New');
  };

  const create = (request, response) => {
    db.user.get(request.body.name)
      .then(queryResult => {
        if (queryResult) {
          response.render('user/New', { error: 'Username already exists.' });
        } else {
          return db.user.create(request.body);
        }
      })
      .then(queryResult => {
        const hashedUsername = sha256(queryResult.name + 'loggedIn' + SALT);
        response.cookie('username', queryResult.name);
        response.cookie('loggedIn', hashedUsername);
        response.redirect('/');
      })
      .catch(error => {
        console.log(error);
        response.sendStatus(500);
      })
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    loginForm,
    login,
    logout,
    newForm,
    create,
  };
};
