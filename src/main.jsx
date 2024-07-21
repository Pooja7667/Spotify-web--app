import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from "./Redux-toolkit/Store.js"
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
    <Router>
    <App />
    </Router>
    </Provider>
  </React.StrictMode>,
)
