const React = require('react');
const Navigation = require('../layout/Navigation');

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
      <Navigation>
        <div className="container mt-5 pt-5">
          <div className="row">
            <div className="col-md-6 mx-auto">
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
                  className="btn btn-primary btn-block"
                  type="submit"
                  value="Sign in"
                />
              </form>
            </div>
          </div>
        </div>
      </Navigation>
    );
  }
}

module.exports = Login;
