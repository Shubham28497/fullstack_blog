//* comment created
const comCreatedCtrl = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "comment created",
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
