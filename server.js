const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const colors = require('colors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./utils/err');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const app = express();

app.use(express.json());

// 1) Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Router
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

// 4) START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
