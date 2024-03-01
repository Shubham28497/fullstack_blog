const Post = require("../../model/post/Post");
const Comment = require("../../model/comment/Comment");
const User = require("../../model/user/User");
const appErr = require("../../utils/appErr");
//* comment created
const comCreatedCtrl = async (req, res,next) => {
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
    await post.save({ validateBeforeSave: false });
    await user.save({ validateBeforeSave: false });
    res.json({
      status: "Success",
      data: comment,
    });
  } catch (err) {
   next(appErr(err));
  }
};
//*get comment
const getComCtrl = async (req, res,next) => {
  try {
    res.json({
      status: "Success",
      user: "Comments details",
    });
  } catch (err) {
   next(appErr(err));
  }
};

//*del comment
const delComCtrl = async (req, res,next) => {
  try {
    //* find a post
    const comment = await Comment.findById(req.params.id);
    //*check if the post belong to the user
    if (comment.user.toString() !== req.session.userAuth.toString()) {
      return next(appErr("You are not allowed to delete this comment", 403));
    }
    //* del a post
    await Comment.findByIdAndDelete(req.params.id);
    res.json({
      status: "Success",
      data: "Comment has been deleted succesfully",
    });
  } catch (err) {
    next(appErr(err));
  }
};
//*update comment
const upComCtrl = async (req, res, next) => {
  try {
    //* find a post
    const comment = await Comment.findById(req.params.id);
    if(!comment){
      return next(appErr("Comment not found"))
    }
    //*check if the post belong to the user
    if (comment.user.toString() !== req.session.userAuth.toString()) {
      return next(appErr("You are not allowed to update this comment", 403));
    }
    const commentUpdated = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        message: req.body.message,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "Success",
      data: commentUpdated,
    });
  } catch (err) {
    next(appErr(err));
  }
};
module.exports = {
  comCreatedCtrl,
  getComCtrl,
  delComCtrl,
  upComCtrl,
};
