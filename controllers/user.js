const sha256 = require('js-sha256');
const SALT = 'fQdkaUjfieowavwEivorutyFvdaljfLoewKdkfj';

module.exports = (db, upload) => {
  const loginForm = (request, response) => {
    response.render('user/Login');
  };

  const login = (request, response) => {
    db.user.get(request.body.name)
      .then(queryResult => {
        if (queryResult) {
          const hashedPassword = sha256(request.body.password);
          if (hashedPassword !== queryResult.password) {
            response.render('user/Login', { error: 'Invalid password' });
          } else {
            const hashedUserId = sha256(queryResult.id + 'loggedIn' + SALT);
            response.cookie('userId', queryResult.id);
            response.cookie('username', queryResult.name);
            response.cookie('loggedIn', hashedUserId);
            response.redirect('/goals');
          }
        } else {
          response.render('user/Login', { error: `Username doesn't exist.` });
        }
      })
      .catch(error => {
        console.log(error);
        response.render('user/Login', { error: 'Invalid username' });
      });
  };

  const logout = (request, response) => {
    response.clearCookie('userId');
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
        const hashedUserId = sha256(queryResult.id + 'loggedIn' + SALT);
        response.cookie('userId', queryResult.id);
        response.cookie('username', queryResult.name);
        response.cookie('loggedIn', hashedUserId);
        response.redirect('/');
      })
      .catch(error => {
        console.log(error);
        response.sendStatus(500);
      })
  };

  return {
    loginForm,
    login,
    logout,
    newForm,
    create,
  };
};
