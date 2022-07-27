let express = require("express");
let router = express.Router();

let lists_controller = require("../controllers/listController");

// Add one list.
router.get("/", lists_controller.add_list);

module.exports = router;
