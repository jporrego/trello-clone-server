var Item = require("../models/item");
var Category = require("../models/category");

var async = require("async");

// Display inventory.
exports.category_list = function (req, res, next) {
  Category.find({}, "name")
    .sort({ name: 1 })
    .exec(function (err, result) {
      if (err) {
        return next(err);
      }
      res.json(result);
    });
};

exports.category_detail = function (req, res, next) {
  Category.findById(req.params.id).exec(function (err, result) {
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

exports.category_detail_by_name = function (req, res, next) {
  Category.findOne({ name: req.params.name }).exec(function (err, result) {
    if (err) {
      return next(err);
    }
    if (result == null) {
      // No results.
      res.sendStatus(204);
      return;
    }
    res.json(result);
  });
};

exports.category_create_post = async function (req, res, next) {
  try {
    const existingCategory = await Category.findOne({
      name: req.body.name,
    }).exec();
    if (existingCategory !== null) {
      res.sendStatus(409);
    } else {
      let category = new Category({
        name: req.body.name,
      });
      category.save();
      res.end();
    }
  } catch (error) {
    return next(error);
  }
};

exports.category_delete_post = async function (req, res, next) {
  try {
    const existingItems = await Item.find({
      category: req.params.id,
    }).exec();

    if (existingItems.length > 0) {
      //throw new Error("Can't delete this category because other documents reference it.");
      res.status(409).json({
        message: "Can't delete this category because other items reference it.",
      });
    } else {
      await Category.deleteOne({ _id: req.params.id });
      res.end();
    }
  } catch (error) {
    return next(error);
  }
};
