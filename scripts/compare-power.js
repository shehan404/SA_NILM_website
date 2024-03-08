google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

const deviceList=['fridge','washing_machine']



function drawChart() {

  var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Work',     10],
    ['Eat',      10],
    ['Commute',  10],
    ['Watch TV', 10],
    ['Sleep',    10]
  ]);

  var options = {
    title: 'My Daily Activities'
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}