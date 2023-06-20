const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  messages: {
    type: Array,
    required: false,
    default: [],
  },
});

module.exports = mongoose.model("users", userSchema);
