const React = require('react');
const moment = require('moment');

class Goal extends React.Component {
  render() {
    const goal = this.props.goal;
    let progress = goal.progress_sum || 0;

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
      secondBarStyle = `${barStyle} bg-success`;
      firstBarWidth = target;
      secondBarWidth = progress - target;
    }

    firstBarWidth = firstBarWidth / goal.amount * 100 + '%';
    secondBarWidth = secondBarWidth / goal.amount * 100 + '%';
    const progressPercentage = Math.floor(progress / goal.amount * 100) + '%';
    const targetPercentage = Math.floor(target / goal.amount * 100) + '%';

    let cardStyle = 'card shadow text-center';
    let cardHeaderStyle = 'card-header text-right';
    if (goal.status === 0) {
      cardStyle = `${cardStyle} border-secondary`;
      cardHeaderStyle = `${cardHeaderStyle} bg-secondary`;
    } else if (goal.status === 2) {
      cardStyle = `${cardStyle} border-primary`;
      cardHeaderStyle = `${cardHeaderStyle} bg-primary`;
    } else if (goal.status === 3) {
      cardStyle = `${cardStyle} border-success`;
      cardHeaderStyle = `${cardHeaderStyle} bg-success`;
    } else if (goal.status === 1) {
      cardStyle = `${cardStyle} border-danger`;
      cardHeaderStyle = `${cardHeaderStyle} bg-danger`;
    }

    return (
      <div className={cardStyle}>
        <div className={cardHeaderStyle}>
          <i className="fas fa-edit"></i>
          <i className="fas fa-trash"></i>
        </div>
        <div className="card-body">
          <h5 className="card-title">{goal.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Due: {moment(goal.end_date).format('YYYY-MM-DD')}</h6>
          <div className="row my-3">
            <div className="col">
              {progressPercentage}
            </div>
            <div className="col">
              <button type="button" className="btn btn-outline-primary rounded-circle" data-toggle="modal" data-target="#newProgressModal" data-goalid={goal.id}><i className="fas fa-plus"></i></button>
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
            <div className="col">
              <p className="h4">{progress} / {target}</p>
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
