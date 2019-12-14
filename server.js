const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.redirect("index.html");
});

io.on("connection", socket => {
  socket.on("stream", image => {
    socket.broadcast.emit("stream", image);
  });
});

const port = process.env.PORT || 4000;
http.listen(port, err => {
  if (err) throw err;
  console.log("app is running on port number  " + port);
});
