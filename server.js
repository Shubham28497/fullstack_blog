const express = require("express");
const app = express();
require("./config/dbConnect");
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));
