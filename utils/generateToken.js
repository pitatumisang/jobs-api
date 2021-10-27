const jwt = require('jsonwebtoken');

const generateJwtToken = async (userId) => {
  return await jwt.sign({ userId }, 'secret', { expiresIn: '30d' });
};

module.exports = generateJwtToken;
