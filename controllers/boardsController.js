const db = require("../db");

/// USER ROUTES ///

// Respond with single user.
exports.boards = async (req, res, next) => {
  const { rows } = await db.query("SELECT * FROM board");
  console.log(rows);
  res.status(200).json(rows);
};

exports.board_detail = async (req, res, next) => {
  const { boardId } = req.params;
  const { rows } = await db.query("SELECT * FROM board WHERE id = $1", [
    boardId,
  ]);
  res.status(200).json(rows);
};

exports.board_lists = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { rows } = await db.query("SELECT * FROM list WHERE board_id = $1", [
      boardId,
    ]);
    console.log(rows);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};
