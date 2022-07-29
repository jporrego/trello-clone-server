const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
//require("child_process").fork("populatedb.js");

const port = process.env.PORT || 4000;
const usersRouter = require("./routes/users");
const boardsRouter = require("./routes/boards");
const listsRouter = require("./routes/lists");
const cardsRouter = require("./routes/cards");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", usersRouter);
app.use("/api/boards", boardsRouter);
app.use("/api/lists", listsRouter);
app.use("/api/cards", cardsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
