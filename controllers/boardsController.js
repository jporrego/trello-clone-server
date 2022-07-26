const db = require("../db");

/// USER ROUTES ///

// Respond with single user.
exports.boards = async (req, res, next) => {
  const { rows } = await db.query("SELECT * FROM board");
  res.status(200).json({
    status: "success",
    data: {
      user: rows,
    },
  });
};
