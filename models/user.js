var sha256 = require('js-sha256');

module.exports = (pool) => {
  const create = (user) => {
    return new Promise((resolve, reject) => {
      const hashedValue = sha256(user.password);
      const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *';
      const values = [
        user.name,
        hashedValue
      ];

      pool.query(queryString, values, (error, queryResult) => {
        if (error) {
          reject('error creating user', error);
        } else {
          resolve(queryResult.rows[0]);
        }
      });
    });
  };

  const get = (username) => {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT * FROM users WHERE name = '${username}'`;
      pool.query(queryString, (error, queryResult) => {
        if (error) {
          reject('error getting user', error);
        } else if (queryResult.rows.length === 0) {
          resolve(null);
        } else {
          resolve(queryResult.rows[0]);
        }
      });
    });
  };

  return {
    create,
    get,
  };
};
