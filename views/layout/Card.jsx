const React = require('react');
const moment = require('moment');

class Card extends React.Component {
  render() {
    return (
      <div className="card">
        <h2 className="card__title">{this.props.title}</h2>
        <p className="card__progess">
          <span>progress / {this.props.amount}</span>
          <span>{this.props.unit}</span>
        </p>
        <div className="card__interval">
          <p>Start Date: {moment(this.props.startDate).format('YYYY-MM-DD')}</p>
          <p>End Date: {moment(this.props.endDate).format('YYYY-MM-DD')}</p>
        </div>
        <div className="card__progress">
          <div className="progress-bar progress--user"></div>
          <div className="progress-bar progress--target"></div>
        </div>
      </div>
    );
  }
}

module.exports = Card;
