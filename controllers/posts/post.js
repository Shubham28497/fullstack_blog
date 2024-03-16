const Post = require("../../model/post/Post");
const User = require("../../model/user/User");
const appErr = require("../../utils/appErr");

//* post created
const postCreatedCtrl = async (req, res, next) => {
  const { title, description, category, image, user } = req.body;
  try {
    if (!title || !description || !category || !req.file) {
      return next(appErr("All fields are required"));
    }
    //* find the user
    const userID = req.session.userAuth;
    // console.log(userID);
    const userFound = await User.findById(userID);
    //* create post
    const postCreated = await Post.create({
      title,
      description,
      category,
      user: userFound._id,
      image: req.file.path,
    });

    //* push the post created into the arrayof user's post
    userFound.posts.push(postCreated._id);
    //* re save
    await userFound.save();
    res.json({
      status: "Success",
      data: postCreated,
    });
  } catch (err) {
    next(appErr(err.message));
  }
};
//*get all posts
const getPostCtrl = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("comments").populate("user");
    res.json({
      status: "Success",
      data: posts,
    });
  } catch (err) {
    next(appErr(err.message));
  }
};
//*post details
const postDetailsCtrl = async (req, res, next) => {
  try {
    //* get the id from params
    const id = req.params.id;
    //* find the post
    const userFound = await Post.findById(id).populate("comments");
    res.json({
      status: "Success",
      data: userFound,
    });
  } catch (err) {
    next(appErr(err.message));
  }
};
//*del post
const delPostCtrl = async (req, res, next) => {
  try {
    //* find a post
    const post = await Post.findById(req.params.id);
    //*check if the post belong to the user
    if (post.user.toString() !== req.session.userAuth.toString()) {
      return next(appErr("You are not allowed to delete this post", 403));
    }
    //* del a post
    await Post.findByIdAndDelete(req.params.id);
    res.json({
      status: "Success",
      data: "Post has been deleted succesfully",
    });
  } catch (err) {
    next(appErr(err.message));
  }
};
//*update post details
const updatePostCtrl = async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category || !req.file)
    return next(appErr("All fields are required"));
  try {
    //* find a post
    const post = await Post.findById(req.params.id);
    //*check if the post belong to the user
    if (post.user.toString() !== req.session.userAuth.toString()) {
      return next(appErr("You are not allowed to update this post", 403));
    }
    const postUpdated = await Post.findByIdAndUpdate(req.params.id, {
      title,
      description,
      category,
      image: req.file.path,
    });
    res.json({
      status: "Success",
      data: postUpdated,
    });
  } catch (err) {
    res.json(err);
  }
};
module.exports = {
  postCreatedCtrl,
  getPostCtrl,
  postDetailsCtrl,
  delPostCtrl,
  updatePostCtrl,
};
