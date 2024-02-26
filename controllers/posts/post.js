//* post created
const postCreatedCtrl = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Post created",
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