module.exports = (db, isAuthenticated, upload) => {
  // status: upcoming = 0, overdue = 1, ongoing = 2, completed = 3
  const index = (request, response) => {
    if (isAuthenticated(request.cookies)) {
      const userId = request.cookies.userId;
      db.goal.updateCompleted(userId)
        .then(queryResult => {
          return db.goal.updateUpcoming(userId);
        })
        .then(queryResult => {
          return db.goal.updateOngoing(userId);
        })
        .then(queryResult => {
          return db.goal.updateOverdue(userId);
        })
        .then(queryResult => {
          return db.goal.index(userId);
        })
        .then(queryResult => {
          const data = {
            goals: queryResult,
            username: request.cookies.username
          }
          response.render('goal/Index', data);
        })
        .catch(error => {
          console.log(error);
          response.sendStatus(500);
        });
    } else {
      response.redirect('/');
    }
  };

  const create = (request, response) => {
    if (isAuthenticated(request.cookies)) {
      const cover = request.file ? request.file.filename : null;
      db.goal.create(request.body, cover, request.cookies.userId)
        .then(queryResult => {
          response.redirect('/goals');
        })
        .catch(error => {
          console.log(error);
          response.sendStatus(500);
        });
    } else {
      response.redirect('/');
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
      response.redirect('/');
    }
  };

  const update = (request, response) => {
    if (isAuthenticated(request.cookies)) {
      db.goal.update(request.params.id, request.body)
        .then(queryResult => {
          response.redirect('/goals');
        })
        .catch(error => {
          console.log(error);
          response.sendStatus(500);
        });
    } else {
      response.redirect('/');
    }
  };

  const destroy = (request, response) => {
    if (isAuthenticated(request.cookies)) {
      const goalId = request.params.id;
      db.goal.destroy(goalId)
        .then(queryResult => {
          return db.progress.destroy(goalId);
        })
        .then(queryResult => {
          response.redirect('/goals');
        })
        .catch(error => {
          console.log(error);
          response.sendStatus(500);
        });
    }
  };

  return {
    index,
    create,
    editForm,
    update,
    destroy
  };
};
