import React, { useState, useEffect } from 'react';
import VehicleList from './VehicleList';
import DriverList from './DriverList';
import VehicleDriverList from './VehicleDriverList';
import VehicleDetails from './VehicleDetails';
import './Dashboard.css';

function Dashboard({ token, onLogout }) {
  const [activeTab, setActiveTab] = useState('vehicles');

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>3D Tracking Dashboard</h1>
            <p>Manage vehicles and drivers</p>
          </div>
          <button onClick={onLogout} className="btn-logout">
            Sign Out
          </button>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button
          className={activeTab === 'vehicles' ? 'nav-item active' : 'nav-item'}
          onClick={() => setActiveTab('vehicles')}
        >
          Vehicles
        </button>
        <button
          className={activeTab === 'drivers' ? 'nav-item active' : 'nav-item'}
          onClick={() => setActiveTab('drivers')}
        >
          Drivers
        </button>
        <button
          className={activeTab === 'vehicle-driver' ? 'nav-item active' : 'nav-item'}
          onClick={() => setActiveTab('vehicle-driver')}
        >
          Vehicles & Drivers
        </button>
        <button
          className={activeTab === 'vehicle-details' ? 'nav-item active' : 'nav-item'}
          onClick={() => setActiveTab('vehicle-details')}
        >
          Vehicle Details
        </button>
      </nav>

      <main className="dashboard-main">
        {activeTab === 'vehicles' && <VehicleList token={token} />}
        {activeTab === 'drivers' && <DriverList token={token} />}
        {activeTab === 'vehicle-driver' && <VehicleDriverList token={token} />}
        {activeTab === 'vehicle-details' && <VehicleDetails token={token} />}
      </main>
    </div>
  );
}

export default Dashboard;
