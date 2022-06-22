var Item = require("../models/item");
var Brand = require("../models/brand");

var async = require("async");

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
