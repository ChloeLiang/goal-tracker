const moment = require('moment');

module.exports = (pool) => {
  const create = (goal, cover, userId) => {
    return new Promise((resolve, reject) => {
      let status = 2;
      if (moment().isBefore(goal.start_date)) {
        status = 0;
      }
      const queryString = `INSERT INTO goals (title, amount, unit, progress, start_date, end_date, status, user_id, cover) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
      const values = [
        goal.title,
        goal.amount,
        goal.unit,
        0,
        goal.start_date,
        goal.end_date,
        status,
        userId,
        cover
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
      const queryString = `SELECT * FROM goals WHERE user_id = ${userId} ORDER BY end_date`;
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
      const queryString = `UPDATE goals SET title = ($1), amount = ($2), unit = ($3), start_date = ($4), end_date = ($5), cover = ($6) WHERE id = ${goalId}`;
      const values = [
        goal.title,
        goal.amount,
        goal.unit,
        goal.start_date,
        goal.end_date,
        goal.cover
      ];

      pool.query(queryString, values, (error, queryResult) => {
        if (error) {
          reject('error updating goal', error);
        } else {
          resolve(queryResult);
        }
      });
    });
  };

  const updateUpcoming = (userId) => {
    return new Promise((resolve, reject) => {
      const queryString = `UPDATE goals SET status = 0, complete_date = NULL WHERE CURRENT_DATE < start_date AND progress < amount AND user_id = ${userId}`;
      pool.query(queryString, (error, queryResult) => {
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
      const queryString = `UPDATE goals SET status = 2, complete_date = NULL WHERE CURRENT_DATE >= start_date AND CURRENT_DATE <= end_date AND progress < amount AND user_id = ${userId}`;
      pool.query(queryString, (error, queryResult) => {
        if (error) {
          reject('error updating goal status to ongoing', error);
        } else {
          resolve(queryResult);
        }
      });
    });
  };

  const updateCompleted = (userId) => {
    return new Promise((resolve, reject) => {
      const queryString = `UPDATE goals SET status = 3, complete_date = CURRENT_DATE WHERE user_id = ${userId} AND progress >= amount`;
      pool.query(queryString, (error, queryResult) => {
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
      const queryString = `UPDATE goals SET status = 1, complete_date = NULL WHERE CURRENT_DATE > end_date AND progress < amount AND user_id = ${userId}`;
      pool.query(queryString, (error, queryResult) => {
        if (error) {
          reject('error updating goal status to overdue', error);
        } else {
          resolve(queryResult);
        }
      });
    });
  };

  const updateProgress = (goalId, progress) => {
    return new Promise((resolve, reject) => {
      const queryString = `UPDATE goals SET progress = ${progress} WHERE id = ${goalId}`;
      pool.query(queryString, (error, queryResult) => {
        if (error) {
          reject('error updating goal progress', error);
        } else {
          resolve(queryResult);
        }
      });
    });
  };

  const addProgress = (goalId, progress) => {
    return new Promise((resolve, reject) => {
      const queryString = `UPDATE goals SET progress = progress + ${progress} WHERE id = ${goalId}`;
      pool.query(queryString, (error, queryResult) => {
        if (error) {
          reject('error adding goal progress', error);
        } else {
          resolve(queryResult);
        }
      });
    });
  };

  const destroy = (goalId) => {
    return new Promise((resolve, reject) => {
      const queryString = `DELETE from goals WHERE id = ${goalId}`;
      pool.query(queryString, (error, queryResult) => {
        if (error) {
          reject('error deleting goal', error);
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
    updateOverdue,
    updateProgress,
    addProgress,
    destroy
  };
};
