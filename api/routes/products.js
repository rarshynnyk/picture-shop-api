const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../../models/products");

router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: "Items not found" });
      }

      res.status(200).json(result);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  product
    .save()
    .then(result => {
      res.status(201).json({
        message: "Product was successfully created",
        data: product
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  Product.findById(id)
    .exec()
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: "Item not found" });
      }

      res.status(200).json(result);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

router.patch("/:id", (req, res, next) => {
  const id = req.params.id;

  Product.update({ _id: id }, { $set: req.body })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product was successfully updated",
        data: result
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

module.exports = router;
