import express, { Request, Response } from 'express';
import passport from 'passport';
import User from '../models/UserModel';
import checkAuthMiddleware from '../middleware/checkAuth';

const router = express.Router();

router.get('/auth', (req: Request, res: Response) => {
  res.render('user/auth', {
    title: 'Регистрация/Вход',
  });
});

router.get('/me', checkAuthMiddleware, (req: Request, res: Response) => {
  res.render('user/me', {
    title: 'Страница пользователя',
    user: req.user,

  });
});

router.get('/signup', (req: Request, res: Response) => {
  res.render('user/signup_form');
});

router.post('/signup', async (req: Request, res: Response) => {
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

router.get('/login', (req: Request, res: Response) => {
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
  (req: Request, res: Response) => {
    console.log('req.user: ', req.user);
    res.redirect('/');
  },
);

router.get('/logout', (req: Request, res: Response) => {
  req.logout();
  res.redirect('/');
});

export default router;
