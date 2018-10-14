const moment = require('moment');

module.exports = (db, isAuthenticated) => {
  const create = (request, response) => {
    if (isAuthenticated(request.cookies)) {
      const goalId = request.body.goal_id;
      const type = request.body.type;
      const progress = parseInt(request.body.amount, 10);

      let trackGoal
      let trackProgress;
      if (type === 'update') {
        trackGoal = db.goal.updateProgress;
        trackProgress = db.progress.update;
      } else if (type === 'add') {
        trackGoal = db.goal.addProgress;
        trackProgress = db.progress.add;
      }

      trackGoal(goalId, progress)
        .then(queryResult => {
          return db.progress.get(goalId);
        })
        .then(queryResult => {
          if (queryResult) {
            return trackProgress(goalId, progress);
          }

          return db.progress.create(goalId, progress);
        })
        .then(queryResult => {
          return db.goal.updateCompleted(goalId);
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
