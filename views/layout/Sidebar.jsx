const React = require('react');

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <a href="#" className="sidebar-nav">Today</a>
        <a href="/goals" className="sidebar-nav">Goals</a>
      </div>
    );
  }
}

module.exports = Sidebar;
