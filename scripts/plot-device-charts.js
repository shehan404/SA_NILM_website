function fetchDeviceData(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function fetchDataAndDrawDeviceChart(startIndex, endIndex, device, year) {
  let targetAndPredictions = [];
  let fileUrls = [
    `../data/${year}_th_year_${device}_target.json`,
    `../data/${year}_th_year_${device}_prediction.json`,
  ]; //be carefull with order
  console.log(startIndex, endIndex, fileUrls);

  let fetchPromises = []; // Array to store promises for each fetch operation

  for (let url of fileUrls) {
    console.log("hi0");
    // Push the promise returned by fetchData into the fetchPromises array
    fetchPromises.push(
      fetchDeviceData(url).then((fetchedData) => {
        let slicedElements = fetchedData.slice(startIndex, endIndex);
        targetAndPredictions.push(slicedElements);
        console.log("hi1");
      })
    );
  }

  // Wait for all fetch operations to complete
  Promise.all(fetchPromises)
    .then(() => {
      console.log("hi2");
      ///////////output is here
      drawDeviceChart(targetAndPredictions, startIndex, device);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function mapDeviceDataToPlot(arrayOfData, startIndex) {
  if (
    Array.isArray(arrayOfData) &&
    arrayOfData.length > 0 &&
    Array.isArray(arrayOfData[0])
  ) {
    let rowsOfData = arrayOfData[0].map((value, index) => [
      startIndex + index,
      value,
      arrayOfData[1][index],
    ]);
    console.log(rowsOfData);
    return rowsOfData;
  } else {
    console.log("Invalid input or empty array");
  }
}

google.charts.load("current", { packages: ["line"] });
// google.charts.setOnLoadCallback(drawDeviceChart);
function drawDeviceChart(dataToPlot, startIndex, device) {
  console.log("dat to plot", dataToPlot);

  var data = new google.visualization.DataTable();

  data.addColumn("number", "Time (6s samples)");
  data.addColumn("number", "Target");
  data.addColumn("number", "Prediction");

  
 
  data.addRows(mapDeviceDataToPlot(dataToPlot, startIndex));

  var options = {
    chart: {
      title: `Power consumption of ${device}`,
    },
    width: 1400,
    height: 400,
    axes: {
      x: {
        0: { side: "bottom" },
      },
    },
    colors: ["blue", "orange"],
    hAxis: {
      gridlines: { count: 5 }, // Adjust the count as per your requirement for horizontal gridlines
    },
    vAxis: {
      gridlines: { count: 5 }, // Adjust the count as per your requirement for vertical gridlines
      title: "Power (W)",
      slantedText: false,
    },
    legend: { position: "bottom" },
  };

  var chart = new google.charts.Line(document.getElementById("device-chart"));
  chart.draw(data, google.charts.Line.convertOptions(options));


}

window.fetchDataAndDrawDeviceChart = fetchDataAndDrawDeviceChart;
