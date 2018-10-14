const React = require('react');
const Navigation = require('../layout/Navigation');

class Show extends React.Component {
  render() {
    return (
      <Navigation username={this.props.username}>
        <div className="container-fluid main">
          Show detail
        </div>
      </Navigation>
    );
  }
}

module.exports = Show;
