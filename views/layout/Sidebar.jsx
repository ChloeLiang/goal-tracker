const React = require('react');

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <a href="/goals/today" className="sidebar__nav">Today</a>
        <a href="/goals?status=active" className="sidebar__nav">Goals</a>
      </div>
    );
  }
}

module.exports = Sidebar;
