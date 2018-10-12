const moment = require('moment');

module.exports = (db, isAuthenticated) => {
  const create = (request, response) => {
    if (isAuthenticated(request.cookies)) {
      const goalId = request.body.goal_id;
      const amount = parseInt(request.body.amount, 10);
      db.progress.create(amount, goalId)
        .then(queryResult => {
          return db.progress.get(goalId);
        })
        .then(queryResult => {
          return db.goal.updateCompleted(goalId, queryResult);
        })
        .then(queryResult => {
          response.redirect('/goals');
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
          response.json(queryResult);
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
