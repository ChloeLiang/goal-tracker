const sha256 = require('js-sha256');
const moment = require('moment');
const SALT = 'fQdkaUjfieowavwEivorutyFvdaljfLoewKdkfj';

module.exports = (db) => {
  const isAuthenticated = (cookie) => {
    const userId = cookie.userId;
    const hashedValue = sha256(userId + 'loggedIn' + SALT);
    if (hashedValue === cookie.loggedIn) {
      return true;
    }

    return false;
  };

  const create = (request, response) => {
    if (isAuthenticated(request.cookies)) {
      db.progress.create(request.body)
        .then(queryResult => {
          console.log('update progress successfully');
          response.redirect('/goals?status=active');
        })
        .catch(error => {
          console.log(error);
          response.sendStatus(500);
        });
    } else {
      response.redirect('/login');
    }
  };

  const get = (request, response) => {
    if (isAuthenticated(request.cookies)) {
      db.progress.getTotal()
        .then(queryResult => {
          console.log(queryResult);
        })
        .catch(error => {
          console.log(error);
          response.sendStatus(500);
        });
    }
  }

  return {
    create,
    get,
  };
};
