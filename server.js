require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/users/User");
const postRoutes = require("./routes/posts/Post");
const commentRoutes = require("./routes/comments/Comment");
const globalErrHandler = require("./middlewares/globalHandler");
const session = require("express-session");
const app = express();

require("./config/dbConnect");
//*middleware
app.use(express.json());

//*session config
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

//* user route
app.use("/api/v1/users", userRoutes);

//*post route
app.use("/api/v1/posts", postRoutes);

//*comment route
app.use("/api/v1/comments", commentRoutes);

//*error handler middleware
app.use(globalErrHandler);
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));
