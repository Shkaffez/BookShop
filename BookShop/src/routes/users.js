const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const checkAuthMiddleware = require('../middleware/checkAuth');

router.get('/auth', (req, res) => {
    
    res.render("user/auth", {
        title: "Регистрация/Вход"        
    });
});


router.get('/me', checkAuthMiddleware, (req, res) => {
    
    res.render("user/me", {
        title: "Страница пользователя",
        user: req.user

    });
});

router.get('/signup', (req, res) => {
    res.render("user/signup_form");
});

router.post('/signup', async (req, res) => {
    
    const { username, password } = req.body;

     const newUser = new User({
        username: username,
        password: password,
        });

    try {
        await newUser.save();
        res.redirect('/user/me');

    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.get('/login', (req, res) => {
    res.render("user/login_form");
});

router.post('/login',
    passport.authenticate(
        'local',
        {
        failureRedirect: '/user/login',
        },
    ),
    function (req, res) {
        console.log("req.user: ", req.user)
        res.redirect('/')
    }
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});




module.exports = router;