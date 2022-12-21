const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const passwordCheck = require('../middleware/password');

// route for login and signup user
router.post('/signup', passwordCheck, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
