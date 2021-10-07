const express = require('express');
const router = express.Router();
const {Book} = require('../../models');

const stor = {
    book: [],
};

[1, 2, 3].map(el => {
    const newbook = new Book(`book ${el}`, `desc book ${el}`);
    stor.book.push(newbook);
});

router.get('/', (req, res) => {
    const {book} = stor;
    res.json(book);
});

router.get('/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(book[idx]);
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

router.post('/', (req, res) => {
    const {book} = stor;
    const {title, desc} = req.body;

    const newbook = new Book(title, desc);
    book.push(newbook);

    res.json(newbook);
});

router.put('/:id', (req, res) => {
    const {book} = stor;
    const {title, desc} = req.body;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book[idx] = {
            ...book[idx],
            title,
            desc,
        };
        res.json(book[idx]);
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

router.delete('/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book.splice(idx, 1);
        res.json(true);
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

module.exports = router;

