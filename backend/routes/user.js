const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// route for login and signup user
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
