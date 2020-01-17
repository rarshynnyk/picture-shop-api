const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'products GET'
  })
})

router.post('/', (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price
  }

  res.status(200).json({
    message: 'Product was successfully created',
    data: product
  })
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  res.status(200).json({
    message: 'products GET with id',
    id,
  })
})

router.patch('/:id', (req, res, next) => {
  const id = req.params.id;

  res.status(200).json({
    message: 'patch products GET with id',
    id,
  })
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  res.status(200).json({
    message: 'delete products GET with id',
    id,
  })
})

module.exports = router;