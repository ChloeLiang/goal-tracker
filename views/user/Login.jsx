const React = require('react');
const Layout = require('../layout/Layout');

class Login extends React.Component {
  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="alert alert-danger" role="alert">
          {this.props.error}
        </div>
      );
    }

    return (
      <Layout>
        <div className="container container--login mt-5">
          <h1 className="mb-3">Sign in</h1>
          {error}
          <form action="/login" method="POST">
            <div className="form-group">
              <label htmlFor="name">Username</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                placeholder="Username"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
              />
            </div>
            <input
              className="btn btn-primary"
              type="submit"
              value="Login"
            />
          </form>
        </div>
      </Layout>
    );
  }
}

module.exports = Login;
