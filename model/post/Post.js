const mongoose = require(mongoose);

//* Schema
const postSchema = new mongoose.model(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["reactjs", "html", "css", "nodejs", "javascript", "other"],
    },
    image: {
      type: String,
      required: true,
    },
    user: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
