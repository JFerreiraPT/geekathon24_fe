import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import React from 'react';
import Dashboard from './pages/Dashboard';

function App() {
  const [page, setPage] = useState(0);

  if (page === 0) {
    return (
      <div className="app">
        <h1>AI&apos;m confused</h1>
        <div className="card">
          <button onClick={() => setPage(1)}>New Dashboard</button>
        </div>
      </div>
    );
  }

  if (page === 1) {
    return <Dashboard />;
  }

  return (
    <div>
      <h2>404 - Page not found</h2>
    </div>
  );
}

export default App;
