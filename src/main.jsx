import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// File: src/App.jsx
import React from 'react';
import TrainMap from './components/TrainMap';

export default function App() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <TrainMap />
    </div>
  );
}
