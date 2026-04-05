const mongoose = require("mongoose");

const swapSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  skillOffered: String,
  skillRequested: String,
  status: { type: String, default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Swap", swapSchema);