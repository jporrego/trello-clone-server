const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
let fs = require("fs");
let cloudinary = require("cloudinary").v2;
//require("child_process").fork("populatedb.js");

const port = process.env.PORT || 4000;
let usersRouter = require("./routes/users");
let boardsRouter = require("./routes/boards");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", usersRouter);
app.use("/api/boards", boardsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
