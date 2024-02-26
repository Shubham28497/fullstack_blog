const mongoose = require(mongoose);

//* Schema
const userSchema = new mongoose.model(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
