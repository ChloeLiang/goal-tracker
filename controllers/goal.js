const moment = require('moment');

module.exports = (db, isAuthenticated) => {
  // /goals?status=active
  // /goals?status=complete
  // /goals?status=overdue
  const index = (request, response) => {
    if (isAuthenticated(request.cookies)) {
      response.render('goal/Index', { username: request.cookies.username });
      // let data = {};
      // db.goal.index(request.cookies.userId)
      //   .then(queryResult => {
      //     data.goals = queryResult;
      //     return db.progress.getTotal();
      //   })
      //   .then(queryResult => {
      //     data.progressTotal = queryResult;
      //     response.render('goal/Index', data);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     response.sendStatus(500);
      //   });
    } else {
      response.redirect('/');
    }
  };

  const create = (request, response) => {
    if (isAuthenticated(request.cookies)) {
      db.goal.create(request.body, request.cookies.userId)
        .then(queryResult => {
          let status = 'ongoing';
          if (moment().isBefore(queryResult.start_date)) {
            status = 'upcoming';
          }

          return db.goal.updateStatus(status, queryResult.id);
        })
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

  // const getToday = (request, response) => {
  //   if (isAuthenticated(request.cookies)) {
  //     db.goal.index(request.cookies.userId)
  //       .then(queryResult => {
  //         const goals = queryResult.filter(goal => {
  //           const startDate = moment(goal.start_date, 'YYYY-MM-DD');
  //           const endDate = moment(goal.end_date, 'YYYY-MM-DD');
  //           const diff = moment().diff(startDate, 'days');
  //           const isInToday = moment().isSameOrAfter(startDate)
  //             && moment().isSameOrBefore(endDate)
  //             && (diff % goal.repeat_interval === 0);
  //           return isInToday;
  //         });

  //         response.render('goal/Index', { goals });
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         response.sendStatus(500);
  //       });
  //   } else {
  //     response.redirect('/login');
  //   }
  // };

  return {
    index,
    create,
    editForm,
    update,
    // getToday
  };
};
