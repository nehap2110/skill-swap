require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");

const connectDB = require("./config/db");
const socketHandler = require("./sockets/socketHandler");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/swaps", require("./routes/swapRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

socketHandler(server);

server.listen(5000, () => console.log("Server running on 5000"));