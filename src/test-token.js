const jwt = require('jsonwebtoken');
const token = jwt.sign({ client: 'client1', auth: true }, 'change_this', { expiresIn: '2h' });
console.log(token);
