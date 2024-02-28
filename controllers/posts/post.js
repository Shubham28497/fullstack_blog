const Post = require("../../model/post/Post");
const User = require("../../model/user/User");
const appErr = require("../../utils/appErr");

//* post created
const postCreatedCtrl = async (req, res,next) => {
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
    res.json(err);
  }
};
//*get all posts
const getPostCtrl = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Posts list",
    });
  } catch (err) {
    res.json(err);
  }
};
//*post details
const postDetailsCtrl = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Posts details",
    });
  } catch (err) {
    res.json(err);
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
