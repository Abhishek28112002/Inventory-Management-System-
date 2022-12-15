const express = require("express");
const Event = require("../models/Event");
const InvitedUser = require("../models/InvitedUser");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
router.post("/new-event", async (req, res) => {
  const event = new Event(req.body);
  try {
    await event.save();
    return res.json({
      status: "sucess",
      message: "Event Created",
      Event:event
    });
  } catch (err) {
    res.json({
      status: "ERROR",
      message: err.message,
    });
  }
});
router.post("/editEvent", async (req, res) => {
  try {
    const Event_exit = await Event.findOne({EventId: req.body.EventId});
    Event_exit.description = req.body.description;

    Event_exit.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: err });
      } else res.send(Event_exit);
    });
  } catch (err) {
    res.json({
      status: "ERROR",
      message: err.message,
    });
  }
});
router.delete("/deleteEvent", async (req, res) => {
  const Event = Event.findOneAndDelete(
    { EventId: req.body.EventId },
    (err, result) => {
      if (err) return res.send(500, err);
      console.log("got deleted");
      res.send("Event delted successfully");
    }
  );
});

router.post("/inviteUser", async (req, res) => {
  const InviteUser = new InvitedUser(req.body);
  try {
    const Event_exit = await Event.findOne({
      EventId: ObjectId(req.body.EventId),
    });

    Event_exit.invitedUser.push(InviteUser);
    Event_exit.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: err });
      } else {
        return res.status(200).json({ success: Event_exit });
      }
    });
  } catch (err) {
    res.json({
      status: "ERROR",
      message: err.message,
    });
  }
});

module.exports = router;
