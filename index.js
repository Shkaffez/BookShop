const express = require('express');

const bookRouter = require('./routes/book');
const errorMiddleware = require('./middleware/error');
 
const app = express();
app.use('/api/book', bookRouter);
app.use(express.json());


app.post('/api/user/login', (req, res) => {
    res.status(201);
    res.json({ id: 1, mail: "test@mail.ru" });
});

app.use(errorMiddleware);

app.listen(3000);
