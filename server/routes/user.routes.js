const userController = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.post("/api/register", userController.register);
  app.post("/api/login", userController.login);
  app.post("/api/logout", userController.logout);
  app.get("/api/user/:_id", userController.getOne);
  app.get("/api/user/find/:username", userController.findByUsername);
  app.delete("/api/user/:_id", userController.remove);
  app.put("/api/user/:_id/add_channel", userController.addChannel);
  app.put("/api/user/:_id/remove_channel", userController.removeChannel);

  app.get("/api/users", authenticate, userController.getAll);
  app.get("/api/users/loggedin", authenticate, userController.getLoggedInUser);
};
