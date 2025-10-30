import React, { useState, useEffect } from 'react';
import './DataDisplay.css';

function DriverList({ token }) {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/Driver/List', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        setDrivers(result.data);
      } else {
        setError(result.message || 'Failed to fetch drivers');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="data-container">
        <div className="loading-spinner">Loading drivers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="data-container">
        <div className="error-box">
          <p>{error}</p>
          <button onClick={fetchDrivers} className="btn-retry">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="data-container">
      <div className="data-header">
        <h2>Driver List</h2>
        <button onClick={fetchDrivers} className="btn-refresh">
          Refresh
        </button>
      </div>

      <div className="data-stats">
        <div className="stat-card">
          <p className="stat-label">Total Drivers</p>
          <p className="stat-value">{drivers.length}</p>
        </div>
      </div>

      {drivers.length === 0 ? (
        <div className="empty-state">
          <p>No drivers found</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Driver ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver, index) => (
                <tr key={index}>
                  <td><code className="uid-code">{driver.DriverID}</code></td>
                  <td>{driver.Name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DriverList;
