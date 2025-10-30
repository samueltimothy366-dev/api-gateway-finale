import React, { useState, useEffect } from 'react';
import './DataDisplay.css';

function VehicleDriverList({ token }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/Driver/Vehicle', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        setData(result.data);
      } else {
        setError(result.message || 'Failed to fetch data');
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
        <div className="loading-spinner">Loading vehicles and drivers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="data-container">
        <div className="error-box">
          <p>{error}</p>
          <button onClick={fetchData} className="btn-retry">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="data-container">
      <div className="data-header">
        <h2>Vehicles & Drivers</h2>
        <button onClick={fetchData} className="btn-refresh">
          Refresh
        </button>
      </div>

      <div className="data-stats">
        <div className="stat-card">
          <p className="stat-label">Total Assignments</p>
          <p className="stat-value">{data.length}</p>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="empty-state">
          <p>No vehicle-driver assignments found</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Driver</th>
                <th>Last Reported</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.Vehicle}</td>
                  <td>{item.Driver}</td>
                  <td>{item.Date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default VehicleDriverList;
