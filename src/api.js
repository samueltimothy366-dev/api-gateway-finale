const express = require("express");
const rateLimit = require("express-rate-limit");
const jwt = require('jsonwebtoken');
const { fetchVehicleList, fetchDriverList, authenticateApi, fetchDriversVehicle, fetchDriversVehicleByUid } = require("./fetcher");
const authMiddleware = require("./auth");
const { port, jwtSecret } = require("./config");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.post("/authenticate", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    const { userId, sessionId } = await authenticateApi(username, password);

    const token = jwt.sign(
      { userId, sessionId },
      jwtSecret, 
      { expiresIn: '1h' }
    );

    res.json({
      success: true,
      data: { token },
      timestamp: new Date().toISOString(),
    });
  } catch (e) {
    console.error("Login error:", e.message);
    res.status(401).json({ success: false, message: "Invalid credentials or API error" });
  }
});

app.use(authMiddleware);

app.get("/Driver/List", async (req, res) => {
  try {
    const raw = await fetchDriverList(req.user); 
    const drivers = (raw.Result || []).map(driver => ({
      DriverID: driver.DriverID,
      Name: driver.DisplayName,
    })); 
    res.json({
      success: true,
      data: drivers,
      timestamp: new Date().toISOString(),
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

app.get("/Vehicle/List", async (req, res) => {
  try {
    const raw = await fetchVehicleList(req.user); 
    const vehicles = (raw.Result || []).map(vehicle => ({
      Uid: vehicle.Uid,
      Name: vehicle.Name,
    })); 
    res.json({
      success: true,
      data: vehicles,
      timestamp: new Date().toISOString(),
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});


app.get("/Driver/Vehicle/:Uid", async (req, res) => {
  try {
    const raw = await fetchDriversVehicleByUid(req.params.Uid, req.user);

    const positions = raw.Result || [];

    const mapped = positions.map(pos => ({
      Vehicle: pos.Name || "Unknown",
      Driver: pos.Position.Driver.FirstName + ' ' + pos.Position.Driver.LastName || "Unassigned",
      Date: pos.LastReportedTimeLocal,
    }));

    res.json({
      success: true,
      data: mapped,
      timestamp: new Date().toISOString(),
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

app.get("/Driver/Vehicle", async (req, res) => {
  try {
    const raw = await fetchDriversVehicle(req.user);

    const positions = raw.Result || [];

    const mapped = positions.map(pos => ({
      Vehicle: pos.Name || "Unknown",
      Driver: pos.Position.Driver.FirstName + ' ' + pos.Position.Driver.LastName || "Unassigned",
      Date: pos.LastReportedTimeLocal,
    }));

    res.json({
      success: true,
      data: mapped,
      timestamp: new Date().toISOString(),
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

app.listen(port, () => console.log("API Gateway listening on " + port));