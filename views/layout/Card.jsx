const React = require('react');
const moment = require('moment');

class Card extends React.Component {
  render() {
    const editUrl = `/goals/${this.props.id}/edit`;
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
          <div className="progress" data-toggle="tooltip" data-placement="top" title="Your progress">
            <div className="progress-bar" role="progressbar" style={{ width: '25%' }}>25%</div>
          </div>
          <div className="progress" data-toggle="tooltip" data-placement="top" title="Target progress">
            <div className="progress-bar" role="progressbar" style={{ width: '25%' }}>25%</div>
          </div>
        </div>
        <div className="card__control">
          <button className="btn btn-primary">Save Progress</button>
          <a href={editUrl} className="btn btn-primary">Edit</a>
        </div>
      </div>
    );
  }
}

module.exports = Card;
