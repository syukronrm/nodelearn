var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Testing lol', condition: true });
});

router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/users/details', function(req, res, next) {
  res.send('users detail');
}); 

module.exports = router;
