const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  register(req, res) {
    const user = new User(req.body);
    user.channels = []
    
    user
      .save()
      .then(() => {
        res.json({ msg: "success!", user: user });
      })
      .catch((err) => res.json(err));
  };
  login(req, res) {
    User.findOne({ username: req.body.username })
      .then((user) => {
        if (user === null) {
          res.status(400).json({ msg: "invalid login attempt" });
        } else {
          bcrypt
            .compare(req.body.password, user.password)
            .then((passwordIsValid) => {
              if (passwordIsValid) {
                res.cookie("usertoken", jwt.sign({ _id: user._id }, process.env.JWT_SECRET),{httpOnly: true}).json({ msg: "success!" });
              } else {
                res.status(400).json({ msg: "invalid login attempt" });
              }
            })
            .catch((err) =>
              res.status(400).json({ msg: "invalid login attempt" })
            );
        }
      })
      .catch((err) => res.json(err));
  };
  logout(req, res) {
    res
      .cookie("usertoken", jwt.sign({ _id: "" }, process.env.JWT_SECRET), {
        httpOnly: true,
        maxAge: 0,
      })
      .json({ msg: "ok" });
  };
  logout2(req, res) {
    res.clearCookie("usertoken");
    res.json({ msg: "usertoken cookie cleared" });
  };
  getLoggedInUser(req, res) {
    const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });

    User.findById(decodedJWT.payload._id)
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  };
  getAll(req, res) {
      User.find()
          .then( user => res.json(user) )
          .catch( errors => res.json(errors) );
  };
  getOne(req, res) {
      User.findOne({_id: req.params._id})
          .then( user => res.json(user) )
          .catch( errors => res.json(errors) );
  };
  findByUsername(req, res) {
      User.findOne({username: req.params.username})
          .then( user => res.json(user) )
          .catch( errors => res.json(errors) );
  };
  remove(req, res) {
      User.findByIdAndRemove({_id: req.params._id})
          .then( () => res.json({msg: "ok"}) )
          .catch( errors => res.json(errors) );
  };
  addChannel(req, res) {
      User.findByIdAndUpdate({_id: req.params._id}, {$push: {channels: req.body.channel_id}})
          .then( () => res.json({msg: "ok"}) )
          .catch( errors => res.json(errors) );
  };
  removeChannel(req, res) {
      User.findByIdAndUpdate({_id: req.params._id}, {$pull : {channels: req.body.channel_id}})
          .then( () => res.json({msg: "ok"}) )
          .catch( errors => res.json(errors) );
  };
};



module.exports = new UserController();
