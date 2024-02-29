const Post = require("../../model/post/Post");
const Comment = require("../../model/comment/Comment");
const User = require("../../model/user/User");
//* comment created
const comCreatedCtrl = async (req, res) => {
  const { message } = req.body;
  try {
    //* find the post
    const post = await Post.findById(req.params.id);
    //* create the comment
    const comment = await Comment.create({
      user: req.session.userAuth,
      message,
    });
    //* push the comment to post
    post.comments.push(comment._id);
    //* find the user
    const user = await User.findById(req.session.userAuth);
    //* push the comment into
    user.comments.push(comment._id);
    //* disable validation
    //* save
    await post.save({ validateBeforeSave :false});
    await user.save({validateBeforeSave:false})
    res.json({
      status: "Success",
      data: comment,
    });
  } catch (err) {
    res.json(err);
  }
};
//*get comment
const getComCtrl = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Comments details",
    });
  } catch (err) {
    res.json(err);
  }
};

//*del comment
const delComCtrl = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Comment delete",
    });
  } catch (err) {
    res.json(err);
  }
};
//*update comment
const upComCtrl = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Comment updated",
    });
  } catch (err) {
    res.json(err);
  }
};
module.exports = {
  comCreatedCtrl,
  getComCtrl,
  delComCtrl,
  upComCtrl,
};
