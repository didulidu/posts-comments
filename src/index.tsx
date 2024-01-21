import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { MessageProvider } from './context/MessageContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <MessageProvider message="Hello from">
    <ErrorBoundary fallback={<h1>Error caught by global ErrorBoundary</h1>}>
      <App />
    </ErrorBoundary>
  </MessageProvider>
);
