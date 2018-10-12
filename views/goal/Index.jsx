const React = require('react');
const Navigation = require('../layout/Navigation');
const Goal = require('./Goal');

class Index extends React.Component {
  render() {
    // let goals;

    // if (this.props.goals) {
    //   goals = this.props.goals.map(goal => {
    //     const startDate = moment(goal.start_date, 'YYYY-MM-DD');
    //     const endDate = moment(goal.end_date, 'YYYY-MM-DD');
    //     const diff = endDate.diff(startDate, 'days') + 1;
    //     const multiplier = moment().diff(startDate, 'days') + 1;
    //     let amountTarget;
    //     if (diff === 0) {
    //       amountTarget = 100;
    //     } else {
    //       amountTarget = Math.floor(goal.amount / diff * multiplier);
    //     }

    //     const progressTotal = this.props.progressTotal.find(progress => {
    //       return progress.goal_id === goal.id;
    //     });

    //     let percentageAchieved;
    //     const percentageTarget = amountTarget / goal.amount * 100;
    //     if (progressTotal.total >= goal.amount) {
    //       percentageAchieved = 100;
    //     } else if (progressTotal.total === 0) {
    //       percentageAchieved = 0;
    //     } else {
    //       percentageAchieved = Math.floor(progressTotal.total / goal.amount * 100);
    //     }

    //     return (
    //       <Card
    //         key={goal.id}
    //         id={goal.id}
    //         title={goal.title}
    //         startDate={goal.start_date}
    //         endDate={goal.end_date}
    //         status={goal.status}
    //         amountTotal={goal.amount}
    //         amountTarget={amountTarget}
    //         percentageTarget={percentageTarget}
    //         amountAchieved={progressTotal.total}
    //         percentageAchieved={percentageAchieved}
    //         unit={goal.unit}
    //       />
    //     );
    //   });
    // }

    const goals = this.props.goals;
    let ongoingList, upcomingList, completedList;

    if (goals) {
      const ongoing = goals.filter(goal => {
        return goal.status === 'ongoing' || goal.status === 'overdue';
      });

      ongoingList = ongoing.map(goal => {
        if (goal.status === 'ongoing') {
          return (
            <div key={goal.id} className="goal--ongoing col-md-6 my-2">
              <Goal goal={goal} />
            </div>
          );
        }

        return (
          <div key={goal.id} className="goal--overdue col-md-6 my-2">
            <Goal goal={goal} />
          </div>
        );
      });

      const upcoming = goals.filter(goal => {
        return goal.status === 'upcoming';
      });

      upcomingList = upcoming.map(goal => {
        return (
          <div key={goal.id} className="goal--upcoming col-md-6 my-2">
            <Goal goal={goal} />
          </div>
        );
      });

      const completed = goals.filter(goal => {
        return goal.status === 'completed';
      });

      completedList = completed.map(goal => {
        return (
          <div key={goal.id} className="goal--completed col-md-6 my-2">
            <Goal goal={goal} />
          </div>
        );
      });

    } else {
      goals = (
        <div key={goal.id} className="col-md-6 mx-auto text-center">
          <p>You don't have any goals.</p>
        </div>
      );
    }

    return (
      <Navigation username={this.props.username}>
        <div className="container-fluid container--main mt-3 mb-5">
          <div className="container-fluid container--ongoing my-3">
            <div className="row">
              <div className="col">
                <h4 className="lead">Ongoing</h4>
              </div>
            </div>
            <div className="row">
              {ongoingList}
            </div>
          </div>

          <div className="container-fluid container--upcoming my-3">
            <div className="row">
              <div className="col">
                <h4 className="lead">Upcoming</h4>
              </div>
            </div>
            <div className="row">
              {upcomingList}
            </div>
          </div>

          <div className="container-fluid container--completed my-3">
            <div className="row">
              <div className="col">
                <h4 className="lead">Completed</h4>
              </div>
            </div>
            <div className="row">
              {completedList}
            </div>
          </div>
        </div>
      </Navigation>
    );
  }
}

module.exports = Index;
