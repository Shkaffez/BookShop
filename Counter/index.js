const express = require('express');
const redis = require('redis');
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3002;
const redis_URL = process.env.REDIS_URL || 'localhost'

const client  = redis.createClient(`redis://${redis_URL}`)
const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.post('/counter/:bookId/incr', (req, res) => {
    const {bookId} = req.params;

    client.incr(bookId, (err, rep) => {
        if(err) {
            res.status(500).json({error: 'Redis error'});
        }
        else {
            console.log(rep);
            res.json(rep);
        }
    });
});

app.get('/counter/:bookId', (req, res) => {
    const {bookId} = req.params;
    client.get(bookId, (err, rep) => {
        if(err) {
            res.status(500).json({error: 'Redis error'});
        }
        else {
            res.json(rep);
        }
    });
});

app.listen(PORT, () => {
    console.log(`=== start server Counter PORT ${PORT} ===`);
});