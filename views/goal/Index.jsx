const React = require('react');
const moment = require('moment');
const Navigation = require('../layout/Navigation');
const Card = require('../layout/Card');

class Index extends React.Component {
  render() {
    let goals;

    if (this.props.goals) {
      goals = this.props.goals.map(goal => {
        const startDate = moment(goal.start_date, 'YYYY-MM-DD');
        const endDate = moment(goal.end_date, 'YYYY-MM-DD');
        const diff = endDate.diff(startDate, 'days');
        const multiplier = moment().diff(startDate, 'days');
        const amountTarget = Math.floor(goal.amount / diff * multiplier);

        const progressTotal = this.props.progressTotal.find(progress => {
          return progress.goal_id === goal.id;
        });

        let totalProgress = 0;

        if (progressTotal) {
          totalProgress = progressTotal.total;
        }

        return (
          <Card
            key={goal.id}
            id={goal.id}
            title={goal.title}
            startDate={goal.start_date}
            endDate={goal.end_date}
            status={goal.status}
            amountTotal={goal.amount}
            amountTarget={amountTarget}
            amountAchieved={totalProgress}
            unit={goal.unit}
          />
        );
      });
    }

    return (
      <Navigation>
        <div className="container-goals">
          {goals}
        </div>
      </Navigation>
    );
  }
}

module.exports = Index;
