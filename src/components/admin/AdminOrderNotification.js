import React from "react";

const ConfirmationEmail = ({email, price}) => {
  const emailData = {
    toEmail: email,
    subject: `New order has been placed, worth ${price}`,
    textContent: "There's a new order check it out.",
    htmlContent: "<h1>There's a new order check it out <a href='alzehrabgm.store/admin/orders'>here</a><h1/>"
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
