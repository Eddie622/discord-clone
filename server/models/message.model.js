const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  creator_id: {
    type: String,
    required: ["creator must be specified"]
  },
  content: {
    type: String,
    required: [true, "message content is required"],
    validate: {
      validator: val => /\S/.test(val),
      message: "please enter text"
    }
  },
}, { timestamps: true });

module.exports = MessageSchema;