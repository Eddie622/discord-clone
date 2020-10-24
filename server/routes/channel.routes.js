const Channels = require("../controllers/channel.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = app => {
    app.get("/api/channel", Channels.getAll);
    app.post("/api/channel", Channels.create);
    app.get("/api/channel/:_id", Channels.getOne);
    app.put("/api/channel/:_id", Channels.update);
    app.delete("/api/channel/:_id", Channels.remove);
    app.put("/api/channel/:_id/add_message", Channels.addMessage);
    app.put("/api/channel/:_id/remove_message", Channels.removeMessage);
}