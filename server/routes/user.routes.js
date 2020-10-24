const userController = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.post("/api/register", userController.register);
  app.post("/api/login", userController.login);
  app.post("/api/logout", userController.logout);
  app.get("/api/user/:_id", authenticate, userController.getOne);
  app.get("/api/users/loggedin", authenticate, userController.getLoggedInUser);
};
