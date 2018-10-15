const React = require('react');
const moment = require('moment');
const Progress = require('./Progress');
const Edit = require('./Edit');

class Goal extends React.Component {
  render() {
    const goal = this.props.goal;
    const startDate = moment(goal.start_date, 'YYYY-MM-DD');
    const endDate = moment(goal.end_date, 'YYYY-MM-DD');

    let cover;
    if (goal.cover) {
      cover = <img className="card-img-top mt-3" src={goal.cover} alt="cover image"></img>;
    }

    return (
      <div className="card shadow-sm border-secondary">
        <Edit />

        <div className="card-header text-right py-1 bg-light">
          <div className="dropdown">
            <button className="btn bg-transparent dropdown-toggle py-0" type="button" id="dropdownGoalMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-ellipsis-h"></i>
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownGoalMenuButton">
              <a href={`/goals/${goal.id}`} className="dropdown-item">Detail</a>
              <button type="button" className="btn dropdown-item" data-toggle="modal" data-target="#editGoalModal" data-goalid={goal.id} data-title={goal.title} data-amount={goal.amount} data-unit={goal.unit} data-start={startDate.format('YYYY-MM-DD')} data-end={endDate.format('YYYY-MM-DD')} data-currentcover={goal.cover}>Edit</button>
              <form action={`/goals/${goal.id}?_method=DELETE`} method="POST">
                <input type="submit" className="btn dropdown-item" value="Delete" />
              </form>
            </div>
          </div>
        </div>
        {cover}
        <Progress
          goal={goal}
        />
      </div>
    );
  }
}

module.exports = Goal;
