const React = require('react');

class Navigation extends React.Component {
  render() {
    return (
      <nav className="nav">
        <a className="btn--nav nav__brand" href="/">GoalTracker</a>
        <ul className="nav__list">
          <li className="nav__item">
            <a href="/goals/new" className="btn--nav nav__link">+ Add Goal</a>
          </li>
          <li className="nav__item">
            <a className="btn--nav nav__link" href="/logout">
              Logout
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

module.exports = Navigation;
