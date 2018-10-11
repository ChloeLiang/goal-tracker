const React = require('react');
const Navigation = require('./layout/Navigation');
//TODO: Design home page
class Home extends React.Component {
  render() {
    return (
      <Navigation username={this.props.username}>
        <h1>Welcome to Goal Tracker</h1>
      </Navigation>
    );
  }
}

module.exports = Home;
