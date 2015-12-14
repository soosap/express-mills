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

var express = require('express');
var bookRouter = express.Router();

var router = function (nav) {
    bookRouter.route('/')
        .get(function (req, res) {
            res.render('bookListView', {
                title: 'Books',
                nav: nav,
                books: books
            });
        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = req.params.id;
            res.render('bookView', {
                title: 'Books',
                nav: nav,
                book: books[id]
            });
        });

    return bookRouter;
};

module.exports = router;