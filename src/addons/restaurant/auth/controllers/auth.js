const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const MarchantModel = require("../models/marchant");
const UserModel = require("../models/users");
const marchant = require("../models/marchant");

// mail sender
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ronybarua.corexlab@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// marchant sign up
const signup = async (req, res, next) => {
  try {
    const marchant = await MarchantModel.create(req.body);
    const token = jwt.sign(
      {
        _id: marchant._id,
        email: marchant.email,
      },
      process.env.JWT_SECRET
    );

    // send mail with defined transport object
    await transporter.sendMail({
      from: '"Verify your email 👻" <ronybarua.corexlab@gmail.com>',
      to: marchant.email,
      subject: "Verify Email",
      text: "Please verify your email",
      html: `<h2>${marchant.first_name} thanks for verifying your email</h2>
              <h5>Please verify your email to continue</h5>
              <a href='http://localhost:8000/api/v1/restaurants/auth/verify-email?token=${token}'>Verify your email</a>
        `, // html body
    });

    res.send({
      status: true,
      message: "marchant account created successfully",
      marchant: marchant,
      token,
    });
  } catch (error) {
    next(error);
  }
};
// verify email
const verifyEmail = async (req, res, next) => {
  try {
    const token = req.query.token;
    const { email, _id } = jwt.decode(token, process.env.JWT_SECRET);

    await MarchantModel.findByIdAndUpdate(_id, { is_verified: true });
    const user = await UserModel.create({
      email,
      password: req.body.password,
      marchant: _id,
    });

    res.send(user);
  } catch (error) {
    next(error);
  }
};

// marchant login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const findUser = await UserModel.findOne({ email: email });

    if (findUser) {
      const match = password === findUser.password;
      if (match) {
        console.log(findUser);
        const token = jwt.sign(
          {
            email: findUser.email,
            id: findUser._id,
            marchant: findUser.marchant,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.send({
          status: true,
          message: "Login successful",
          access_token: token,
        });
      } else {
        res.send({
          status: false,
          message: "Authentication failed, Check your email or password",
        });
      }
    } else {
      res.send({
        status: false,
        message: "user not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  verifyEmail,
  login,
};
