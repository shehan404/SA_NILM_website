let formData ={
  device: 'none',
  from: 0,
  to: 0
}

function submitForm() {
  // Get form data
  formData = {
      device: document.getElementById("device").value,
      from: document.getElementById("from").value,
      to: document.getElementById("to").value

      
  };
  
  // You can perform further operations here such as validation or AJAX submission
  
  // For demonstration, just log the form data
  // console.log(formData['from'],formData['to'],formData['device']);
  fetchDataAndDrawChart(formData['from'],formData['to'],formData['device']);
  
}

window.formData = formData;
window.submitForm = submitForm;