const db = require("../db");

/// USER ROUTES ///

// Respond with single user.
exports.user = async (req, res, next) => {
  const { rows } = await db.query("SELECT * FROM app_user WHERE id = $1;", [1]);
  res.status(200).json({
    status: "success",
    data: {
      user: rows,
    },
  });
};
