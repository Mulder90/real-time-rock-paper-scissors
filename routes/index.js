const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');

router.get(
  '/',
  catchErrors(async (req, res, next) => {
    res.json({
      status: 'It works!'
    });
  })
);

module.exports = router;
