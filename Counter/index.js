const express = require('express');
const redis = require('redis');

const PORT = process.env.PORT || 3002;
const redis_URL = process.env.REDIS_URL || 'localhost'

const client  = redis.createClient(`redis://${REDIS_URL}`)
const app = express();

app.post('/counter/:bookId/incr', (req, res) => {
    const {bookId} = req.params;

    client.incr(bookId, (err, rep) => {
        if(err) {
            res.status(500).json({error: 'Redis error'});
        }
        else {
            res.send(rep);
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
            res.send(rep);
        }
    });
});

app.listen(PORT, () => {
    console.log(`=== start server Counter PORT ${PORT} ===`);
});