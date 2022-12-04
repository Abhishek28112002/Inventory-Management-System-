const router = require("express").Router();
const { Auth } = require("../middlewares/auth");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const userotp = require("../models/userOTP");

let transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth:{
//     user: "intelheim.projects@gmail.com ", //email here
//     pass: "INTELHEIM", //password here
//   },
// use app password genrated by gmail. 

service: 'gmail',
auth: {user:"200030003@iitdh.ac.in", pass:"qeigjxgpabotvajh" }
});

//routes
// adding new user (sign-up route)
router.post("/register", async function (req, res) {
  // taking a user
  const newuser = new User(req.body);

  if (newuser.password != newuser.confirmpassword)
    return res.status(400).json({ message: "password not match" });

  //checking for uniqueness of username
  let u = await User.findOne({ username: newuser.username });

  if (!u) {
    User.findOne({ email: newuser.email }, function (err, user) {
      if (err) {
        console.log(err);
      }
      if (user)
        return res
          .status(400)
          .json({
            auth: false,
            message: "email already exists!Try another email",
          });

      newuser.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ success: err });
        }
        console.log(doc);

        sendOTP(doc, res);
      });
    });
  } else {
    return res
      .status(400)
      .json({
        auth: false,
        message: "username already exists!Try another username",
      });
  }
});

//otp verification
router.post("/verify", async function (req, res) {
  try {
    const userOtp = await userotp.findOne({
      userId: req.body.userId,
      otp: req.body.otp,
    });
    if (!userOtp)
      return res.json({
        status: "ERROR",
        message: "OTP is not valid",
      });
    if (userOtp.expiresAt < Date.now())
      return res.json({
        status: "ERROR",
        message: "OTP has expired",
      });
    await userOtp.remove();
    await User.findOneAndUpdate(
      { userId: req.body.userId },
      { verified: true }
    );

    res.json({
      status: "SUCCESS",
      message: "OTP verified",
    });
  } catch (err) {
    res.json({
      status: "ERROR",
      message: err.message,
    });
  }
});

//resend otp
router.post("/resendOTP", async function (req, res) {
  try {
    let { email } = req.body;
    const [u] = await User.find({ email: email });
    let userId = u.userId;
    if (!userId || !email) {
      throw Error("UserId or email is not valid");
    } else {
      await userotp.deleteMany({ userId: userId });
      sendOTP({ userId: userId, email: email }, res);
    }
  } catch (err) {
    res.json({
      status: "ERROR",
      message: err.message,
    });
  }
});

// login user
router.post("/login", function (req, res) {
  let token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) return res.json(err);

   
    if (user)
      return res.status(400).json({
        error: true,
        message: "You are already logged in",
      });
    else {
      User.findOne({ email: req.body.email }, function (err, user) {
        if (!user)
          return res.json({
            isAuth: false,
            message: " Auth failed ,email not found",
          });

        user.comparepassword(req.body.password, (err, isMatch) => {
          if (!isMatch)
            return res.json({
              isAuth: false,
              message: "password doesn't match",
            });
            if (!user.verified) 
            sendOTP(user, res);
          user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
            res.cookie("auth", user.token).json({
              isAuth: true,
              id: user.userId,
              email: user.email,
              token: user.token,
            });
          });
        });
      });
    }
  });
});

// get logged in user
router.get("/profile", Auth, function (req, res) {
  res.json({
    isAuth: true,
    id: req.user.userId,
    email: req.user.email,
    name: req.user.name,
  });
});

router.get("/userID", Auth, async function (req, res) {
  const username = req.body.username;
  const [user] = await User.find({ username: username });
  if (!user)
    return res.json({
      status: "ERROR",
      message: "User not found",
    });
  res.json({
    status: "SUCCESS",
    userId: user.userId,
  });
});

//logout user
router.get("/logout", Auth, function (req, res) {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});

// reset password
router.post("/resetPassword", async function (req, res) {
  let email = req.body.email;
  let password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res.json({
        status: "ERROR",
        message: "User not found",
      });
    if (!user.verified) {
      return res.json({
        status: "ERROR",
        message: "User not verified",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { email: email },
      { password: hashedPassword, confirmpassword: hashedPassword }
    );
    res.json({
      status: "SUCCESS",
      message: "Password reset successfully",
    });
  } catch (err) {
    res.json({
      status: "ERROR",
      message: err.message,
    });
  }
});

const sendOTP = async (doc, res) => {
    console.log(doc.email);
  try {
    const otp = Math.floor(Math.random() * 100000);
    const mailOptions = {
      from: "200030003@iitdh.ac.in", // sender address
      to: doc.email, // list of receivers
      subject: "OTP Verification", // Subject line
      text: "Your OTP is " + otp, // plain text body
      html: "<b>Your OTP is " + otp + "</b>", // html body
    };

    //hash otp
    // const hashedOTP = await bcrypt.hash(otp, 10);
    //save otp to db

    const userOtp = await new userotp({
      userId: doc.userId,
      otp: otp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    await userOtp.save();
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.json(error.message);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      return res.json("OTP sent")
    });

    // res.json({
    //     status:"PENDING",
    //     otp:otp,
    //     success: true,
    //     message:"OTP sent to your email",
    //     data:{
    //         userid:doc.userId,
    //         email:doc.email,
    //     }

    // })
  } catch (err) {
    res.json({
      status: "ERROR",
      message: err.message,
    });
  }
};

module.exports = router;
