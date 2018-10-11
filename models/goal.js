module.exports = (pool) => {
  const create = (goal, userId) => {
    return new Promise((resolve, reject) => {
      const queryString = `INSERT INTO goals (title, amount, unit, start_date, end_date, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
      const values = [
        goal.title,
        goal.amount,
        goal.unit,
        goal.start_date,
        goal.end_date,
        userId
      ];

      pool.query(queryString, values, (error, queryResult) => {
        if (error) {
          reject('error creating goal', error);
        } else {
          resolve(queryResult.rows[0]);
        }
      });
    });
  };

  const index = (userId) => {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT * FROM goals WHERE user_id = ${userId}`;
      pool.query(queryString, (error, queryResult) => {
        if (error) {
          reject('error getting goals', error);
        } else if (queryResult.rows.length === 0) {
          resolve(null);
        } else {
          resolve(queryResult.rows);
        }
      });
    });
  };

  const get = (goalId) => {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT * FROM goals WHERE goals.id = ${goalId}`;
      pool.query(queryString, (error, queryResult) => {
        if (error) {
          reject('error getting a goal', error);
        } else {
          resolve(queryResult.rows[0]);
        }
      });
    });
  };

  const update = (goalId, goal) => {
    return new Promise((resolve, reject) => {
      const queryString = `UPDATE goals SET title = ($1), amount = ($2), unit = ($3), start_date = ($4), end_date = ($5) WHERE id = ${goalId} RETURNING *`;
      const values = [
        goal.title,
        goal.amount,
        goal.unit,
        goal.start_date,
        goal.end_date
      ];

      pool.query(queryString, values, (error, queryResult) => {
        if (error) {
          reject('error updating goal', error);
        } else {
          resolve(queryResult.rows[0]);
        }
      });
    });
  };

  const updateStatus = (status, goalId) => {
    return new Promise((resolve, reject) => {
      const queryString = `UPDATE goals SET status = ($1) WHERE id = ($2)`;
      const values = [status, goalId];
      pool.query(queryString, values, (error, queryResult) => {
        if (error) {
          reject('error updating goal status', error);
        } else {
          resolve(queryResult);
        }
      });
    });
  };

  return {
    create,
    index,
    get,
    update,
    updateStatus
  };
};
