const React = require('react');

class AddModal extends React.Component {
  render() {
    return (
      <div className="modal fade" id="addProgressModal" tabIndex="-1" role="dialog" aria-labelledby="addProgressModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProgressModalLabel">Update Progress</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form action="/progress" method="POST">
                <div className="container">
                  <div className="form-group">
                    <label htmlFor="progress_amount" className="col-form-label">Amount achieved</label>
                    <input type="number" className="form-control" name="amount" id="progress_amount" placeholder="Ex: 10" required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <input type="hidden" className="modal-goalid" name="goal_id" />
                  <input type="hidden" className="modal-type" name="type" />
                  <input type="submit" className="btn btn-primary" value="Update" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = AddModal;
