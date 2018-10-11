const React = require('react');
const Navigation = require('../layout/Navigation');
const FormGoal = require('./FormGoal');

class New extends React.Component {
  render() {
    const goal = {
      title: '',
      amount: '',
      unit: '',
      start_date: this.props.startDate,
      repeat_interval: 1,
      end_date: this.props.endDate
    };

    return (
      <Navigation>
        {/* <FormGoal
          title="Achieve your goal by dividing an amount over a period of time"
          subtitle="Ex: Solve 50 coding interview questions in a month"
          action="/goals/new"
          btn="Add Goal"
          goal={goal}
        /> */}

      </Navigation >
    );
  }
}

module.exports = New;
