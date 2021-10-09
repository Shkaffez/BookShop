const express = require('express');
const bodyParser = require("body-parser");

const errorMiddleware = require('./middleware/error');
const PORT = process.env.PORT || 3000;
const indexRouter = require('./routes/index');
const bookApiRouter = require('./routes/api/book');
const bookRouter = require('./routes/book');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/book', bookRouter);
app.use('/api/book', bookApiRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`=== start server BookShop PORT ${PORT} ===`);
});
