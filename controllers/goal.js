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

  // /goals?status=active
  // /goals?status=complete
  // /goals?status=overdue
  const index = (request, response) => {
    if (isAuthenticated(request.cookies)) {
      let data = {};
      db.goal.index(request.cookies.userId)
        .then(queryResult => {
          data.goals = queryResult;
          return db.progress.getTotal();
        })
        .then(queryResult => {
          data.progressTotal = queryResult;
          response.render('goal/Index', data);
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
      db.goal.create(request.body, request.cookies.userId)
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
      db.goal.update(request.params.id, request.body)
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

  // const getToday = (request, response) => {
  //   if (isAuthenticated(request.cookies)) {
  //     const data = {};
  //     db.goal.getGoals('active', request.cookies.userId)
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
    newForm,
    create,
    editForm,
    update,
    // getToday
  };
};
