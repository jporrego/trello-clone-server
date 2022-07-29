let express = require("express");
let router = express.Router();

let lists_controller = require("../controllers/listController");

// GET All cards for a board.
router.get("/:listId/cards", lists_controller.list_cards);

// GET All lists.
router.get("/", lists_controller.lists);

// Add one list.
//router.get("/", lists_controller.add_list);

module.exports = router;
