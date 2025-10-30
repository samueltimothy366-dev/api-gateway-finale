import React, { useState, useEffect } from 'react';
import './DataDisplay.css';

function VehicleList({ token }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/Vehicle/List', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        setVehicles(result.data);
      } else {
        setError(result.message || 'Failed to fetch vehicles');
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
        <div className="loading-spinner">Loading vehicles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="data-container">
        <div className="error-box">
          <p>{error}</p>
          <button onClick={fetchVehicles} className="btn-retry">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="data-container">
      <div className="data-header">
        <h2>Vehicle List</h2>
        <button onClick={fetchVehicles} className="btn-refresh">
          Refresh
        </button>
      </div>

      <div className="data-stats">
        <div className="stat-card">
          <p className="stat-label">Total Vehicles</p>
          <p className="stat-value">{vehicles.length}</p>
        </div>
      </div>

      {vehicles.length === 0 ? (
        <div className="empty-state">
          <p>No vehicles found</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Vehicle UID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => (
                <tr key={index}>
                  <td><code className="uid-code">{vehicle.Uid}</code></td>
                  <td>{vehicle.Name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default VehicleList;
