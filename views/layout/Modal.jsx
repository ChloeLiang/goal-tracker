const React = require('react');
const moment = require('moment');

class Modal extends React.Component {
  render() {
    const now = moment().format('YYYY-MM-DD');
    const thirtyDaysLater = moment().add(30, 'days').format('YYYY-MM-DD');

    return (
      <div className="modal fade" id="newGoalModal" tabIndex="-1" role="dialog" aria-labelledby="newGoalModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newGoalModalLabel">New Goal</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form action="/goals/new" method="POST">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="title" className="col-form-label">Title</label>
                        <input type="text" className="form-control" name="title" id="title" placeholder="Ex: Solve 100 coding interview questions" required />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="amount" className="col-form-label">Total Amount</label>
                        <input type="number" className="form-control" name="amount" id="amount" placeholder="Ex: 100" required />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="unit" className="col-form-label">Unit</label>
                        <input type="text" className="form-control" name="unit" id="unit" placeholder="Ex: questions" required />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="start_date" className="col-form-label">Start Date</label>
                        <input type="date" className="form-control" name="start_date" id="start_date" defaultValue={now} required />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="end_date" className="col-form-label">End Date</label>
                        <input type="date" className="form-control" name="end_date" id="end_date" defaultValue={thirtyDaysLater} required />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <input type="submit" className="btn btn-primary" value="Add" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Modal;
