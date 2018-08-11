const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

//our localhost port
const port = process.env.PORT || 4001;

const app = express();

//server instance
const server = http.createServer(app);

//creates our socket using the instance of the server
const io = socketIO(server);

// this is what the socket.io syntax is like. We will work with this later.
io.on("connection", socket => {
  console.log(`user connected`);
  console.log(socket.id);

  socket.on("typing", username => {
    socket.broadcast.emit("typing", {
      from: username
    });
  });

  socket.on("change html", value => {
    socket.broadcast.emit("render html", {
      html: value.html
    });
    console.log(value.html);
  });

  socket.on("append", value => {
    socket.broadcast.emit("append value", {
      html: value.html,
      css: value.css,
      js: value.js
    });
  });

  socket.on("disconnect", socket => {
    console.log("disconnected");
  });
});

server.listen(port, () => console.log(`listening on port ${port}`));

server.on("error", () => {
  console.log(`there was an error`);
  server.close(() => {
    process.exit(0);
  });
});
