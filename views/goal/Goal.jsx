const React = require('react');
const moment = require('moment');
const Progress = require('./Progress');

class Goal extends React.Component {
  render() {
    const goal = this.props.goal;
    const startDate = moment(goal.start_date, 'YYYY-MM-DD');
    const endDate = moment(goal.end_date, 'YYYY-MM-DD');

    let cover;
    if (goal.cover) {
      cover = <img className="card-img-top mt-3" src={goal.cover} alt="cover image"></img>;
    }

    return (
      <div className="card shadow-sm border-secondary">
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
                <form className="modal-form" method="POST">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="title" className="col-form-label">Title</label>
                          <input type="text" className="form-control modal-title" name="title" id="title" placeholder="Ex: Solve 100 coding interview questions" required />
                        </div>
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

        <div className="card-header text-right py-1 bg-light">
          <div className="dropdown">
            <button className="btn bg-transparent dropdown-toggle py-0" type="button" id="dropdownGoalMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-ellipsis-h"></i>
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownGoalMenuButton">
              <button type="button" className="btn" data-toggle="modal" data-target="#editGoalModal" data-goalid={goal.id} data-title={goal.title} data-amount={goal.amount} data-unit={goal.unit} data-start={startDate.format('YYYY-MM-DD')} data-end={endDate.format('YYYY-MM-DD')}>Edit</button>
              <form action={`/goals/${goal.id}?_method=DELETE`} method="POST">
                <input type="submit" className="btn" value="Delete" />
              </form>
            </div>
          </div>
        </div>
        {cover}
        <Progress
          goal={goal}
        />
      </div>
    );
  }
}

module.exports = Goal;
