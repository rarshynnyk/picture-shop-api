const express = require("express");
const router = express.Router();

const auth = require("../../middlewares/auth");

const ProductsController = require("../../controllers/products");

router.get("/", ProductsController.productsGet);
router.post("/", auth, ProductsController.productsCreate);
router.get("/:id", ProductsController.productsGetSingle);
router.patch("/:id", auth, ProductsController.productsUpdate);
router.delete("/:id", auth, ProductsController.productsRemove);

module.exports = router;
