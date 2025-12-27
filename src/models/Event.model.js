const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  time: String,
  speaker: String,
});

const speakerSchema = new mongoose.Schema({
  name: String,
  role: String,
  image: String,
});

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    type: {
      type: String,
      enum: ["Online", "Offline"],
      required: true,
    },

    image: {
      type: String,
    },

    topic: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    sessions: [sessionSchema],

    price: {
      type: Number,
      default: 0,
    },
    speakers: [speakerSchema],
    hostedBy: String,

    venue: {
      name: String,
      address: String,
    },

    additionalInfo: {
      type: String,
    },

    tags: [String],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
