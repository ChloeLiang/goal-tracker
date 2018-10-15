const React = require('react');
const Navigation = require('./layout/Navigation');
class Home extends React.Component {
  render() {
    return (
      <Navigation username={this.props.username}>
        <div className="container-home">
          <img className="hero-image" src="https://res.cloudinary.com/nliangxin/image/upload/c_scale,w_1038/v1539606574/home_wi9ric.jpg" alt="Hero image" />
        </div>
      </Navigation>
    );
  }
}

module.exports = Home;
