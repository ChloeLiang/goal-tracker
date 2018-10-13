const moment = require('moment');

module.exports = (db, isAuthenticated) => {
  const create = (request, response) => {
    if (isAuthenticated(request.cookies)) {
      const goalId = request.body.goal_id;
      const progress = parseInt(request.body.amount, 10);
      db.goal.updateProgress(goalId, progress)
        .then(queryResult => {
          return db.progress.get(goalId);
        })
        .then(queryResult => {
          if (queryResult) {
            return db.progress.update(goalId, progress);
          }

          return db.progress.create(goalId, progress);
        })
        .then(queryResult => {
          return db.goal.updateCompleted(goalId, progress);
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
