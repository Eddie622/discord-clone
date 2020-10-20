require("dotenv").config();

const express = require("express"),
cookieParser = require("cookie-parser"),
cors = require("cors");

require("./server/config/mongoose.config")(process.env.DB_NAME);

const app = express();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

require("./server/routes/user.routes")(app);
require("./server/routes/channel.routes")(app);
require("./server/routes/message.routes")(app);

const server = app.listen(process.env.DB_PORT, () =>
console.log(`Listening on port ${process.env.DB_PORT}`)
);

const io = require("socket.io")(server);

io.on("connection", socket => {
  console.log(socket.id);

    socket.on("event_from_client", data => {
        socket.broadcast.emit("send_data_to_all_other_clients", data);
    });
});
