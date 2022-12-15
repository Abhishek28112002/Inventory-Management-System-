const express = require("express");
const Event = require("../models/Event");
const InvitedUser = require("../models/InvitedUser");
const client = require("../connection");
const router = express.Router();

// client.connect();
//to create new event 

router.post("/new-event", async (req, res) => {
  const events = req.body;
  let insertQuery = `insert into "Event" ( "description" , "userId") 
                     values( '${events.description}', '${events.userId}')`;

  client.query(insertQuery, (err, result) => {
    if (err) console.log(err.message);
  });
  client.query(`Select * from "Event" `, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else res.send(err);
  });
  client.end;
});

//to edit the exiting event

router.post("/editEvent", async (req, res) => {
  let event = req.body;
  let updateQuery = `update "Event"
                     set "description"='${req.body.description}'
                     where "EventId" = ${req.body.EventId}`;

  client.query(updateQuery, (err, result) => {
    if (err) console.log(err.message);
  });
  client.query(`Select * from "Event" `, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else res.send(err);
  });
  client.end;
});

// to delete exiting event 

router.delete("/deleteEvent", async (req, res) => {
  let insertQuery = `delete from "Event" where "EventId"=${req.body.EventId}`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Deletion was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

//to invite any user to that event 

router.post("/inviteUser", async (req, res) => {
  const inviteuser = req.body;
  let insertQuery = `insert into "InvitedUser"("userId","EventId")  
                       values('${inviteuser.userId}', '${inviteuser.EventId}')`;

  client.query(insertQuery, (err, result) => {
    if (err) console.log(err.message);
  });
  client.query(`Select * from "InvitedUser" `, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else res.send(err);
  });
  client.end;
});

module.exports = router;
