const express = require('express');
const router = express.Router();
const axios = require('axios');
const {Book} = require('../models');



async function getCounter (id) {
    try {
        const {data} = await axios.get(`counter:3000/counter/${id}`);
        return data.counter;
    } catch (e) {
        console.error(e);
        return false;
    }
}

const store = {
    book: [],
};

[1, 2, 3].map(el => {
    const newbook = new Book(`book ${el}`, `description book ${el}`);
    store.book.push(newbook);
});

router.get('/', (req, res) => {
    const {book} = store;
    res.render("book/index", {
        title: "Список книг",
        books: book,
    });
});

router.get('/create', (req, res) => {
    res.render("book/create", {
        title: "Добавить книгу",
        book: {},
    });
});

router.post('/create', (req, res) => {
    const {book} = store;
    const {title, description, authors} = req.body;

    const newbook = new Book(title, description, authors);
    book.push(newbook);

    res.redirect('/book')
});

router.get('/:id', (req, res) => {
    const {book} = store;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);     
    axios.post(`counter:3000/counter/${id}/incr`)
        .then( response => {            c
            const count = response.data.counter;
            if (idx !== -1) {
                res.render("book/view", {
                    title: "Обзор",
                    book: book[idx],
                    count: count
                });
                return
            } else {
                res.status(404).redirect('/404');
                return
            }
        });    
});

router.get('/update/:id', (req, res) => {
    const {book} = store;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render("book/update", {
            title: "Обновить информацию о книге",
            book: book[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/update/:id', (req, res) => {
    const {book} = store;
    const {id} = req.params;
    const {title, description, authors} = req.body;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book[idx] = {
            ...book[idx],
            title,
            description,
            authors
        };
        res.redirect(`/book/${id}`);
    } else {
        res.status(404).redirect('/404');
    }
});


module.exports = router;

