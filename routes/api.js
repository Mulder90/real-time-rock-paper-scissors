const express = require('express');

const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: 'Super secret dashboard'
  });
});

module.exports = router;
