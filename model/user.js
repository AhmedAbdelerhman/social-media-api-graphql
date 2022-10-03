const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  userName: String,
  password: String,
  email: { type: String, required: true, index: true, unique: true ,trim: true},
  createdAt: String,
});

module.exports = model("User", userSchema);
