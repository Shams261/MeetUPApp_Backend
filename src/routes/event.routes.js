const express = require("express");
const {
  getEvents,
  getEventById,
  createEvent,
} = require("../controllers/event.controller");

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", createEvent); // optional

module.exports = router;
