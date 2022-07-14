import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Favorites from './Favorites';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from './mystore';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StoreProvider>
    <React.StrictMode>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<App />} />
      <Route path="favorites" element={<Favorites />} />
    </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </StoreProvider>
);
reportWebVitals();
