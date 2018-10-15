const React = require('react');
const Navigation = require('./layout/Navigation');
class Home extends React.Component {
  render() {
    return (
      <Navigation username={this.props.username}>
        <div className="container-home">
        </div>
      </Navigation>
    );
  }
}

module.exports = Home;
