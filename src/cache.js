const { createClient } = require('redis');
const { redisUrl } = require('./config');
const client = createClient({ url: redisUrl });

client.connect();
module.exports = client;
