module.exports = (pool) => {

  const create = (amount, goalId) => {
    return new Promise((resolve, reject) => {
      const queryString = `INSERT INTO progress (amount, goal_id) VALUES ($1, $2)`;
      const values = [
        amount,
        goalId
      ];

      pool.query(queryString, values, (error, queryResult) => {
        if (error) {
          reject('error creating progress', error);
        } else {
          resolve(queryResult);
        }
      });
    });
  };

  const index = (goalId) => {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT * FROM progress WHERE goal_id = ${goalId}`;
      pool.query(queryString, (error, queryResult) => {
        if (error) {
          reject('error getting a progress', error);
        } else {
          resolve(queryResult.rows);
        }
      });
    });
  };

  const get = (goalId) => {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT SUM(amount) AS total, goal_id FROM progress WHERE goal_id = ${goalId} GROUP BY goal_id;`;
      pool.query(queryString, (error, queryResult) => {
        if (error) {
          reject('error getting total progress for a goal', error);
        } else if (queryResult.rows.length === 0) {
          resolve(0);
        } else {
          resolve(queryResult.rows[0].total);
        }
      });
    });
  };

  return {
    create,
    index,
    get
  };
};
