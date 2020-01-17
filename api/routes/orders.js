const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'orders GET'
  })
})

router.post('/', (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  }

  res.status(201).json({
    message: 'Order was successfully created',
    data: order,
  })
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  res.status(200).json({
    message: 'orders GET with id',
    id,
  })
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  res.status(200).json({
    message: 'delete orders GET with id',
    id,
  })
})

module.exports = router;