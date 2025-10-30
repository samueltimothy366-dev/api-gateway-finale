import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('authToken') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

  const handleLogin = (newToken) => {
    setToken(newToken);
    setIsAuthenticated(true);
    localStorage.setItem('authToken', newToken);
  };

  const handleLogout = () => {
    setToken('');
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
  };

  return (
    <div className="app">
      {!isAuthenticated ? (
        <AuthForm onLogin={handleLogin} />
      ) : (
        <Dashboard token={token} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
