import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
  import './index.css'
  import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "@material-tailwind/react";
import "flowbite";
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <HelmetProvider>
  <React.StrictMode>
    <ThemeProvider>
      <App />
    <ToastContainer />
    </ThemeProvider>
  </React.StrictMode>,
  </HelmetProvider>
)
