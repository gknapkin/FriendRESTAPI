const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  joinDate: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("Friend", friendSchema);
