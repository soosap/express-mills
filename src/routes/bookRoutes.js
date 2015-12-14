var express = require('express');
var bookRouter = express.Router();
var objectId = require('mongodb').ObjectID;
var mongodb = require('mongodb').MongoClient;

var router = function (nav) {
    var bookService = require('../services/goodreadsService')();
    var bookController = require('../controllers/bookController')(bookService, nav);

    // Overarching middleware applying to all book routes
    bookRouter.use(bookController.middleware);

    bookRouter.route('/')
        .get(bookController.getIndex);

    bookRouter.route('/:id')
        .get(bookController.getById);

    return bookRouter;
};

module.exports = router;