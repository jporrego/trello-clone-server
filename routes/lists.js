let express = require("express");
let router = express.Router();

let lists_controller = require("../controllers/listController");

// Add one list.
router.post("/", lists_controller.add_list);

// GET All cards for a board.
router.get("/:listId/cards", lists_controller.list_cards);

// GET All lists.
router.get("/", lists_controller.lists);

module.exports = router;
