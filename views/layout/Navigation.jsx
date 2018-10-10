const React = require('react');
const Layout = require('./Layout');
const TopNav = require('./TopNav');
const Sidebar = require('./Sidebar');

class Navigation extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container-body">
          <TopNav />
          <div className="main">
            <Sidebar />
            <div className="container-content">
              {this.props.children}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

module.exports = Navigation;
