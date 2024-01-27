// index.tsx or App.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { SocketProvider } from './context/socketContext';
ReactDOM.render(
  <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
