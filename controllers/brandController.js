var Item = require("../models/item");
var Brand = require("../models/brand");

var async = require("async");

exports.brand_detail = function (req, res, next) {
  Brand.findById(req.params.id).exec(function (err, result) {
    if (err) {
      return next(err);
    }
    if (result == null) {
      // No results.
      var err = new Error("Item");
      err.status = 404;
      return next(err);
    }
    // Successful, so send data.
    res.json(result);
  });
};

// Display inventory.
exports.brand_list = function (req, res, next) {
  Brand.find({}, "name")
    .sort({ name: 1 })
    .exec(function (err, result) {
      if (err) {
        return next(err);
      }
      res.json(result);
    });
};
