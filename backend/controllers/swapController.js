const Swap = require("../models/Swap");

exports.createSwap = async (req, res) => {
  const swap = await Swap.create(req.body);
  res.json(swap);
};

exports.getSwaps = async (req, res) => {
  const swaps = await Swap.find({
    $or: [
      { sender: req.user.id },
      { receiver: req.user.id }
    ]
  }).populate("sender receiver");

  res.json(swaps);
};

exports.acceptSwap = async (req, res) => {
  const swap = await Swap.findByIdAndUpdate(
    req.params.id,
    { status: "accepted" },
    { new: true }
  );
  res.json(swap);
};