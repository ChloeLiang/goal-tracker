$(document).ready(function() {
  var labels = $('.detail').attr('data-labels');
  var data = $('.detail').attr('data-history');

  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: labels.split(','),
      datasets: [
        {
          label: 'progress',
          backgroundColor: 'rgba(0, 0, 255, .7)',
          data: data.split(','),
        },
      ],
    },

    // Configuration options go here
    options: {
      responsive: true,
      scales: {
        xAxes: [
          {
            maxBarThickness: 50,
          },
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              suggestedMin: 0,
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
});
