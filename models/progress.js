module.exports = (pool) => {

  const create = (goalId, amount) => {
    return new Promise((resolve, reject) => {
      const queryString = `INSERT INTO progress (amount, goal_id) VALUES ($1, $2) RETURNING *`;
      const values = [
        amount,
        goalId
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

  const index = (goalId) => {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT * FROM progress WHERE goal_id = ${goalId} ORDER BY created_at`;
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
      const queryString = `SELECT * FROM progress WHERE goal_id = ${goalId} AND created_at = CURRENT_DATE`;
      pool.query(queryString, (error, queryResult) => {
        if (error) {
          reject('error getting progress for today', error);
        } else if (queryResult.rows.length === 0) {
          resolve(null);
        } else {
          resolve(queryResult.rows[0]);
        }
      });
    });
  };

  const update = (goalId, amount) => {
    return new Promise((resolve, reject) => {
      const queryString = `UPDATE progress SET amount = ${amount} WHERE goal_id = ${goalId} AND created_at = CURRENT_DATE RETURNING *`;
      pool.query(queryString, (error, queryResult) => {
        if (error) {
          reject('error updating progress for today', error);
        } else {
          resolve(queryResult.rows[0]);
        }
      });
    });
  };

  const add = (goalId, amount) => {
    return new Promise((resolve, reject) => {
      const queryString = `UPDATE progress SET amount = amount + ${amount} WHERE goal_id = ${goalId} AND created_at = CURRENT_DATE RETURNING *`;
      pool.query(queryString, (error, queryResult) => {
        if (error) {
          reject('error adding progress for today', error);
        } else {
          resolve(queryResult.rows[0]);
        }
      });
    });
  };

  const destroy = (goalId) => {
    return new Promise((resolve, reject) => {
      const queryString = `DELETE from progress WHERE goal_id = ${goalId}`;
      pool.query(queryString, (error, queryResult) => {
        if (error) {
          reject('error deleting progress', error);
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
    add,
    destroy
  };
};
