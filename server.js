require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/users/User");
const postRoutes = require("./routes/posts/Post");
const commentRoutes = require("./routes/comments/Comment");
const app = express();

require("./config/dbConnect");
//*middleware
app.use(express.json())
//* user route
app.use("/api/v1/users", userRoutes);

//*post route
app.use("/api/v1/posts", postRoutes);

//*comment route
app.use("/api/v1/comments", commentRoutes);
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));
