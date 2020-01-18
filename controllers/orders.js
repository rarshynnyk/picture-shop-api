const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/product");

exports.ordersGet = async (_, res) => {
  try {
    const total = await Order.countDocuments();
    const items = await Order.find()
      .select("_id product quantity")
      .populate("product", "name price");

    res.status(200).json({
      total,
      items
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.ordersCreate = async (req, res) => {
  try {
    const product = await Product.findById(req.body.product);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    const order = new Order({
      _id: mongoose.Types.ObjectId(),
      quantity: req.body.quantity,
      product: product._id
    });

    const result = await order.save();

    res.status(201).json({
      message: "Order was successfully created",
      data: result
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.ordersGetSingle = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Order.findById(id)
      .select("_id quantity product")
      .populate("product", "name price");

    if (!result) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      data: result
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.ordersRemove = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Order.remove({ _id: id });

    if (!result) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};
