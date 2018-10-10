const React = require('react');
const Navigation = require('../layout/Navigation');

class New extends React.Component {
  render() {
    return (
      <Navigation>
        <div className="form__description u--center">
          <h3 className="heading--3">
            Achieve your goal by dividing an amount over a period of time
          </h3>
          <p className="text--small">
            Ex: Solve 50 coding interview questions in a month
          </p>
        </div>
        <form className="form" action="/goals/new" method="POST">
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
                required
              />
            </div>
          </div>

          <div className="form__group">
            <label
              className="form__label"
              htmlFor="repeat_start"
            >
              Start Date
            </label>
            <input
              className="form__input"
              type="date"
              name="repeat_start"
              id="repeat_start"
              defaultValue={this.props.startDate}
              required
            />
          </div>

          <div className="form__col-2">
            <div className="form__group">
              <label
                className="form__label"
                htmlFor="repeat_interval"
              >
                Repeat
            </label>
              <select
                name="repeat_type"
                id="repeat_type"
                className="form__input">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div className="form__group">
              <label
                className="form__label"
                htmlFor="repeat_interval"
              >
                Every
              </label>
              <input
                className="form__input"
                type="number"
                name="repeat_interval"
                id="repeat_interval"
                defaultValue="1"
                required
              />
              <label
                className="form__label form__label--unit"
                htmlFor="repeat_interval"
              >
                day
              </label>
            </div>
          </div>

          <div className="form__group">
            <label
              className="form__label"
              htmlFor="repeat_end"
            >
              End Date
            </label>
            <input
              type="date"
              className="form__input"
              name="repeat_end"
              id="repeat_end"
              defaultValue={this.props.endDate}
              required
            />
          </div>
          <div className="form__group u--center u--margin-y-big">
            <input className="btn" type="submit" value="Add Goal" />
          </div>
        </form>
      </Navigation >
    );
  }
}

module.exports = New;
