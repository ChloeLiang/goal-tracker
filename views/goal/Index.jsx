const React = require('react');
const Navigation = require('../layout/Navigation');
const Goal = require('./Goal');

class Index extends React.Component {
  render() {
    const goals = this.props.goals;
    let ongoingList, upcomingList, completedList;

    if (goals) {
      const ongoing = goals.filter(goal => {
        return goal.status === 'ongoing' || goal.status === 'overdue';
      });

      ongoingList = ongoing.map(goal => {
        if (goal.status === 'ongoing') {
          return (
            <div key={goal.id} className="goal--ongoing col-sm-6 my-2">
              <Goal goal={goal} />
            </div>
          );
        }

        return (
          <div key={goal.id} className="goal--overdue col-sm-6 my-2">
            <Goal goal={goal} />
          </div>
        );
      });

      const upcoming = goals.filter(goal => {
        return goal.status === 'upcoming';
      });

      upcomingList = upcoming.map(goal => {
        return (
          <div key={goal.id} className="goal--upcoming col-sm-6 my-2">
            <Goal goal={goal} />
          </div>
        );
      });

      const completed = goals.filter(goal => {
        return goal.status === 'completed';
      });

      completedList = completed.map(goal => {
        return (
          <div key={goal.id} className="goal--completed col-sm-6 my-2">
            <Goal goal={goal} />
          </div>
        );
      });

    } else {
      upcomingList = (
        <div className="col text-center">
          <small className="text-muted">There's no upcoming goal.</small>
        </div>
      );

      ongoingList = (
        <div className="col text-center">
          <small className="text-muted">You have nothing in progress.</small>
        </div>
      );

      completedList = (
        <div className="col text-center">
          <small className="text-muted">You haven't completed any goal.</small>
        </div>
      );
    }

    return (
      <Navigation username={this.props.username}>
        <div className="container-fluid container--main my-5 py-3">
          <div id="ongoing" className="container-fluid my-3">
            <div className="row text-center">
              <div className="col">
                <h6>Ongoing</h6>
              </div>
            </div>
            <div className="row">
              {ongoingList}
            </div>
          </div>

          <div id="upcoming" className="container-fluid my-3">
            <div className="row">
              <div className="col text-center">
                <h6>Upcoming</h6>
              </div>
            </div>
            <div className="row">
              {upcomingList}
            </div>
          </div>

          <div id="completed" className="container-fluid my-3">
            <div className="row">
              <div className="col text-center">
                <h6>Completed</h6>
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
