import React, { useEffect } from 'react';

const StopButton = ({className}) => {
  const handleButtonClick = () => {
    // Sending a GET request
    fetch('http://127.0.0.1:2125/restart_app', {
      method: 'GET',
      // You can set headers if needed
    })
    .then(response => {
      // Handle the response here if needed
    })
    .catch(error => {
      // Handle errors here
    });
  };
  return (
    <button onClick={handleButtonClick} className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" class="bi bi-power" viewBox="0 0 16 16">
  <path d="M7.5 1v7h1V1h-1z"/>
  <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
</svg>
    </button>
  );
};

export default StopButton;