const React = require('react');
const moment = require('moment');

class Goal extends React.Component {
  render() {
    const goal = this.props.goal;
    let progress = goal.progress || 0;

    if (progress > goal.amount) {
      progress = goal.amount;
    }

    const startDate = moment(goal.start_date, 'YYYY-MM-DD');
    const endDate = moment(goal.end_date, 'YYYY-MM-DD');
    const diff = endDate.diff(startDate, 'days') + 1;

    let multiplier;
    if (moment().isSameOrAfter(endDate)) {
      multiplier = diff;
    } else if (moment().isSameOrAfter(startDate)) {
      multiplier = moment().diff(startDate, 'days') + 1;
    } else {
      multiplier = 0;
    }

    const target = Math.ceil(goal.amount / diff * multiplier);

    //TODO: Lock the progress bar if task is completed.
    //TODO: Hide add button if goal is completed.
    let secondBarStyle, firstBarWidth, secondBarWidth;
    const barStyle = 'progress-bar';
    if (target === progress) {
      firstBarWidth = target;
      secondBarWidth = 0;
    } else if (target >= progress) {
      secondBarStyle = `${barStyle} bg-danger`;
      firstBarWidth = progress;
      secondBarWidth = target - progress;
    } else {
      secondBarStyle = `${barStyle} bg-primary`;
      firstBarWidth = target;
      secondBarWidth = progress - target;
    }

    firstBarWidth = firstBarWidth / goal.amount * 100 + '%';
    secondBarWidth = secondBarWidth / goal.amount * 100 + '%';
    const progressPercentage = Math.floor(progress / goal.amount * 100) + '%';
    const targetPercentage = Math.floor(target / goal.amount * 100) + '%';

    let cardStyle = 'card shadow text-center';
    let cardHeaderStyle = 'card-header text-right';

    // status: upcoming = 0, overdue = 1, ongoing = 2, completed = 3
    if (goal.status === 0) {
      cardStyle = `${cardStyle} border-secondary`;
      cardHeaderStyle = `${cardHeaderStyle} bg-secondary`;
    } else if (goal.status === 2) {
      cardStyle = `${cardStyle} border-warning`;
      cardHeaderStyle = `${cardHeaderStyle} bg-warning`;
    } else if (goal.status === 3) {
      cardStyle = `${cardStyle} border-success`;
      cardHeaderStyle = `${cardHeaderStyle} bg-success`;
    } else if (goal.status === 1) {
      cardStyle = `${cardStyle} border-danger`;
      cardHeaderStyle = `${cardHeaderStyle} bg-danger`;
    }

    return (
      <div className={cardStyle}>
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

        <div className={cardHeaderStyle}>
          <div className="dropdown">
            <button className="btn bg-transparent dropdown-toggle py-0" type="button" id="dropdownGoalMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-ellipsis-h"></i>
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownGoalMenuButton">
              <button type="button" className="btn" data-toggle="modal" data-target="#editGoalModal" data-goalid={goal.id} data-title={goal.title} data-amount={goal.amount} data-unit={goal.unit} data-start={startDate.format('YYYY-MM-DD')} data-end={endDate.format('YYYY-MM-DD')}>Edit</button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">{goal.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Due: {moment(goal.end_date).format('YYYY-MM-DD')}</h6>
          <div className="row my-3">
            <div className="col d-flex justify-content-center align-items-center">
              <span className="h5">
                {progressPercentage}
              </span>
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <button type="button" className="btn btn-lg btn-outline-primary rounded-circle" data-toggle="modal" data-target="#newProgressModal" data-goalid={goal.id}>
                <i className="fas fa-pencil-alt"></i>
              </button>
              <div className="modal fade" id="newProgressModal" tabIndex="-1" role="dialog" aria-labelledby="newProgressModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="newProgressModalLabel">Update Progress</h5>
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
                          <input type="submit" className="btn btn-primary" value="Add" />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <p className="h5">{progress} / {target}</p>
            </div>
          </div>
          <div className="progress" data-toggle="tooltip" data-placement="bottom" title={`${progressPercentage} / ${targetPercentage}`}>
            <div className='progress-bar' role="progressbar" style={{ width: firstBarWidth }}></div>
            <div className={secondBarStyle} role="progressbar" style={{ width: secondBarWidth }}></div>
          </div>

        </div>
      </div>
    );
  }
}

module.exports = Goal;
