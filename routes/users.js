let express = require("express");
let router = express.Router();

let users_controller = require("../controllers/usersController");

// GET catalog home page.
router.get("/", users_controller.user);

module.exports = router;
