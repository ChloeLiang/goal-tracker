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

  const index = (request, response) => {
    if (!isAuthenticated(request.cookies)) {
      response.redirect('/login');
    }

    response.render('goal/Index');
  };

  const newForm = (request, response) => {
    if (isAuthenticated(request.cookies)) {
      const startDate = moment().format('YYYY-MM-DD');
      const endDate = moment().add(30, 'day').format('YYYY-MM-DD');
      response.render('goal/New', { startDate, endDate });
    } else {
      response.redirect('/login');
    }
  };

  const create = (request, response) => {
    if (!isAuthenticated(request.cookies)) {
      response.redirect('/login');
    }

    db.goal.createGoal(request.body, request.cookies.userId)
      .then(queryResult => {
        console.log('successfully create goal');
        db.goal.createGoalMeta(request.body, queryResult.id);
      })
      .then(queryResult => {
        console.log('successfully create goal meta');
        response.redirect('/goals');
      })
      .catch(error => {
        console.log(error);
        response.sendStatus(500);
      });
  };

  return {
    index,
    newForm,
    create,
  };
};
