const sha256 = require('js-sha256');
const moment = require('moment');
const SALT = 'fQdkaUjfieowavwEivorutyFvdaljfLoewKdkfj';

module.exports = (db) => {
  const index = (request, response) => {
    const username = request.cookies.username;
    const hashedValue = sha256(username + 'loggedIn' + SALT);
    if (hashedValue === request.cookies.loggedIn) {
      response.render('goal/Index');
    } else {
      response.redirect('/user/Login');
    }
  };

  const newForm = (request, response) => {
    const startDate = moment().format('YYYY-MM-DD');
    const endDate = moment().add(30, 'day').format('YYYY-MM-DD');
    response.render('goal/New', { startDate, endDate });
  };

  return {
    index,
    newForm,
  };
};
