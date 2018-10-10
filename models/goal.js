module.exports = (pool) => {
  const createGoal = (goal, userId) => {
    return new Promise((resolve, reject) => {
      const queryString = `INSERT INTO goals (title, amount, unit, user_id) VALUES ($1, $2, $3, $4) RETURNING *`;
      const values = [
        goal.title,
        goal.amount,
        goal.unit,
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
      const queryString = `INSERT INTO goals_meta (repeat_start, repeat_interval, repeat_end, goal_id) VALUES ($1, $2, $3, $4) RETURNING *`;
      values = [
        goal.repeat_start,
        goal.repeat_interval,
        goal.repeat_end,
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

  return {
    createGoal,
    createGoalMeta,
  };
};
