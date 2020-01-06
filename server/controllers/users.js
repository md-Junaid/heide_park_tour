const User = require('../models/user');
const jwt = require('jsonwebtoken');


// @desc Admin login
// @route POST
// @access Admins Only
exports.adminLogin = async (req, res, next) => {
  console.log("received in backend", req.body);
  const username = req.body.username;
  const password = req.body.password;
  const secretKey = req.body.twoFac;

  if (secretKey === "heides3cr3t") {
    User.findOne({ username }).exec(function(err, user) {
      if(err) {
        console.log("cannot find user", err);
        res.status(400).json(err);
      } else if (user) {
        console.log("If username is found: ", user);
        if (user.password === password) {
          res.status(200).json({success: true, msg: "Successly fully logged in!"});
        } else {
          res.send({
            code: 403,
            type: "credentials",
            msg: "Username or password is incorrect!!"
          });
        }
      } else {
        res.send({
          code: 403,
          type: "credentials",
          msg: "Username or password is incorrect!!"
        });
      }
    });
  } else {
    res.send({
      code: 403,
      type: "2Fac",
      msg: "Please input correct Two Factor Auth Code"
    });
  }

};