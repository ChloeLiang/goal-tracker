const React = require('react');

class Edit extends React.Component {
  render() {
    return (
      <div className="modal fade" id="editGoalModal" tabIndex="-1" role="dialog" aria-labelledby="editGoalModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editGoalModalLabel">Edit Goal</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="modal-form" method="POST" encType="multipart/form-data">
                <div className="container-fluid">
                  <input type="hidden" className="modal-cover" name="currentCover" />
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="title" className="col-form-label">Title</label>
                        <input type="text" className="form-control modal-title" name="title" id="title" placeholder="Ex: Solve 100 coding interview questions" required />
                      </div>
                    </div>
                    <div className="col-md-7">
                      <label htmlFor="coverEdit">Cover photo (optional)</label>
                      <input type="file" className="form-control-file" id="coverEdit" name="cover" accept="image/*" />
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="amount" className="col-form-label">Total Amount</label>
                        <input type="number" className="form-control modal-amount" name="amount" id="amount" placeholder="Ex: 100" required />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="unit" className="col-form-label">Unit</label>
                        <input type="text" className="form-control modal-unit" name="unit" id="unit" placeholder="Ex: questions" required />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="start_date" className="col-form-label">Start Date</label>
                        <input type="date" className="form-control modal-start" name="start_date" id="start_date" required />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="end_date" className="col-form-label">End Date</label>
                        <input type="date" className="form-control modal-end" name="end_date" id="end_date" required />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
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

module.exports = Edit;
