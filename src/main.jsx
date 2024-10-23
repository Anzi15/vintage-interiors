import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
  import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import "flowbite";
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <HelmetProvider>
  <React.StrictMode>
  <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <App />
  </React.StrictMode>,
  </HelmetProvider>
)
