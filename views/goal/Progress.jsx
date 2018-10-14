const React = require('react');
const moment = require('moment');
const UpdateModal = require('../progress/UpdateModal');
const AddModal = require('../progress/AddModal');

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

    let display = 'd-flex'
    let date;
    if (goal.status === 3) {
      display = 'd-none';
      date = <small className="card-subtitle text-white bg-success rounded p-1">{moment(goal.complete_date).format('YYYY-MM-DD')}</small>;
    } else if (goal.status === 1) {
      date = <small className="card-subtitle text-white bg-danger rounded p-1">{moment(goal.end_date).format('YYYY-MM-DD')}</small>;
    } else {
      date = <small className="card-subtitle text-muted">{moment(goal.end_date).format('YYYY-MM-DD')}</small>;
    }

    return (
      <div className='card-body'>
        <p className="mb-0 text-left">{goal.title}</p>
        {date}
        <div className="container-fluid">
          <div className={`row my-1 ${display}`}>
            <div className="d-flex flex-grow-1 justify-content-start align-items-end">
              <span>{progress} / {target}</span>
              <small className="ml-1">{goal.unit}</small>
            </div>

            <div className="d-flex">
              <button type="button" className="btn btn-sm btn-outline-primary rounded-circle" data-toggle="modal" data-target="#updateProgressModal" data-goalid={goal.id} data-type="update">
                <i className="fas fa-pencil-alt"></i>
              </button>
              <UpdateModal />

              <button type="button" className="btn btn-sm btn-outline-primary rounded-circle ml-1" data-toggle="modal" data-target="#addProgressModal" data-goalid={goal.id} data-type="add">
                <i className="fas fa-plus"></i>
              </button>
              <UpdateModal />
            </div>
          </div>
        </div>

        <div className={`progress mt-2 ${display}`} data-toggle="tooltip" data-placement="bottom" title={`${progressPercentage} / ${targetPercentage}`}>
          <div className='progress-bar' role="progressbar" style={{ width: firstBarWidth }}></div>
          <div className={secondBarStyle} role="progressbar" style={{ width: secondBarWidth }}></div>
        </div>

      </div>
    );
  }
}

module.exports = Progress;
