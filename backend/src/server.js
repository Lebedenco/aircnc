const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv');
const path = require("path");

const app = express();
const port = process.env.PORT || 3333;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

const io = require('socket.io')(server);
const routes = require("./routes");

const connectedUsers = {};

io.on('connection', socket => {
  console.log(socket.handshake.query)
  console.log('Usuário conectado', socket.id);

  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
 });

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

