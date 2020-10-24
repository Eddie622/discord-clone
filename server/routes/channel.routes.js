const Channels = require("../controllers/channel.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = app => {
    app.get("/api/channel", authenticate, Channels.getAll);
    app.post("/api/channel", authenticate, Channels.create);
    app.get("/api/channel/:_id", authenticate, Channels.getOne);
    app.put("/api/channel/:_id", authenticate, Channels.update);
    app.delete("/api/channel/:_id", authenticate, Channels.remove);
    app.put("/api/channel/:_id/add_message", authenticate, Channels.addMessage);
    app.put("/api/channel/:_id/remove_message", authenticate, Channels.removeMessage);
}