import React, { useState } from 'react';
import './DataDisplay.css';

function VehicleDetails({ token }) {
  const [vehicleUid, setVehicleUid] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const fetchDetails = async () => {
    if (!vehicleUid.trim()) {
      setError('Please enter a vehicle UID');
      return;
    }

    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const response = await fetch(`/api/Driver/Vehicle/${vehicleUid}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        setData(result.data);
      } else {
        setError(result.message || 'Failed to fetch vehicle details');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDetails();
  };

  return (
    <div className="data-container">
      <div className="data-header">
        <h2>Vehicle Details</h2>
      </div>

      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            value={vehicleUid}
            onChange={(e) => setVehicleUid(e.target.value)}
            placeholder="Enter Vehicle UID (e.g., FFEE68)"
            className="search-input"
          />
          <button type="submit" className="btn-search" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="error-box">
          <p>{error}</p>
        </div>
      )}

      {searched && !loading && !error && data.length === 0 && (
        <div className="empty-state">
          <p>No details found for this vehicle</p>
        </div>
      )}

      {data.length > 0 && (
        <>
          <div className="data-stats">
            <div className="stat-card">
              <p className="stat-label">Records Found</p>
              <p className="stat-value">{data.length}</p>
            </div>
          </div>

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
        </>
      )}
    </div>
  );
}

export default VehicleDetails;
