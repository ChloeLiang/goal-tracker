const React = require('react');
const Layout = require('./Layout');
const TopNav = require('./TopNav');
const New = require('../goal/New');

class Navigation extends React.Component {
  render() {
    return (
      <Layout>
        <TopNav username={this.props.username} />
        <New />
        {this.props.children}
      </Layout>
    );
  }
}

module.exports = Navigation;
