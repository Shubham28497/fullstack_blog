require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/users/User");
const postRoutes = require("./routes/posts/Post");
const commentRoutes = require("./routes/comments/Comment");
const globalErrHandler = require("./middlewares/globalHandler");
const session = require("express-session");
const methodOverride=require("method-override")
const mongoStore = require("connect-mongo");
const app = express();
const Post = require("./model/post/Post");
require("./config/dbConnect");
//*middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))
//* configure ejs
app.set("view engine", "ejs");
//* server static files
app.use(express.static(__dirname, +"/public"));
//*session config
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
      mongoUrl: process.env.MONGO_URL,
      ttl: 24 * 60 * 60,
    }),
  })
);
//* save the login user into locals
app.use((req, res, next) => {
  if (req.session.userAuth) {
    res.locals.userAuth = req.session.userAuth;
  } else {
    res.locals.userAuth = null;
  }
  next()
});
//render home
app.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("user")
    res.render("index", { posts });
  } catch (error) {
    res.render("index", { error: error.message });
  }
});
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
