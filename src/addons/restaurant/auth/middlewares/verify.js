const jwt = require('jsonwebtoken')
const Marchant = require("../models/marchant");

const verifyMarchant = async (req, res, next) => {
  try {
    // const { email } = req.body;
    // const marchant = await Marchant.findOne({ email: email });
    // if (marchant.is_verified && marchant.token === null) {
    //   next();
    // } else {
    //   res.send({
    //     status: false,
    //     message: "Please verify your email first",
    //   });
    // }
    next()
  } catch (error) {
   res.send({
     status: false,
     message: 'User not found regarding this email'
   })
  }
};

//verify token
const verifyToken = async(req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.split(" ")[1];

      const user = await jwt.verify(token,process.env.JWT_SECRET)
      
      req.user=user
      next()

     
    } else {
      res.send({
        status: false,
        message: "You are not authenticated",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyMarchant,
  verifyToken,
};
