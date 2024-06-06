const { User } = require("../models");
const { CustomException } = require("../utils");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const satelize = require("satelize");
const {
  JWT_SECRET,
  NODE_ENV,
  VERIFICATION_EMAIL,
  VERIFICATION_EMAIL_PASS,
  CLIENT_URL,
} = process.env;
const saltRounds = 10;
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// console.log(process.env.NODE_ENV);

const authRegister = async (request, response) => {
  const { username, email, phone, password, image, isSeller, description } =
    request.body;

  const list =
    request.headers["x-forwarded-for"] || request.socket.remoteAddress;
  const ips = list.split(",");

  try {
    const hash = bcrypt.hashSync(password, saltRounds);

    // let { country } = satelize.satelize(
    //   { ip: ips[0] },
    //   (error, payload) => payload
    // );

    country = `India`;

    const user = new User({
      username,
      email,
      password: hash,
      emailToken: crypto.randomBytes(64).toString("hex"),
      image,
      //   country: country.en,
      country: country,
      description,
      isSeller,
      phone,
    });

    await user.save();

    let OTP = "";
    for (let i = 0; i <= 5; i++) {
      const randomVal = Math.round(Math.random() * 9);
      OTP += randomVal;
    }

    // const newEmailVerificationToken = new EmailVerificationToken({
    //  owner: user._id,
    //  token: OTP,
    // });

    // await newEmailVerificationToken.save();

    let mailTransporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: VERIFICATION_EMAIL,
        pass: VERIFICATION_EMAIL_PASS,
      },
    });

    const data = {
      email: email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };

    const token = jwt.sign(
      {
        data,
      },
      `${JWT_SECRET}`,
      { expiresIn: "10m" }
    );

    let mailDetails = {
      from: "gigfindr001@outlook.com",
      to: email,
      subject: "GigFindr Verification",
      text: `
                Hi! There, You have recently visited
                our website and entered your email.
                Please follow the given link to verify your email
                ${CLIENT_URL}?token=${token}
              
                Thanks
            `,
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs");
      } else {
        console.log("Email sent successfully");
      }
    });

    return response.status(201).send({
      error: false,
      message: "New user created!",
    });
  } catch ({ message }) {
    if (message.includes("E11000")) {
      return response.status(400).send({
        error: true,
        message: "Choose a unique username!",
      });
    }

    return response.status(500).send({
      error: true,
      message: "Something went wrong!",
    });
  }
};

const verify = async (req, res) => {
  const { token } = req.params;
  console.log(token);

  // Verifying the JWT token
  jwt.verify(token, `${JWT_SECRET}`, async (err, decoded) => {
    const { email, exp } = decoded.data;
    console.log(email);
    // console.log(email);

    try {
      const user = await User.findOne({ email });

      User.findOneAndUpdate({ email }, { isVerified: true }).then(() =>
        res.json({ message: "Email verified successfully" })
      );
    } catch (err) {
      return res.status(400).json({ error: "Invalid token" });
    }
    // if (err) {
    //  console.log(err);
    //  res.send(
    //      "Email verification failed, possibly the link is invalid or expired"
    //  );
    // } else {

    // }
    if (Date.now() >= exp * 1000) {
      return res.status(400).json({ error: "Token expired" });
    }
  });

  // res.send("Emails is verified");
};

const authLogin = async (request, response) => {
  const { username, password } = request.body;
  // console.log(JWT_SECRET);
  // console.log(process.env.JWT_SECRET);
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw CustomException("Check username or password!", 404);
    }

    const match = bcrypt.compareSync(password, user.password);
    if (match) {
      const { password, ...data } = user._doc;

      const token = jwt.sign(
        {
          _id: user._id,
          isSeller: user.isSeller,
        },
        `${JWT_SECRET}`,
        { expiresIn: "7 days" }
      );

      const cookieConfig = {
        httpOnly: true,
        sameSite: NODE_ENV === "production" ? "none" : "strict",
        secure: NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
        path: "/",
      };

      return response
        .cookie("accessToken", token, cookieConfig)
        .status(202)
        .send({
          error: false,
          message: "Success!",
          user: data,
        });
    }

    throw CustomException("Check username or password!", 404);
  } catch ({ message, status = 500 }) {
    return response.status(status).send({
      error: true,
      message,
    });
  }
};

const authLogout = async (request, response) => {
  return response
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .send({
      error: false,
      message: "User have been logged out!",
    });
};

const authStatus = async (request, response) => {
  try {
    const user = await User.findOne({ _id: request.userID }).select(
      "-password"
    );

    if (!user) {
      throw CustomException("User not found!", 404);
    }

    return response.send({
      error: false,
      message: "Success!",
      user,
    });
  } catch ({ message, status = 500 }) {
    return response.status(status).send({
      error: true,
      message,
    });
  }
};

const isVerified = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      res.status(404).json({ message: "User not found !!" });
      return;
    }

    if (!user?.isVerified)
      res
        .status(401)
        .json({ message: "User not Verified! Kindly check your email" });
    if (user.isVerified)
      res.status(200).json({ message: "User is verified !" });
  } catch (err) {
    res.status(500).json({ message: "Internal server Error!" });
  }
};

module.exports = {
  authLogin,
  authLogout,
  authRegister,
  authStatus,
  verify,
  isVerified,
};
