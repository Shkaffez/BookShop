const express = require('express');
const { v4: uuid } = require('uuid');

class Book {
    constructor(
        title = "",
        description = "",
        authors = "",
        favorite = "",
        fileCover = "",
        fileName = "",
        id = uuid(),
    ) {
        this.title = title
        this.description = description
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName = fileName
        this.id = id
    }
}

const store = {
    books: [
        new Book(),
        new Book(),
    ]
}
 
console.log('server started');

const app = express();
app.use(express.json());

app.post('/api/user/login', (req, res) => {
    res.status(201);
    res.json({ id: 1, mail: "test@mail.ru" });
});

app.get('/api/books', (req, res) => {
    const { books } = store;
    res.json(books);
});

app.get('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const { books } = store;
    const indexedBook = books.findIndex(book => book.id === id);

    if(indexedBook !== -1) {
        res.json(books[indexedBook]);
    } else {
        res.status(404).json('404 / Страница не найдена');        
    }
});

app.post('/api/books', (req, res) => {
    const { books } = store;
    const {  title, description, authors, favorite, fileCover, fileName } = req.body;

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
    books.push(newBook);

    res.status(201);
    res.json(newBook);
});

app.put('/api/books/:id', (req, res) =>{
    const { id } = req.params;
    const { books } = store;
    const {  title, description, authors, favorite, fileCover, fileName } = req.body;
    const indexedBook = books.findIndex(book => book.id === id);

    if(indexedBook !== -1) {
        books[indexedBook] = { ...books[indexedBook],  title, description, authors, favorite, fileCover, fileName};
        res.json(books[indexedBook]);
    } else {
        res.status(404).json('404 / Страница не найдена');        
    }
});

app.delete('/api/books/:id', (req, res) =>{
    const { id } = req.params;
    const { books } = store;
    const indexedBook = books.findIndex(book => book.id === id);

    if(indexedBook !== -1) {
        books.splice(indexedBook, 1);
        res.json(true);
    } else {
        res.status(404).json('404 / Страница не найдена');        
    }
});


app.listen(3000);
