const React = require('react');

class TopNav extends React.Component {
  render() {
    let register, login, logout, user, nav, addGoal;

    if (this.props.username) {
      user = (
        <li className="nav-item">
          <a className="nav-link text-info" href="#">{this.props.username}</a>
        </li>
      );

      logout = (
        <li className="nav-item">
          <a className="nav-link" href="/logout">Logout</a>
        </li>
      );

      nav = (
        <React.Fragment>
          <li className="nav-item nav-goal">
            <a href="#ongoing" className="nav-link">Ongoing</a>
          </li>
          <li className="nav-item nav-goal">
            <a href="#upcoming" className="nav-link">Upcoming</a>
          </li>
          <li className="nav-item nav-goal">
            <a href="#completed" className="nav-link">Completed</a>
          </li>
        </React.Fragment>
      );

      addGoal = (
        <li className="nav-item">
          <button type="button" className="btn btn-outline-primary text-light btn-add-nav mr-3" data-toggle="modal" data-target="#newGoalModal"><i className="fas fa-plus"></i> New Goal</button>
        </li>
      );
    } else {
      register = (
        <li className="nav-item">
          <a className="nav-link" href="/users/new">Register</a>
        </li>
      );

      login = (
        <li className="nav-item">
          <a className="nav-link" href="/login">Login</a>
        </li>
      );
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <a className="navbar-brand" href="/goals">GoalTracker</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav text-center ml-auto">
            {addGoal}
            {nav}
            {register}
            {login}
            {user}
            {logout}
          </ul>
        </div>
        <button type="button" className="btn btn-primary btn-lg btn-add-round" data-toggle="modal" data-target="#newGoalModal"><i className="fas fa-plus"></i></button>
      </nav>
    );
  }
}

module.exports = TopNav;
