const axios = require('axios');
const cache = require('./cache');
const { apiUrlPartner, apiUrlClient } = require('./config');

/**
 * @param {string} username 
 * @param {string} password
 * @returns {{userId: string, sessionId: string}}
 */
async function authenticateApi(username, password) {
  const url = `${apiUrlClient}Authentication/UserAuthenticate?UserName=${username}&Password=${password}`;
  console.log('URL de login pour API externe:', url);
  const { data } = await axios.get(url);
  
  if (data.Status.Result !== 'ok') {
    throw new Error('Login failed with external API');
  }
  
  return {
    userId: data.Result.UserIdGuid,
    sessionId: data.Result.SessionId
  };
}

async function getSession({ userId, sessionId }) {
    return { userId, sessionId }; 
}

async function fetchVehicleList({ userId, sessionId }) {
  const url = `${apiUrlClient}Units/Unit/List?UserIdGuid=${userId}&SessionId=${sessionId}`;
  const { data } = await axios.get(url, { timeout: 10000 });
  return data;
}

async function fetchDriversVehicle({ userId, sessionId }) {
  const url = `${apiUrlPartner}Units/LatestPositionsList?UserIdGuid=${userId}&SessionId=${sessionId}`;
  const { data } = await axios.get(url, { timeout: 10000 });
  return data;
}

async function fetchDriversVehicleByUid(uid,{ userId, sessionId }) {
  const url = `${apiUrlPartner}Units/LatestPositionsList?UserIdGuid=${userId}&SessionId=${sessionId}&UnitUid=${uid}`;
  const { data } = await axios.get(url, { timeout: 10000 });
  return data;
}

async function fetchDriverList({ userId, sessionId }) {
  const url = `${apiUrlClient}Driver/Driver/List?UserIdGuid=${userId}&SessionId=${sessionId}`;
  const { data } = await axios.get(url, { timeout: 10000 });
  return data;
}

module.exports = { authenticateApi, fetchVehicleList, fetchDriverList, fetchDriversVehicle, fetchDriversVehicleByUid, getSession };