const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../../middlewares/auth");

const Product = require("../../models/product");

router.get("/", async (_, res) => {
  try {
    const total = await Product.find().countDocuments();
    const items = await Product.find().select("name price _id");
    res.status(200).json({
      total,
      items
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price
    });

    const result = await product.save();

    res.status(201).json({
      message: "Product successfully created",
      data: result
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Product.findById(id);

    if (!result) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.patch("/:id", auth, async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Product.update({ _id: id }, { $set: req.body });

    res.status(200).json({
      message: "Product was successfully updated",
      data: result
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Product.remove({ _id: id });

    if (!result) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
