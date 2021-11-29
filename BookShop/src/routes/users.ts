import express from 'express';
import passport from 'passport';
import User from '../models/UserModel';
import checkAuthMiddleware from '../middleware/checkAuth';

const router = express.Router();

router.get('/auth', (req: any, res: any) => {
  res.render('user/auth', {
    title: 'Регистрация/Вход',
  });
});

router.get('/me', checkAuthMiddleware, (req: any, res: any) => {
  res.render('user/me', {
    title: 'Страница пользователя',
    user: req.user,

  });
});

router.get('/signup', (req: any, res: any) => {
  res.render('user/signup_form');
});

router.post('/signup', async (req: any, res: any) => {
  const { username, password } = req.body;

  const newUser = new User({
    username,
    password,
  });

  try {
    await newUser.save();
    res.redirect('/user/me');
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

router.get('/login', (req: any, res: any) => {
  res.render('user/login_form');
});

router.post(
  '/login',
  passport.authenticate(
    'local',
    {
      failureRedirect: '/user/login',
    },
  ),
  (req: any, res: any) => {
    console.log('req.user: ', req.user);
    res.redirect('/');
  },
);

router.get('/logout', (req: any, res: any) => {
  req.logout();
  res.redirect('/');
});

export default router;
