const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'orders GET'
  })
})

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'orders POST'
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