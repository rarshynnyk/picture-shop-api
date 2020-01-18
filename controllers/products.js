const mongoose = require("mongoose");

const Product = require("../models/product");

exports.productsGet = async (_, res) => {
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
};

exports.productsCreate = async (req, res) => {
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
};

exports.productsGetSingle = async (req, res) => {
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
};

exports.productsUpdate = async (req, res) => {
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
};

exports.productsRemove = async (req, res) => {
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
};
