const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: [6, "Username must be 6 characters or longer"],
      maxlength: [12, "Username name must be 12 characters or less"],
      unique: true
    },
    photo: {
      type: String,
    },
    displayName: {
      type: String,
      minlength: [1, "Display name must be 1 character or longer"],
      maxlength: [12, "Display name must be 12 characters or less"],
      required: [true, "Display Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"],
    }
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: "Username is already taken" });

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwords must match");
  }
  next();
});

UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
