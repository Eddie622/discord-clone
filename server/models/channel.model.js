const mongoose = require("mongoose");
const MessageSchema = require("./message.model");

const ChannelSchema = new mongoose.Schema({
    creator_id: {
        type: String, 
        required: ["creator must be specified"]
    },
    name: {
      type: String,
      required: [true, "channel name is required"],
      validate: {
        validator: val => /\S/.test(val),
        message: "please enter text"
      }
    },
    messages: [MessageSchema],
    members: []

}, {timestamps: true});

module.exports = mongoose.model("Channel", ChannelSchema);