const React = require('react');
const Navigation = require('../layout/Navigation');
const Goal = require('./Goal');

class Index extends React.Component {
  render() {
    const goals = this.props.goals;
    let ongoingList, upcomingList, completedList, overdueList;

    if (goals) {
      const ongoing = goals.filter(goal => {
        return goal.status === 2;
      });

      ongoingList = ongoing.map(goal => {
        return (
          <div key={goal.id} className="col-sm-6 col-lg-12 my-3">
            <Goal goal={goal} />
          </div>
        );
      });

      const overdue = goals.filter(goal => {
        return goal.status === 1;
      });

      overdueList = overdue.map(goal => {
        return (
          <div key={goal.id} className="col-sm-6 col-lg-12 my-3">
            <Goal goal={goal} />
          </div>
        );
      });

      const upcoming = goals.filter(goal => {
        return goal.status === 0;
      });

      upcomingList = upcoming.map(goal => {
        return (
          <div key={goal.id} className="col-sm-6 col-lg-12 my-3">
            <Goal goal={goal} />
          </div>
        );
      });

      const completed = goals.filter(goal => {
        return goal.status === 3;
      });

      completedList = completed.map(goal => {
        return (
          <div key={goal.id} className="col-sm-6 col-md-12 my-3">
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
        <div id="main" className="container-fluid">
          <div id="ongoing" className="container-fluid my-3">
            <div className="row text-center mb-3">
              <div className="col">
                <h6>Ongoing</h6>
              </div>
            </div>
            <div className="row container-goal">
              {overdueList}
              {ongoingList}
            </div>
          </div>

          <div id="upcoming" className="container-fluid my-3">
            <div className="row">
              <div className="col text-center mb-3">
                <h6>Upcoming</h6>
              </div>
            </div>
            <div className="row container-goal">
              {upcomingList}
            </div>
          </div>

          <div id="completed" className="container-fluid my-3">
            <div className="row">
              <div className="col text-center mb-3">
                <h6>Completed</h6>
              </div>
            </div>
            <div className="row container-goal">
              {completedList}
            </div>
          </div>
        </div>
      </Navigation>
    );
  }
}

module.exports = Index;
