let express = require("express");
let router = express.Router();

// Require controller modules.
let item_controller = require("../controllers/itemController");
let category_controller = require("../controllers/categoryController");
let brand_controller = require("../controllers/brandController");

/// ITEM ROUTES ///

// GET catalog home page.
router.get("/", item_controller.index);

// POST request for creating item.
router.post("/item/create", item_controller.item_create_post);

// POST request to update item.
router.post("/item/:id/update", item_controller.item_update_post);

// POST request to delete item.
router.delete("/item/:id/delete", item_controller.item_delete_post);

// GET request for one item.
router.get("/item/:id", item_controller.item_detail);

/*
/// category ROUTES ///

// GET request for creating category. NOTE This must come before route for id (i.e. display category).
router.get("/category/create", category_controller.category_create_get);



// GET request to delete category.
router.get("/category/:id/delete", category_controller.category_delete_get);

// POST request to delete category.
router.post("/category/:id/delete", category_controller.category_delete_post);

// GET request to update category.
router.get("/category/:id/update", category_controller.category_update_get);

// POST request to update category.
router.post("/category/:id/update", category_controller.category_update_post);
*/
// POST request for creating category.
router.post("/category/create", category_controller.category_create_post);

// GET request for one category by id.
router.get("/category/:id", category_controller.category_detail);

// GET request for one category by name.
router.get("/category/name/:name", category_controller.category_detail_by_name);

// GET request for list of all categorys.
router.get("/categories", category_controller.category_list);

/// brand ROUTES ///

// POST request for creating category.
router.post("/brand/create", brand_controller.brand_create_post);

// GET request for one category by id.
router.get("/brand/:id", brand_controller.brand_detail);

// GET request for one category by name.
router.get("/brand/name/:name", brand_controller.brand_detail_by_name);

// GET request for list of all categorys.
router.get("/brands", brand_controller.brand_list);
module.exports = router;
