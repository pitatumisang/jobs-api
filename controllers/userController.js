const User = require('../models/userModel');
const CustomError = require('../utils/customError');
const bcrypt = require('bcryptjs');
const generateJwtToken = require('../utils/generateToken');

//* @DESC    Register new user
//* @ROUTE   POST /api/v1/users/register
//* @ACCESS  PUBLIC
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });
  res.status(201).json(user);
};

//* @DESC    Login a user
//* @ROUTE   POST /api/v1/users/login
//* @ACCESS  PUBLIC
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError('Please provide email and password', 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError('User specified email not found', 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new CustomError('Password incorrect', 401);
  }

  const { _id: userId, name, email: userEmail } = user;

  const token = await generateJwtToken(userId);
  res.status(200).json({ user: { userId, name, userEmail }, token });
};

module.exports = {
  registerUser,
  loginUser,
};
