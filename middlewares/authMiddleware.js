const jwt = require('jsonwebtoken');
const CustomError = require('../utils/customError');

const authorizeUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomError('User authorization failed', 401);
  }
  const token = authHeader.split(' ')[1];

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    throw new CustomError('User authorization failed', 401);
  }
};

module.exports = authorizeUser;
