const express = require("express");
const router = express.Router();

const boards_controller = require("../controllers/boardsController");

// GET All boards.
router.get("/", boards_controller.boards);

// GET Board lists.
router.get("/:boardId/lists", boards_controller.board_lists);

// GET Single board.
router.get("/:boardId", boards_controller.board_detail);

module.exports = router;
