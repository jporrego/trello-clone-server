const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const port = process.env.PORT || 4000;
var indexRouter = require("./routes/index");
var inventoryRouter = require("./routes/inventory");

const app = express();

//Set up mongoose connection
var mongoose = require("mongoose");
var mongoDB = process.env.ATLAS_URI;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;

app.use(cors());
app.use(express.json());

// Routes
app.use("/", inventoryRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
