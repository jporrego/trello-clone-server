#! /usr/bin/env node
require("dotenv").config({ path: "./.env" });

var async = require("async");
var Item = require("./models/item");
var Category = require("./models/category");
var Brand = require("./models/brand");

var mongoose = require("mongoose");
var mongoDB = process.env.ATLAS_URI;
console.log(mongoDB);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var items = [];
var categories = [];
var brands = [];

const dropCollections = async (cb) => {
  await db.dropCollection("items");
  await db.dropCollection("brands");
  await db.dropCollection("categories");
};

function categoryCreate(name, cb) {
  var category = new Category({ name: name });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    //console.log("New category: " + category);
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
    //console.log("New category: " + brand);
    brands.push(brand);
    cb(null, brand);
  });
}

function itemCreate(name, brand, category, description, price, stock, img, cb) {
  itemDetail = {
    name: name,
    brand: brand,
    category: category,
    description: description,
    price: price,
    stock: stock,
    img: img,
  };

  console.log(itemDetail);

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
        brandCreate("Mr. Coffee", callback);
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
          brands.find((b) => b.name === "Breville"),
          categories.find((c) => c.name === "coffee machines"),
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
          brands.find((b) => b.name === "Nesspresso"),
          categories.find((c) => c.name === "coffee machines"),
          "Kups signature coffee machine. Includes permanent stainless mesh.",
          149,
          14,
          "nesspresso-kups_fpjqid",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Keurig K-Duo Coffee Maker",
          brands.find((b) => b.name === "Keurig"),
          categories.find((c) => c.name === "coffee machines"),
          "The Keurig K-Duo Single Serve & Carafe coffee maker is one of the latest brewer innovations from Keurig. It is a multifunction coffee maker that allows you to brew a single cup using Keurig K-Cup pods and a carafe of coffee using ground coffee.",
          189,
          48,
          "keuring-k-duo_jngerm",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Mr. Coffee 12-Cup Coffee Maker",
          brands.find((b) => b.name === "Mr. Coffee"),
          categories.find((c) => c.name === "coffee machines"),
          "Just set it up, turn it on, and brew. There you have it! Rich-tasting coffee expertly brewed for you without the fuss. Grab-A-Cup Auto Pause is a lifesaver when you need a cup before the brew cycle is finished.",
          34,
          50,
          "mr-coffee-maker-12-cup_az4tr8",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Ovalware RJ3 Cold Brew Coffee Maker",
          brands.find((b) => b.name === "Ovalware"),
          categories.find((c) => c.name === "cold brew"),
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
          brands.find((b) => b.name === "OBTaT"),
          categories.find((c) => c.name === "cold brew"),
          "Smooth, Delicious Cold Brew Coffee And Tea At Home With Our Cold Brew Coffee Maker. Easily Make 1.5 Quart Of Perfect Cold Brew Coffee Or Ice Tea.",
          20,
          22,
          "btat_ybn8w6",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Stanley Camp Percolator",
          brands.find((b) => b.name === "Stanley"),
          categories.find((c) => c.name === "electric percolator"),
          "Our stainless-steel percolator coffee pot delivers six cups of hot, fresh coffee at your home or campsite.",
          41,
          84,
          "stanley-percolator_xhdxtm",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Cuisinart PRC-12 Classic Percolator",
          brands.find((b) => b.name === "Cuisinart"),
          categories.find((c) => c.name === "electric percolator"),
          "Cuisinart brings modern touches to traditional coffee making techniques with the Classic 12 Cup Percolator.",
          79,
          102,
          "cuisinart-prc-12_nudmed",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Mueller French Press",
          brands.find((b) => b.name === "Mueller"),
          categories.find((c) => c.name === "french press"),
          "We tested enough mechanisms and filters to make your head spin to tweak and uniquely design our press with a triple layered filter structure to stop the sediment, but let the yummy coffee oils through for a full-bodied delicious brew that will make you a very happy camper.",
          39,
          25,
          "mueller-french-press_ilgfwq",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Stanley French Press",
          brands.find((b) => b.name === "Stanley"),
          categories.find((c) => c.name === "french press"),
          "Designed with double vacuum insulation, this French Press not only allows you to make an amazing cup of Joe but you can also keep it hot for up to 4 hours to enjoy as you go.",
          69,
          12,
          "stanley-french-press_xpkpba",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "BAYKA French Press",
          brands.find((b) => b.name === "BAYKA"),
          categories.find((c) => c.name === "french press"),
          "As for our coffee fanatics, you now always have your fresh-made coffee at hand, no matter where you are and without standing in line or breaking your bank.",
          29,
          34,
          "bakya-french-press_frrrbg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Fellow Clara French Press",
          brands.find((b) => b.name === "Fellow Clara"),
          categories.find((c) => c.name === "french press"),
          "Clara is in a brewing immersion league of her own; Fine details & upgraded features to this French press makes manual coffee making awesome.",
          135,
          8,
          "fellow-clara-french-press_bejl8t",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [dropCollections, createCategories, createBrands, createItems],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      //console.log("ITEMS: " + items);
      console.log("Database populated");
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
