var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../lib/config');
const user = require('../../data/user');
const express = require("express");
const router = express.Router();
router.post('/login', (req, res) => {
    user.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
   
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
  
      //token code
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
  
      res.status(200).send({ auth: true, token: token });
    });
  

  });
  module.exports = router;