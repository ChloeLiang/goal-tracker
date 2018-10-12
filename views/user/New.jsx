const React = require('react');
const Layout = require('../layout/Layout');

class New extends React.Component {
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
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <h1 className="mb-3">Register</h1>
              {error}
              <form action="/users" method="POST">
                <div className="form-group">
                  <label htmlFor="name">Username</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                  />
                </div>
                <div className="form-group text-center">
                  <input
                    type="submit"
                    className="btn btn-primary btn-block"
                    value="Register"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

module.exports = New;
