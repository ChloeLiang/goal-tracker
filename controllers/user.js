module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
  const newForm = (request, response) => {
    response.render('user/New');
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    newForm,
  };
};
