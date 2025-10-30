require('dotenv').config();
module.exports = {
  port: process.env.APP_PORT || 8000,
  redisUrl: process.env.REDIS_URL,
  jwtSecret: process.env.JWT_SECRET,
  apiUrlPartner: process.env.API_URL_PARTNER,
  apiUrlClient: process.env.API_URL_ClIENT,
};
