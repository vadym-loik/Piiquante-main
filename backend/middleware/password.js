// getting password model
const passwordSchema = require('../models/password');

//checking user password is ok with our password model
module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res.writeHead(
      400,
      'The password must be 8 characters including a number, without spaces!',
      {
        'content-type': 'application/json',
      }
    );
    res.end('The password format is incorrect!');
  } else {
    next();
  }
};
