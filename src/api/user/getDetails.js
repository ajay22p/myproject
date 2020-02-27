var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../lib/config');
const user = require('../../data/user');
const express = require("express");
const router = express.Router();
const verifyToken = require('./verifyToken');
router.get('/getDetails', verifyToken, function(req, res, next) {

   user.findById(req.userId, { password: 0 }, function (err, user) {
     if (err) return res.status(500).send("There was a problem finding the user.");
     if (!user) return res.status(404).send("No user found.");
     
     res.status(200).send(user);
   });
   
 });
  module.exports = router;  