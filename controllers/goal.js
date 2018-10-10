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

  const getGoals = (request, response) => {
    if (isAuthenticated(request.cookies)) {
      db.goal.getGoals(request.query.status)
        .then(queryResult => {
          response.render('goal/Index', { goals: queryResult });
        })
        .catch(error => {
          console.log(error);
          response.sendStatus(500);
        });
    } else {
      response.redirect('/login');
    }
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
    if (isAuthenticated(request.cookies)) {
      db.goal.createGoal(request.body, request.cookies.userId)
        .then(queryResult => {
          db.goal.createGoalMeta(request.body, queryResult.id);
        })
        .then(queryResult => {
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

  const editForm = (request, response) => {
    if (isAuthenticated(request.cookies)) {
      db.goal.get(request.params.id)
        .then(queryResult => {
          response.render('goal/Edit', { goal: queryResult });
        })
        .catch(error => {
          console.log(error);
          response.sendStatus(500);
        })
    } else {
      response.redirect('/login');
    }
  };

  const update = (request, response) => {
    if (isAuthenticated(request.cookies)) {
      response.send('update success');
    } else {
      response.redirect('/login');
    }
  };

  return {
    getGoals,
    newForm,
    create,
    editForm,
    update,
  };
};
