const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
  const msg = await Message.create(req.body);
  res.json(msg);
};

exports.getMessages = async (req, res) => {
  const msgs = await Message.find({
    $or: [
      { sender: req.user.id, receiver: req.params.id },
      { sender: req.params.id, receiver: req.user.id }
    ]
  });

  res.json(msgs);
};