const React = require('react');
const moment = require('moment');

class Progress extends React.Component {
  render() {
    const goal = this.props.goal;
    let progress = goal.progress;

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
    //TODO: Add a new + button
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

    let display;
    if (goal.status === 3) {
      display = 'd-none';
    }

    return (
      <div className='card-body'>
        <p className="mb-0 text-left">{goal.title}</p>
        <small className="card-subtitle text-muted">Due: {moment(goal.end_date).format('YYYY-MM-DD')}</small>
        <div className={`row my-3 ${display}`}>
          <div className="col d-flex justify-content-center align-items-center">
            <span className="h5">
              {progressPercentage}
            </span>
          </div>
          <div className="col d-flex justify-content-center align-items-center">
            <button type="button" className="btn btn-outline-primary rounded-circle" data-toggle="modal" data-target="#newProgressModal" data-goalid={goal.id}>
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
        <div className={`progress ${display}`} data-toggle="tooltip" data-placement="bottom" title={`${progressPercentage} / ${targetPercentage}`}>
          <div className='progress-bar' role="progressbar" style={{ width: firstBarWidth }}></div>
          <div className={secondBarStyle} role="progressbar" style={{ width: secondBarWidth }}></div>
        </div>

      </div>
    );
  }
}

module.exports = Progress;
