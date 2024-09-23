import React from "react";

const ConfirmationEmail = ({email, name}) => {
  const emailData = {
    toEmail: email,
    subject: `Your Order has been placed, ${name}`,
    textContent: "Your order has been successfully placed.",
    htmlContent: "<h1>Your order has been placed!!<h1/>"
  };
  
  // Define the request options
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailData)
  };
  
  // Perform the fetch request
  fetch('https://alzehrareact.netlify.app/.netlify/functions/sendEmail', requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      return ('Success:', data)
    })
    .catch(error => {
      console.error('Error:', error);
      return ('Error:', error);
    });;
};

export default ConfirmationEmail;
