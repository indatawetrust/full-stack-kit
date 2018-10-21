var express = require('express');
var router = express.Router();

router.get('*', function(req, res, next) {
  res.render(process.env.indexTemplate, {
    title: 'FullStack Kit',
    bundleURL: process.env.bundleURL
  })
});

module.exports = router;
