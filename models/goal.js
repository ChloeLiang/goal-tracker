module.exports = (pool) => {
  const createGoal = (goal, userId) => {
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

  const createGoalMeta = (goal, goalId) => {
    return new Promise((resolve, reject) => {
      const queryString = `INSERT INTO goals_meta (repeat_interval, goal_id) VALUES ($1, $2) RETURNING *`;
      values = [
        goal.repeat_interval,
        goalId
      ];

      pool.query(queryString, values, (error, queryResult) => {
        if (error) {
          reject('error creating goal meta', error);
        } else {
          resolve(queryResult.rows[0]);
        }
      });
    });
  };

  const getGoals = (status) => {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT * FROM goals WHERE status = '${status}'`;
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

  return {
    createGoal,
    createGoalMeta,
    getGoals,
  };
};
