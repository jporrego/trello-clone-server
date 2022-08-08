let express = require("express");
let router = express.Router();

let card_controller = require("../controllers/cardController");

// Add one card.
router.post("/", card_controller.add_card);

// Delete one card.
router.delete("/:cardId", card_controller.delete_card);

// Edit card description.
router.put("/:cardId/description", card_controller.updated_card_description);

module.exports = router;
