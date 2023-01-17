// Express is a small framework that sits on top of Node.js’s web server functionality to simplify its APIs and add helpful new features.It makes it easier to organize your application’s functionality with middle ware and routing; it adds helpful utilities to Node.js’s HTTP objects;it facilitates the rendering of dynamic HTTP objects.
const express = require('express');
const app = express();

// Mongoose is an Object Document Mapper (ODM). This means that Mongoose allows you to define objects with a strongly-typed schema that is mapped to a MongoDB document.
const mongoose = require('mongoose');

// .env file. In the application, there are confidential information that you do not want to show to a third party, such as "DB information", "server information", "external API cooperation information". Sensitive information stores the information as environment variables separately from the code.
const dotenv = require('dotenv');
const path = require('path');

// Helmet.js is a Node.js module that helps in securing HTTP headers. It is implemented in express applications. Therefore, we can say that helmet.js helps in securing express applications. It sets up various HTTP headers to prevent attacks like Cross-Site-Scripting(XSS), clickjacking, etc.
const helmet = require('helmet');

// The sanitize function will strip out any keys that start with '$' in the input, so you can pass it to MongoDB without worrying about malicious users overwriting query selectors.
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
