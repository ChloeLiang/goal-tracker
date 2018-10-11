module.exports = (pool) => {

  const create = (progress) => {
    return new Promise((resolve, reject) => {
      const queryString = `INSERT INTO progress (amount, goal_id) VALUES ($1, $2) RETURNING *`;
      const values = [
        progress.amount,
        progress.goal_id
      ];

      pool.query(queryString, values, (error, queryResult) => {
        if (error) {
          reject('error creating progress', error);
        } else {
          resolve(queryResult.rows[0]);
        }
      });
    });
  };

  const get = (goalId) => {
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

  const update = (goalId) => {
  };

  return {
    create,
    get,
    update
  };
};
