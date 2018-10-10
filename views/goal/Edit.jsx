const React = require('react');
const moment = require('moment');
const Navigation = require('../layout/Navigation');
const FormGoal = require('./FormGoal');

class Edit extends React.Component {
  render() {
    const goal = this.props.goal;
    goal.start_date = moment(goal.start_date).format('YYYY-MM-DD');
    goal.end_date = moment(goal.end_date).format('YYYY-MM-DD');

    const updateUrl = `/goals/${goal.id}?_method=PUT`;

    return (
      <Navigation>
        <FormGoal
          action={updateUrl}
          title="Achieve your goal by dividing an amount over a period of time"
          subtitle="Ex: Solve 50 coding interview questions in a month"
          btn="Update Goal"
          goal={goal}
        />
      </Navigation >
    );
  }
}

module.exports = Edit;
