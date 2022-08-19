import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/sass/styles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowseRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowseRouter>
      <App />
    </BrowseRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
