const router = require("express").Router();
const { Auth } = require("../middlewares/auth");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const ObjectId = require("mongodb").ObjectId;
//routes
// adding new user (sign-up route)
router.post("/register", async function (req, res) {
  // taking a user
  const newuser = new User(req.body);
  //checking for uniqueness of username
  let u = await User.findOne({ username: newuser.username });
  if (!u) {
    User.findOne({ email: newuser.email }, function (err, user) {
      if (err) {
        console.log("kjhj");
        console.log(err);
      }
      if (user)
        return res.status(400).json({
          auth: false,
          message: "email already exists!Try another email",
        });

      newuser.save((err, doc) => {
        if (err) {
          console.log("ne");
          console.log(err);
          return res.status(400).json({ success: err });
        } else res.json(newuser);
        console.log(doc);

        // sendOTP(doc, res);
      });
    });
  } else {
    return res.status(400).json({
      auth: false,
      message: "username already exists!Try another username",
    });
  }
});

router.post("/login", function (req, res) {
  console.log(req.body.email);
  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user)
      return res.json({
        success: false,
        message: " Email not found",
      });

    user.comparepassword(req.body.password, async (err, isMatch) => {
      if (!isMatch)
        return res.json({
          sucess: false,
          message: "password doesn't match",
        });
      else {
        user.LoggedIn = true;
        await user.save();
        return res.json({
          sucess: true,
          message: "You Logged in successfully!",
        });
      }
    });
  });
});

router.get("/:userId", async function (req, res) {
  const [user] = await User.find({ userId: ObjectId(req.params.userId) });
  if (!user)
    return res.json({
      status: "ERROR",
      message: "User not found",
    });
  res.json({
    status: "SUCCESS",
    user: user,
  });
});

// logout user
router.get("/logout/:userId", async function (req, res) {
  const [user] = await User.find({ userId: ObjectId(req.params.userId) });
  if (user) {
    user.LoggedIn = false;
    await user.save();
    res.send("You Logged out successfully!");
  } else {
    res.send("user not found");
  }
});

// reset password
router.post("/resetPassword", function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user)
      return res.json({
        success: false,
        message: " Email not found",
      });

    user.comparepassword(req.body.password, async (err, isMatch) => {
      if (isMatch)
        return res.json({
          sucess: false,
          message: "password is similar to pervious ",
        });
      else {
        user.password = req.body.password;
        await user.save();
        return res.json({
          sucess: true,
          message: "password changed successfully!",
        });
      }
    });
  });
});
// router.post("/changePassword", async function (req, res) {
//   let email = req.body.email;
//   let password = req.body.password;

//   try {
//     const user = await User.findOne({ email: email });
//     if (!user)
//       return res.json({
//         status: "ERROR",
//         message: "User not found",
//       });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     await User.findOneAndUpdate({ email: email }, { password: hashedPassword });
//     res.json({
//       status: "SUCCESS",
//       message: "Password Changed successfully",
//     });
//   } catch (err) {
//     res.send(err.message);
//   }
// });

module.exports = router;
