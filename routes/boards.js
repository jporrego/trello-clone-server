let express = require("express");
let router = express.Router();

let boards_controller = require("../controllers/boardsController");

// GET catalog home page.
router.get("/", boards_controller.boards);

module.exports = router;
