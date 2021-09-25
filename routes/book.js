const express = require('express');
const router = express.Router();
const { Book } = require('../models');
const fileMiddleware = require('../middleware/file');
const nodePath = require('path');

const store = {
    books: [
        new Book(),
        new Book(),
    ]
}



router.get('/', (req, res) => {
    const { books } = store;
    res.json(books);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const { books } = store;
    const indexedBook = books.findIndex(book => book.id === id);

    if (indexedBook !== -1) {
        res.json(books[indexedBook]);
    } else {
        res.status(404).json('404 / Страница не найдена');
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { books } = store;
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const indexedBook = books.findIndex(book => book.id === id);

    if (indexedBook !== -1) {
        books[indexedBook] = { ...books[indexedBook], title, description, authors, favorite, fileCover, fileName };
        res.json(books[indexedBook]);
    } else {
        res.status(404).json('404 / Страница не найдена');
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const { books } = store;
    const indexedBook = books.findIndex(book => book.id === id);

    if (indexedBook !== -1) {
        books.splice(indexedBook, 1);
        res.json(true);
    } else {
        res.status(404).json('404 / Страница не найдена');
    }
});

// загрузка файлов вместо старого метода post

router.post('/upload', fileMiddleware.single('text'), (req, res) => {
    if (req.file) {
        const { path } = req.file;
        const { originalname } = req.file;
        const { books } = store;


        const newBook = new Book("", "", "", "", "", originalname, path);
        books.push(newBook);

        res.status(201);
        res.json(newBook);
    } else {
        res.json(null);
    }
});

router.get('/:id/download', (req, res) => {
    const { id } = req.params;
    const { books } = store;
    const indexedBook = books.findIndex(book => book.id === id);
    const path = books[indexedBook].fileBook;

    if (indexedBook !== -1) {
        res.download(nodePath.join(__dirname, '..', path), 'your_book, ', err=>{
            if (err){
                res.status(404).json(err);
            }
            
        });
    } else {
        res.status(404).json('404 / Страница не найдена');
    }    
});

module.exports = router;
