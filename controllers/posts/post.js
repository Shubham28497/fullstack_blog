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
    const getPosts = await Post.find();
    res.json({
      status: "Success",
      data: getPosts,
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
    const userFound = await Post.findById(id);
    res.json({
      status: "Success",
      data: userFound,
    });
  } catch (err) {
    next(appErr(err.message));
  }
};
//*del post
const delPostCtrl = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Post delete",
    });
  } catch (err) {
    res.json(err);
  }
};
//*update post details
const updatePostCtrl = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Post updated",
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
