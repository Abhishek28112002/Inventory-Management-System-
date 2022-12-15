const router = require("express").Router();
const client = require("../connection.js");
const ObjectId = require("mongodb").ObjectId;
//routes
// adding new user (sign-up route)
router.post("/register", async function (req, res) {
  // taking a user

  const user = req.body;
  let insertQuery = `insert into "Users" ("username", "email", "password") 
                     values( '${user.username}', '${user.email}', '${user.password}')`;

  client.query(insertQuery, (err, result) => {
    if (err) console.log(err.message);
  });
  client.query(`Select * from "Users"`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else res.send(err);
  });
  client.end;
});

router.get("/:userId", async function (req, res) {
  client.query(
    `Select * from "Users" where "userId"=${req.params.userId}`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else res.send(err);
    }
  );
  client.end;
});
router.post("/login", async function (req, res) {
  client.query(
    `Select * from "Users" where "username"='${req.body.username}'`,
    (err, result) => {
      if (err) res.send(err);

      if (result.rows[0].LoggedIn == true) res.send("You are already LoggedIn");
      if (result.rows[0].password == req.body.password) {
        let updateQuery = `update "Users"
                     set "LoggedIn"= true
                     where "username" = '${req.body.username}'`;

        client.query(updateQuery, (err, result) => {
          if (err) console.log(err.message);
          else res.send("Logged in sucessfully");
        });
      }
    }
  );
  client.end;
});

// logout user
router.post("/logout/:userId", async function (req, res) {
  let user = req.body;
  let updateQuery = `update "Users"
                     set "LoggedIn"= 'false'
                     where "userId" = ${req.params.userId}`;

  client.query(updateQuery, (err, result) => {
    if (err) console.log(err.message);
  });
  client.query(
    `Select * from "Users" where "userId"=${req.params.userId}`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else res.send(err);
    }
  );
  client.end;
});

// reset password
router.post("/resetPassword", function (req, res) {
  let updateQuery = `update "Users"
                     set "password"= '${req.body.password}'
                     where "userId" = '${req.body.userId}'`;

  client.query(updateQuery, (err, result) => {
    if (err) console.log(err.message);
  });
  client.query(
    `Select * from "Users" where "userId"=${req.params.userId}`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else res.send(err);
    }
  );
  client.end;
});
router.delete("/deleteuser", async (req, res) => {
  let insertQuery = `delete from "Users" `;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Deletion was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

module.exports = router;
