const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/User');
const Book = require('./models/Book');
const errorMiddleware = require('./middleware/error');
const checkAuthMiddleware = require('./middleware/checkAuth');

const indexRouter = require('./routes/index');
const bookApiRouter = require('./routes/api/book');
const bookRouter = require('./routes/book');
const userRouter = require('./routes/users');

function verify(username, password, done) {
  User.findOne({ username }, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
}

const options = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: false,
};

passport.use('local', new LocalStrategy(options, verify));

// Конфигурирование Passport для сохранения пользователя в сессии
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-session')({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/book', checkAuthMiddleware, bookRouter);
app.use('/user', userRouter);
app.use('/api/book', bookApiRouter);

io.on('connection', async (socket) => {
  const { id } = socket;
  console.log(`Socket connected: ${id}`);
  const { roomName } = socket.handshake.query;
  console.log(`Socket roomName: ${roomName}`);

  socket.join(roomName);
  const comments = await Book.findById(roomName).select('comments');
  socket.emit('commentsHistory', comments);

  socket.on('sendComment', async (msg) => {
    const book = await Book.findById(roomName);
    book.comments.push(msg);
    await book.save();
    socket.to(roomName).emit('sendComment', msg);
    socket.emit('sendComment', msg);
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${id}`);
  });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'qwerty12345';
const NameDB = process.env.DB_NAME || 'books';
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/';

async function start() {
  try {
    await mongoose.connect(HostDb, {
      user: UserDB,
      pass: PasswordDB,
      dbName: NameDB,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
