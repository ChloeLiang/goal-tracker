const moment = require('moment');

module.exports = (pool) => {
  const create = (goal, userId) => {
    return new Promise((resolve, reject) => {
      let status = 'ongoing';
      if (moment().isBefore(goal.start_date)) {
        status = 'upcoming';
      }
      const queryString = `INSERT INTO goals (title, amount, unit, start_date, end_date, status, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
      const values = [
        goal.title,
        goal.amount,
        goal.unit,
        goal.start_date,
        goal.end_date,
        status,
        userId
      ];

      pool.query(queryString, values, (error, queryResult) => {
        if (error) {
          reject('error creating goal', error);
        } else {
          resolve(queryResult);
        }
      });
    });
  };

  const index = (userId) => {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT goals.*, SUM(progress.amount) AS progress_sum FROM goals LEFT JOIN progress ON goals.id = progress.goal_id WHERE user_id = ${userId} GROUP BY goals.id`;
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

  const updateUpcoming = (userId) => {
    return new Promise((resolve, reject) => {
      const queryString = `UPDATE goals SET status = ($1) WHERE CURRENT_DATE < start_date AND status != 'complete' AND user_id = ${userId}`;
      const values = ['upcoming'];
      pool.query(queryString, values, (error, queryResult) => {
        if (error) {
          reject('error updating goal status to upcoming', error);
        } else {
          resolve(queryResult);
        }
      });
    });
  };

  const updateOngoing = (userId) => {
    return new Promise((resolve, reject) => {
      const queryString = `UPDATE goals SET status = ($1) WHERE CURRENT_DATE >= start_date AND CURRENT_DATE <= end_date AND status != 'complete' AND user_id = ${userId}`;
      const values = ['ongoing'];
      pool.query(queryString, values, (error, queryResult) => {
        if (error) {
          reject('error updating goal status to ongoing', error);
        } else {
          resolve(queryResult);
        }
      });
    });
  };

  const updateCompleted = (goalId) => {
    return new Promise((resolve, reject) => {
      const queryString = `UPDATE goals SET status = ($1) WHERE id = ${goalId}`;
      const values = ['completed'];
      pool.query(queryString, values, (error, queryResult) => {
        if (error) {
          reject('error updating goal status to completed', error);
        } else {
          resolve(queryResult);
        }
      });
    });
  };

  const updateOverdue = (userId) => {
    return new Promise((resolve, reject) => {
      const queryString = `UPDATE goals SET status = ($1) WHERE CURRENT_DATE > end_date AND status != 'complete' AND user_id = ${userId}`;
      const values = ['overdue'];
      pool.query(queryString, values, (error, queryResult) => {
        if (error) {
          reject('error updating goal status to overdue', error);
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
    updateUpcoming,
    updateOngoing,
    updateCompleted,
    updateOverdue
  };
};
