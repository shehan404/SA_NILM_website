let formData ={
  device: 'none',
  from: 0,
  to: 0
}

function submitForm() {
  // Get form data
  formData = {
      device: document.getElementById("device").value,
      year: document.getElementById("year").value,
      from: document.getElementById("from").value,
      to: document.getElementById("to").value

      
  };
  
  // You can perform further operations here such as validation or AJAX submission
  
  // For demonstration, just log the form data
  // console.log(formData['from'],formData['to'],formData['device']);
  fetchDataAndDrawAggregatedChart(parseInt(formData['from']),parseInt(formData['to']), parseInt(formData['year']),formData['device']);
  fetchDataAndDrawDeviceChart(parseInt(formData['from']),parseInt(formData['to']),formData['device'],parseInt(formData['year']));
  
  // fetchDataAndDrawChart(1000, 5000, "fridge", 3);
  
}

// window.formData = formData;
window.submitForm = submitForm;