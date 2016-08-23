var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://127.0.0.1:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index'); 
});

router.get('/get-data', function(req, res, next) {
	var resultArray = [];
	mongo.connect(url, function(err, db) {
		assert.equal(null, err);
		var cursor = db.collection('user-data').find();
		cursor.forEach(function(doc, err) {
			assert.equal(null, err);
			resultArray.push(doc);
			console.log(doc);
		}, function() {
			db.close();
			res.render('index', {items: resultArray});
		});
	});
});

router.post('/insert', function(req, res, next) {
	var item = {
		title : req.body.title,
		content : req.body.content,
		author : req.body.author
	};
	mongo.connect(url, function(err, db) {
		assert.equal(null, err);
		db.collection('user-data').insertOne(item, function(err, result) {
			assert.equal(null, err);
			console.log('Item inserted.');
			console.log(result);
			db.close();
		});
	});
	res.redirect('/');
});

router.post('/update', function(req, res, next) {
	var itemId = {
		_id : objectId(req.body.id)
	};
	var item = {
		title : req.body.title,
		content : req.body.content,
		author : req.body.author
	};
	mongo.connect(url, function(err, db) {
		assert.equal(null, err);
		db.collection('user-data').updateOne(itemId, {$set : item}, function(err, result) {
			assert.equal(null, err);
			console.log('Item updated');
			console.log(itemId);
			console.log(item);
			db.close();
		})
	})
	res.redirect('/');
});

router.post('/delete', function(req, res, next) {
	var itemId = {
		_id : objectId(req.body.id)
	};
	mongo.connect(url, function(err, db) {
		assert.equal(null, err);
		db.collection('user-data').deleteOne(itemId, function(err, result) {
			assert.equal(null, err);
			console.log('Item deleted');
			db.close();
		})
	})
	res.redirect('/');
});

module.exports = router;