const express = require("express");
const router = express.Router();

const auth = require("../../middlewares/auth");

const OrdersController = require("../../controllers/orders");

router.get("/", auth, OrdersController.ordersGet);
router.post("/", auth, OrdersController.ordersCreate);
router.get("/:id", auth, OrdersController.ordersGetSingle);
router.delete("/:id", auth, OrdersController.ordersRemove);

module.exports = router;
