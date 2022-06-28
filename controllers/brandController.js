var Item = require("../models/item");
var Brand = require("../models/brand");
var async = require("async");

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

exports.brand_detail_by_name = function (req, res, next) {
  Brand.findOne({ name: req.params.name }).exec(function (err, result) {
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

exports.brand_create_post = async function (req, res, next) {
  try {
    const existingBrand = await Brand.findOne({ name: req.body.name }).exec();
    if (existingBrand !== null) {
      res.sendStatus(409);
    } else {
      let brand = new Brand({
        name: req.body.name,
      });
      brand.save();
      res.end();
    }
  } catch (error) {
    return next(error);
  }
};

exports.brand_delete_post = async function (req, res, next) {
  try {
    const existingItems = await Item.find({
      brand: req.params.id,
    }).exec();

    if (existingItems.length > 0) {
      //throw new Error("Can't delete this category because other documents reference it.");
      res.status(409).json({
        message: "Can't delete this category because other items reference it.",
      });
    } else {
      await Brand.deleteOne({ _id: req.params.id });
      res.end();
    }
  } catch (error) {
    return next(error);
  }
};
