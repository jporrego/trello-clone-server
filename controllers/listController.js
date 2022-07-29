const db = require("../db");

// Respond with single user.
exports.lists = async (req, res, next) => {
  const { rows } = await db.query("SELECT * FROM list");
  console.log(rows);
  res.status(200).json(rows);
};

// GET cards for a list
exports.list_cards = async (req, res, next) => {
  try {
    const { listId } = req.params;
    const { rows } = await db.query("SELECT * FROM card WHERE list_id = $1", [
      listId,
    ]);
    res.status(200).json(rows);
  } catch (error) {
    res.send(500);
  }
};
