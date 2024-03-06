function fetchDataAndDrawChart(startIndex, endIndex, device) {
  fetch("../data/3_th_year_pseudo_labels.json")
    .then((response) => response.json())
    .then((data) => {
      // Slice the data based on provided start and end indices
      let slicedElements = data.slice(startIndex, endIndex);
      drawChart(slicedElements, parseInt(startIndex), device); // Call drawChart after the data is fetched and slicedElements is populated
    })
    .catch((error) => console.error("Error loading JSON file:", error));
  console.log(startIndex, endIndex, device);
  // console.log(slicedElements)
}

google.charts.load("current", { packages: ["line"] });
function drawChart(slicedElements, startIndex, device) {
  console.log(typeof startIndex);
  var data = new google.visualization.DataTable();
  data.addColumn("number", "Time (6s samples)");
  data.addColumn("number", `${device}`);

  const makerows = slicedElements.map((item, index) => {
    return [startIndex + index, item];
  });

  data.addRows(makerows);

  var options = {
    chart: {
      title: "Power consumption",
      // subtitle: 'in millions of dollars (USD)'
    },
    width: 1200,
    height: 500,
    axes: {
      x: {
        0: { side: "bottom" },
      },
    },
  };

  var chart = new google.charts.Line(document.getElementById("line_top_x"));
  chart.draw(data, google.charts.Line.convertOptions(options));
}

window.fetchDataAndDrawChart = fetchDataAndDrawChart;
