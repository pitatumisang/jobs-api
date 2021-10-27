const express = require('express');
const dotenv = require('dotenv');
require('express-async-errors');

const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
const authorizeUser = require('./middlewares/authMiddleware');

//*console logs color package
const colors = require('colors');

const connectDb = require('./configs/db');

const app = express();
dotenv.config();

//* MIDDLEWARE
app.use(express.json());

//* ROUTES
app.use('/api/v1/users', authRoutes);
app.use('/api/v1/jobs', authorizeUser, jobRoutes);

//* ERROR HANDLING MIDDLEWARE
app.use((req, res) => {
  res.status(404).json('Route not found');
});
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

//* CONNECT TO DATABASE AND START THE SERVER
connectDb()
  .then((conn) => {
    console.log(`DB connected successful`.underline.bold.yellow);
    //* start server
    app.listen(PORT, () =>
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
          .underline.bold.cyan
      )
    );
  })
  .catch((err) => console.log(err));
