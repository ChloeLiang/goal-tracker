const sha256 = require('js-sha256');
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

  return {
    index,
  };
};
