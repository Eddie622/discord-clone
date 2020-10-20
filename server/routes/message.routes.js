const Messages = require("../controllers/message.controller");

module.exports = app => {
    app.get("/api/message", Messages.getAll);
    app.post("/api/message", Messages.create);
    app.get("/api/message/:_id", Messages.getOne);
    app.put("/api/message/:_id", Messages.update);
    app.delete("/api/message/:_id", Messages.remove);
}
