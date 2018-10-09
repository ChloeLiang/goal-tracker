const React = require('react');
const Navigation = require('../layout/Navigation');

class Index extends React.Component {
  render() {
    return (
      <Navigation>
        <div className="goal"></div>
      </Navigation>
    );
  }
}

module.exports = Index;
