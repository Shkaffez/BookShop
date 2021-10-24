const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const needle = require('needle');

const COUNTER_HOST = process.env.COUNTER_HOST || 'counter';
const COUNTER_PORT = process.env.COUNTER_PORT || 3002;


router.get('/', async (req, res) => {
    const books = await Book.find().select("-__v");
    res.render("book/index", {
        title: "Список книг",
        books: books,
    });
});

router.get('/create', (req, res) => {
    res.render("book/create", {
        title: "Добавить книгу",
        book: {},
    });
});

router.post('/create', async (req, res) => {
    
    const {title,
        description,
        authors,
        favorite,
        fileCover,
        fileName        
     } = req.body;

     const newbook = new Book({
        title: title,
        description: description,
        authors: authors,
        favorite: favorite,
        fileCover: fileCover,
        fileName: fileName
    });

    try {
        await newbook.save();
        res.redirect('/book');
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});
    

router.get('/:id', async (req, res) => {    
    const {id} = req.params;
    try {
        const book = await Book.findById(id).select('-__v');
        const counterResponse = await needle('post', `${COUNTER_HOST}:${COUNTER_PORT}/counter/${id}/incr`, {json: true});
        const count = counterResponse.body.counter;
        res.render("book/view", {
            title: "Обзор",
            user: req.user,
            book: book,
            count: count
        });
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }
});

router.get('/update/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const book = await Book.findById(id).select('-__v');
        res.render("book/update", {
            title: "Обновить информацию о книге",
            book: book
        });
    } catch (e) {
        console.error(e);
        rres.status(404).redirect('/404');  
    }
});

router.post('/update/:id', async (req, res) => {
    const {
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName        
     } = req.body;
    const {id} = req.params;

    try {        
        await Book.findByIdAndUpdate(id, {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName        
         });
        
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');       
    }
    res.redirect(`/book/${id}`);
});

router.post('/delete/:id', async (req, res) => {
    const {id} = req.params;

    try {
        await Book.deleteOne({_id: id});
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.redirect(`/book`);
});


module.exports = router;

