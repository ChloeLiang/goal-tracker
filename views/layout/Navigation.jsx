const React = require('react');
const Layout = require('./Layout');
const TopNav = require('./TopNav');
const Sidebar = require('./Sidebar');

class Navigation extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container-main">
          <TopNav />
          <div className="main">
            <Sidebar />
            {this.props.children}
          </div>
        </div>
      </Layout>
    );
  }
}

module.exports = Navigation;
