const React = require('react');
const moment = require('moment');

class Goal extends React.Component {
  render() {
    const goal = this.props.goal;
    const progress = goal.progress_sum || 0;

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

    firstBarWidth = Math.floor(firstBarWidth / goal.amount * 100) + '%';
    secondBarWidth = Math.floor(secondBarWidth / goal.amount * 100) + '%';
    const progressPercentage = Math.floor(progress / goal.amount * 100) + '%';
    const targetPercentage = Math.floor(target / goal.amount * 100) + '%';

    return (
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">{goal.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Due: {moment(goal.end_date).format('YYYY-MM-DD')}</h6>
          <p className="h4">{progress} / {target}</p>
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
