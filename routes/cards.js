let express = require("express");
let router = express.Router();

let card_controller = require("../controllers/cardController");

// Add one card.
router.post("/", card_controller.add_card);

module.exports = router;
