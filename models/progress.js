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

  const getTotal = () => {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT SUM(amount) AS total, goal_id FROM progress GROUP BY goal_id`;
      pool.query(queryString, (error, queryResult) => {
        if (error) {
          reject('error getting a progress', error);
        } else {
          resolve(queryResult.rows);
        }
      });
    });
  };

  const getToday = () => {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT SUM(amount) AS today, goal_id FROM progress WHERE created_at = CURRENT_DATE GROUP BY goal_id`;
      pool.query(queryString, (error, queryResult) => {
        if (error) {
          reject('error getting a progress', error);
        } else {
          resolve(queryResult.rows);
        }
      });
    });
  };

  return {
    create,
    getTotal,
    getToday
  };
};
