const router = require("express").Router();
const { Auth } = require("../middlewares/auth");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../models/User");


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

  
  //checking for uniqueness of username
  let u = await User.findOne({ username: newuser.username });

  if (!u) {
    User.findOne({ email: newuser.email }, function (err, user) {
      if (err) {
        console.log("kjhj")
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
          console.log("ne");
          console.log(err);
          return res.status(400).json({ success: err });
        }
        else
        res.json(newuser)
        console.log(doc);

        // sendOTP(doc, res);
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



router.post("/login", function (req, res) {
 
  User.findOne({email: req.body.email}, (err, user) => {
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
            
           
          
        });
      });
    }
  });
});

// get logged in user
router.get("/profile", function (req, res) {
  res.json({
    id: req.user.userId,
    email: req.user.email,
    name: req.user.name,
  });
});

router.get("/userID", async function (req, res) {
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
// router.get("/logout", Auth, function (req, res) {
//   req.user.deleteToken(req.token, (err, user) => {
//     if (err) return res.status(400).send(err);
//     res.sendStatus(200);
//   });
// });

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
      user.comparepassword(req.body.password, async(err, isMatch) => {
        if (isMatch)
           res.json({
            error: true,
            message: "password is same as pervious",
          })
          else
          {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.findOneAndUpdate(
              { email: email },
              { password: hashedPassword }
            );
            res.json({
              status: "SUCCESS",
              message: "Password reset successfully",
            });
          }
        })
        
    
  } catch (err) {
    res.json({
      status: "ERROR",
      message: err.message,
    });
  }
});



module.exports = router;
