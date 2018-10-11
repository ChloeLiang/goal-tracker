const React = require('react');
const Navigation = require('../layout/Navigation');
const Card = require('../layout/Card');

class Index extends React.Component {
  render() {
    let goals;

    if (this.props.goals) {
      goals = this.props.goals.map(goal => {
        const progressTotal = this.props.progressTotal.find(progress => {
          return progress.goal_id === goal.id;
        });

        const progressToday = this.props.progressToday.find(progress => {
          return progress.goal_id === goal.id;
        });

        let totalProgress = 0;
        let todayProgress = 0;

        if (progressTotal) {
          totalProgress = progressTotal.total;
        }

        if (progressToday) {
          todayProgress = progressToday.today;
        }

        return (
          <Card
            key={goal.id}
            id={goal.id}
            title={goal.title}
            startDate={goal.start_date}
            endDate={goal.end_date}
            status={goal.status}
            amount={goal.amount}
            progressTotal={totalProgress}
            progressToday={todayProgress}
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
