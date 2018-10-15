const React = require('react');
const moment = require('moment');
const TopNav = require('../layout/TopNav');
class Show extends React.Component {
  render() {
    const goal = this.props.goal;
    const progress = this.props.progress;

    const start = moment(goal.start_date).format('YYYY-MM-DD');
    const end = moment(goal.end_date).format('YYYY-MM-DD');

    let labels = [];
    let history = [];
    if (progress.length > 0) {
      const begin = moment(progress[0].created_at, 'YYYY-MM-DD');
      const stop = moment(progress[progress.length - 1].created_at, 'YYYY-MM-DD');
      const duration = stop.diff(begin, 'days') + 1;
      for (let i = 0; i < duration; i++) {
        let day = begin.clone().add(i, 'day');
        let foundProgress = progress.find(element => {
          return day.isSame(element.created_at);
        });

        if (foundProgress) {
          history.push(foundProgress.amount);
        } else {
          history.push(0);
        }

        labels.push(day.format('MMM DD'));
      }
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossOrigin="anonymous"></link>
          <link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet"></link>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous" />
          <link rel="stylesheet" type="text/css" href="/style/style.css"></link>
          <title>Document</title>
        </head>
        <body>
          <TopNav username={this.props.username} />
          <div className="container detail" data-goalid={goal.id} data-labels={labels} data-history={history}>
            <div className="row text-center">
              <div className="col-12">
                <h3>{goal.title}</h3>
                <p className="m-0">{start} ~ {end}</p>
                <p>{goal.progress} / {goal.amount} {goal.unit}</p>
              </div>
              <div className="col-12">
                <canvas id="myChart" height="120"></canvas>
              </div>
            </div>

          </div>
          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossOrigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossOrigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js"></script>
          <script src="/script/chart.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = Show;
