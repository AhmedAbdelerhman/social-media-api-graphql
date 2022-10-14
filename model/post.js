const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  body: String,
  userName: String,
  createdAt: String,
  comments: [
    {
      body: String,
      userName: String,
      createdAt: String,
      userId: { type: Schema.Types.ObjectId, ref: "User" }
    },
  ],
  likes: [
    {
      userName: String,
      createdAt: String,
      userId: { type: Schema.Types.ObjectId, ref: "User" }
    },
  ],
  user: { type: Schema.Types.ObjectId, ref: "User" },
});
module.exports = model("Post", postSchema);
