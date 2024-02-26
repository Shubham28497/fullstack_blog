require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/users/User");
const postRoutes = require("./routes/posts/Post");
const app = express();

require("./config/dbConnect");
//*middleware


//* user route
app.use("/api/v1/users", userRoutes);

//*post route
app.use("/api/v1/posts",postRoutes)




//*comment route
//!POST/api/v1/comments
app.post("/api/v1/comments", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "comment created",
    });
  } catch (err) {
    res.json(err);
  }
});

//!GET/api/v1/comments/:id
app.get("/api/v1/comments/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Comments details",
    });
  } catch (err) {
    res.json(err);
  }
});
//!DEl/api/v1/comments/:id
app.delete("/api/v1/comments/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Comment delete",
    });
  } catch (err) {
    res.json(err);
  }
});
//!PUT/api/v1/comments/:id
app.put("/api/v1/comments/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Comment updated",
    });
  } catch (err) {
    res.json(err);
  }
});
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));
