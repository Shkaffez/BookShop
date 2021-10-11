const express = require('express');
const redis = require('redis');

const PORT = process.env.PORT || 3000;
const redis_URL = process.env.REDIS_URL || 'localhost'

const client  = redis.createClient(`redis://${redis_URL}`)
const app = express();

app.use(express.json());

app.post('/counter/:bookId/incr', (req, res) => {
    const {bookId} = req.params;

    client.incr(bookId, (err, rep) => {
        if(err) {
            res.status(500).json({error: 'Redis error'});
            return;
        }
        res.json({ counter: rep });        
    });
});

app.get('/counter/:bookId', (req, res) => {
    const {bookId} = req.params;
    client.get(bookId, (err, rep) => {
        if(err) {
            res.status(500).json({error: 'Redis error'});
            return;
        }
        res.json({ counter: rep || 0 });
    });
});

app.listen(PORT, () => {
    console.log(`=== start server Counter PORT ${PORT} ===`);
});