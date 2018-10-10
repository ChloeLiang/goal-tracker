const React = require('react');
const Navigation = require('../layout/Navigation');
const Card = require('../layout/Card');

class Index extends React.Component {
  render() {
    let goals;

    if (this.props.goals) {
      goals = this.props.goals.map(goal => {
        return (
          <Card
            key={goal.id}
            id={goal.id}
            title={goal.title}
            startDate={goal.start_date}
            endDate={goal.end_date}
            status={goal.status}
            amount={goal.amount}
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
