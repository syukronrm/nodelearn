var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Testing Development', condition: false, array: [40,50,69]});
});

router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/users/details', function(req, res, next) {
  res.send('users detail');
});

router.get('/test', function(req, res, next) {
  // res.render('test', {output: req.params.id });
  res.send('dummy');
});

module.exports = router;
