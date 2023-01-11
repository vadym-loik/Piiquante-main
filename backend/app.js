const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

dotenv.config();

// connection to the database
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_LOGIN}:${process.env.MONGODB_PW}@${process.env.MONGODB_HOST}?retryWrites=true&w=majority`
  )
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch(() => console.log('Connection to MongoDB failed!'));

// helmet to protect headers
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// setting the headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

// for parsing json objects
app.use(express.json());

// to avoid code injection in MongoDB
app.use(mongoSanitize());

// for management of image files
app.use('/images', express.static(path.join(__dirname, 'images')));

// routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
