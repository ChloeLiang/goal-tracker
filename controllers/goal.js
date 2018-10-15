module.exports = (db, isAuthenticated, cloudinary) => {
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

  const show = (request, response) => {
    if (isAuthenticated(request.cookies)) {
      const username = request.cookies.username;
      const goalId = request.params.id;
      const data = { username };
      db.goal.get(goalId)
        .then(queryResult => {
          data.goal = queryResult;
          return db.progress.index(goalId);
        })
        .then(queryResult => {
          data.progress = queryResult;
          response.render('goal/Show', data);
        })
        .catch(error => {
          console.log(error);
          response.sendStatus(500);
        });
    }
  };

  const create = (request, response) => {
    if (isAuthenticated(request.cookies)) {
      if (request.file) {
        cloudinary.v2.uploader.upload(`public/uploads/${request.file.filename}`,
          { width: 'auto', height: 150, crop: 'fit' },
          (error, result) => {
            db.goal.create(request.body, result.url, request.cookies.userId)
              .then(queryResult => {
                response.redirect('/goals');
              })
              .catch(error => {
                console.log(error);
                response.sendStatus(500);
              });
          });
      } else {
        db.goal.create(request.body, null, request.cookies.userId)
          .then(queryResult => {
            response.redirect('/goals');
          })
          .catch(error => {
            console.log(error);
            response.sendStatus(500);
          });
      }
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
      if (request.file) {
        cloudinary.v2.uploader.upload(`public/uploads/${request.file.filename}`,
          { width: 'auto', height: 150, crop: 'fit' },
          (error, result) => {
            request.body.cover = result.url;
            db.goal.update(request.params.id, request.body)
              .then(queryResult => {
                response.redirect('/goals');
              })
              .catch(error => {
                console.log(error);
                response.sendStatus(500);
              });
          });
      } else {
        request.body.cover = request.body.currentCover;
        db.goal.update(request.params.id, request.body)
          .then(queryResult => {
            response.redirect('/goals');
          })
          .catch(error => {
            console.log(error);
            response.sendStatus(500);
          });
      }
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
    show,
    create,
    editForm,
    update,
    destroy
  };
};
