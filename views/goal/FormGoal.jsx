const React = require('react');

class FormGoal extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="form__description u--center">
          <h3 className="heading--3">
            {this.props.title}
          </h3>
          <p className="text--small">
            {this.props.subtitle}
          </p>
        </div>
        <form className="form" action={this.props.action} method="POST">
          <div className="form__group">
            <label
              className="form__label"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="form__input"
              type="text"
              name="title"
              id="title"
              placeholder="Add your goal..."
              defaultValue={this.props.goal.title}
              required
            />
          </div>

          <div className="form__col-2">
            <div className="form__group">
              <label
                className="form__label"
                htmlFor="amount"
              >
                Total amount
              </label>
              <input
                className="form__input"
                type="number"
                name="amount"
                placeholder="Total amount"
                defaultValue={this.props.goal.amount}
                required
              />
            </div>

            <div className="form__group">
              <label
                className="form__label"
                htmlFor="unit"
              >
                Unit
              </label>
              <input
                className="form__input"
                type="text"
                name="unit"
                placeholder="Unit (ex: questions, pages, lessons)"
                defaultValue={this.props.goal.unit}
                required
              />
            </div>
          </div>

          <div className="form__col-2">

            <div className="form__group">
              <label
                className="form__label"
                htmlFor="start_date"
              >
                Start Date
            </label>
              <input
                className="form__input"
                type="date"
                name="start_date"
                id="start_date"
                defaultValue={this.props.goal.start_date}
                required
              />
            </div>

            <div className="form__group">
              <label
                className="form__label"
                htmlFor="end_date"
              >
                End Date
            </label>
              <input
                type="date"
                className="form__input"
                name="end_date"
                id="end_date"
                defaultValue={this.props.goal.end_date}
                required
              />
            </div>
          </div>

          <div className="form__group">
            <label
              className="form__label"
              htmlFor="repeat_interval"
            >
              Repeat every
              </label>
            <input
              className="form__input"
              type="number"
              name="repeat_interval"
              id="repeat_interval"
              defaultValue={this.props.goal.repeat_interval}
              required
            />
            <label
              className="form__label form__label--unit"
              htmlFor="repeat_interval"
            >
              day
              </label>
          </div>

          <div className="form__group u--center u--margin-y-big">
            <input className="btn" type="submit" value={this.props.btn} />
          </div>
        </form>
      </React.Fragment>
    );
  }
}

module.exports = FormGoal;
