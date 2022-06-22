#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Item = require("./models/item");
var Category = require("./models/category");
var Brand = require("./models/brand");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var items = [];
var categories = [];
var brands = [];

function categoryCreate(name, cb) {
  var category = new Category({ name: name });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New category: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function brandCreate(name, cb) {
  var brand = new Brand({ name: name });

  brand.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New category: " + brand);
    brands.push(brand);
    cb(null, brand);
  });
}

function itemCreate(name, brand, category, description, price, stock, img, cb) {
  itemDetail = {
    name: name,
    brand: brand,
    catgegory: category,
    description: description,
    price: price,
    stock: stock,
    img: img,
  };
  //if (category != false) itemDetail.category = category;

  var item = new Item(itemDetail);
  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Item: " + item);
    items.push(item);
    cb(null, item);
  });
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate("coffee machines", callback);
      },
      function (callback) {
        categoryCreate("cold brew", callback);
      },
      function (callback) {
        categoryCreate("electric percolator", callback);
      },
      function (callback) {
        categoryCreate("french press", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createBrands(cb) {
  async.series(
    [
      function (callback) {
        brandCreate("Breville", callback);
      },
      function (callback) {
        brandCreate("Nesspresso", callback);
      },
      function (callback) {
        brandCreate("Keurig", callback);
      },
      function (callback) {
        brandCreate("Mr. Coffees", callback);
      },
      function (callback) {
        brandCreate("Ovalware", callback);
      },
      function (callback) {
        brandCreate("OBTaT", callback);
      },
      function (callback) {
        brandCreate("Stanley", callback);
      },
      function (callback) {
        brandCreate("Cuisinart", callback);
      },
      function (callback) {
        brandCreate("Mueller", callback);
      },
      function (callback) {
        brandCreate("BAYKA", callback);
      },
      function (callback) {
        brandCreate("Fellow Clara", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createItems(cb) {
  async.parallel(
    [
      function (callback) {
        itemCreate(
          "Breville",
          brands.find((b) => b === "Breville"),
          categories.find((c) => c === "coffee machines"),
          "Does not trap essential oils of your coffee in a paper filter, and makes a beautiful slow-brew. Includes a permanent stainless seel mesh filter.",
          269,
          25,
          "breville_gy5pqb",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Nesspresso Kups",
          brands.find((b) => b === "Nesspresso"),
          categories.find((c) => c === "coffee machines"),
          "Kups signature coffee machine. Includes permanent stainless mesh.",
          149,
          14,
          "nesspresso-kups_fpjqid",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Ovalware RJ3 Cold Brew Coffee Maker",
          brands.find((b) => b === "Ovalware"),
          categories.find((c) => c === "cold brew"),
          "Cold brewing is 70% less acidic than hot brewing. And richer in taste. Our cold brewer extracts coffee concentrate which can be stored and mixed with an endless variety of beverages to create your own perfect, personal cup of joy.",
          39,
          42,
          "ovalware-rj3_uacjrz",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "OBTaT Cold Brew Coffee Maker",
          brands.find((b) => b === "OBTaT"),
          categories.find((c) => c === "cold brew"),
          "Smooth, Delicious Cold Brew Coffee And Tea At Home With Our Cold Brew Coffee Maker. Easily Make 1.5 Quart Of Perfect Cold Brew Coffee Or Ice Tea.",
          20,
          22,
          "obtat.png",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Stanley Camp Percolator",
          brands.find((b) => b === "Stanley"),
          categories.find((c) => c === "cold brew"),
          "Our stainless-steel percolator coffee pot delivers six cups of hot, fresh coffee at your home or campsite.",
          41,
          84,
          "stanley.png",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Cuisinart PRC-12 Classic Percolator",
          brands.find((b) => b === "Cuisinart"),
          categories.find((c) => c === "electric percolator"),
          "Cuisinart brings modern touches to traditional coffee making techniques with the Classic 12 Cup Percolator.",
          79,
          102,
          "cuisinart.png",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "BAYKA French Press",
          brands.find((b) => b === "BAYKA"),
          categories.find((c) => c === "french press"),
          "As for our coffee fanatics, you now always have your fresh-made coffee at hand, no matter where you are and without standing in line or breaking your bank.",
          29,
          34,
          "bayka.png",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Fellow Clara French Press",
          "Clara is in a brewing immersion league of her own; Fine details & upgraded features to this French press makes manual coffee making awesome.",
          categories[3],
          135,
          8,
          "fellow_clara.png",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createCategories, createBrands, createItems],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("ITEMS: " + items);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
