const React = require('react');
const moment = require('moment');
const Navigation = require('../layout/Navigation');
const Card = require('../layout/Card');

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

    return (
      <Navigation username={this.props.username}>
        {/* <div className="container-goals">
          {goals}
        </div> */}
      </Navigation>
    );
  }
}

module.exports = Index;
