const socketio = require("socket.io");

module.exports = (server) => {
  const io = socketio(server, {
    cors: { origin: "*" }
  });

  io.on("connection", (socket) => {

    socket.on("send-message", ({ to, message }) => {
      io.to(to).emit("receive-message", message);
    });

    // VIDEO CALL
    socket.on("call-user", ({ to, offer }) => {
      io.to(to).emit("incoming-call", { from: socket.id, offer });
    });

    socket.on("answer-call", ({ to, answer }) => {
      io.to(to).emit("call-accepted", { answer });
    });

    socket.on("ice-candidate", ({ to, candidate }) => {
      io.to(to).emit("ice-candidate", candidate);
    });

  });
};