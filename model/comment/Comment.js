const mongoose = require(mongoose);

//* Schema
const commentSchema = new mongoose.model(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
