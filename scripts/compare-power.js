
// google.charts.setOnLoadCallback(drawChart);

const deviceList = ["fridge", "washing_machine","fake"];

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

laodDeviceEnergyUsage(deviceList, 1000, 3000,3);

function laodDeviceEnergyUsage(deviceList, startIndex, endIndex,year) {
  let fileUrls = [];
  for (let device of deviceList) {
    let newUrl = `../data/${year}_th_year_${device}_prediction.json`;
    fileUrls.push(newUrl);
  }

  console.log(fileUrls);

  let loadedDeviceData = [];
  console.log(startIndex, endIndex, fileUrls);

  let fetchPromises = []; // Array to store promises for each fetch operation

  for (let url of fileUrls) {
    console.log("hi0");
    // Push the promise returned by fetchData into the fetchPromises array
    fetchPromises.push(
      fetchDeviceData(url).then((fetchedData) => {
        let slicedElements = fetchedData.slice(startIndex, endIndex);
        loadedDeviceData.push(slicedElements);
        console.log("hi1");
      })
    );
  }

  // Wait for all fetch operations to complete
  Promise.all(fetchPromises)
    .then(() => {
      console.log("hi2");
      ///////////output is here
      console.log("about to send");
      takeDataToOutSide(loadedDeviceData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  // console.log(loadedDeviceData);
}

function takeDataToOutSide(dataObtained) {
  // console.log(dataObtained)
  calculateEnergyUsage(dataObtained);
}

function calculateEnergyUsage(dataToFindArea) {
  console.log(dataToFindArea);
  let lotalPowerValues = [];
  for (let data of dataToFindArea) {
    const EnergyArray = data.map((element) => element * 6);
    const accumulatedEnergy =
      EnergyArray.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      ) /
      (3600 * 1000)*3;

    lotalPowerValues.push(accumulatedEnergy);
  }
  console.log(lotalPowerValues);

  makeTable(lotalPowerValues, deviceList);
}


function makeTable(lotalPowerValues, deviceList) {
  console.log(deviceList);
  const tableOfData = [["Device", "Energy Usage (kWh)"]];
  for (let i = 0; i < deviceList.length; i++) {
    let datapoint = [`${deviceList[i]}`, parseInt(lotalPowerValues[i])];
    tableOfData.push(datapoint);
  }
  drawChart(tableOfData);
}

google.charts.load("current", { packages: ["corechart"] });
function drawChart(tableOfData) {
  console.log(tableOfData);
  var data = google.visualization.arrayToDataTable(tableOfData);

  var options = {
    title: "My Daily Activities",
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );

  chart.draw(data, options);
}
