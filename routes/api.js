const express = require('express');

const router = express.Router();

router.get('/stats', (req, res) => {
  res.status(200).json({
    message: 'Super secret stats eheheh'
  });
});

module.exports = router;
