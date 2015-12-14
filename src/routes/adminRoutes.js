var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
    {
        title: 'Sapiras\' Return',
        genre: 'Fiction',
        author: 'Prasath Soosaithasan',
        read: false
    },
    {
        title: 'Dugorim\'s Revenge',
        genre: 'Fiction',
        author: 'Prasath Soosaithasan',
        read: false
    }
];

var router = function (nav) {

    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function (err, results) {
                    res.send(results);
                    db.close();
                });
            });
        });

    return adminRouter;

};

module.exports = router;


