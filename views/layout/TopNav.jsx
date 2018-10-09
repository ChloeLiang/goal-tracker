const React = require('react');

class Navigation extends React.Component {
  render() {
    return (
      <nav className="nav navbar navbar-expand-lg navbar-dark bg-secondary">
        <a className="navbar-brand" href="/">GoalTracker</a>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/logout">
              Logout
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

module.exports = Navigation;
