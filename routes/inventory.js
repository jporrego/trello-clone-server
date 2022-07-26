let express = require("express");
let router = express.Router();
const db = require("../db");

// Require controller modules.
//let item_controller = require("../controllers/itemController");
//let category_controller = require("../controllers/categoryController");
//let brand_controller = require("../controllers/brandController");

/// ITEM ROUTES ///

// GET catalog home page.
//router.get("/", item_controller.index);
router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM app_user WHERE id = $1;", [1]);
  res.status(200).json({
    status: "success",
    data: {
      user: rows,
    },
  });
});

module.exports = router;
