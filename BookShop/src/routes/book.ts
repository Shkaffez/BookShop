import express, { Request, Response } from 'express';
import needle from 'needle';
import container from '../container';
import BooksRepository from '../services/BooksRepository';
import Book from '../models/BookModel';

const router = express.Router();

const COUNTER_HOST = process.env.COUNTER_HOST || 'counter';
const COUNTER_PORT = process.env.COUNTER_PORT || 3002;

router.get('/', async (req: Request, res: Response) => {
  const books = await Book.find().select('-__v');
  res.render('book/index', {
    title: 'Список книг',
    books,
  });
});

router.get('/create', (req: Request, res: Response) => {
  res.render('book/create', {
    title: 'Добавить книгу',
    book: {},
  });
});

router.post('/create', async (req: Request, res: Response) => {
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  } = req.body;

  const newbook = new Book({
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  });

  try {
    await newbook.save();
    res.redirect('/book');
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // const book = await Book.findById(id).select('-__v');
    const repo = container.get(BooksRepository);
    const book = await repo.getBook(id);

    const counterResponse = await needle('post', `${COUNTER_HOST}:${COUNTER_PORT}/counter/${id}/incr`, { json: true });
    const count = counterResponse.body.counter;
    res.render('book/view', {
      title: 'Обзор',
      user: req.user,
      book,
      count,
    });
  } catch (e) {
    console.error(e);
    res.status(404).redirect('/404');
  }
});

router.get('/update/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).select('-__v');
    res.render('book/update', {
      title: 'Обновить информацию о книге',
      book,
    });
  } catch (e) {
    console.error(e);
    res.status(404).redirect('/404');
  }
});

router.post('/update/:id', async (req: Request, res: Response) => {
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  } = req.body;
  const { id } = req.params;

  try {
    await Book.findByIdAndUpdate(id, {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
    });
  } catch (e) {
    console.error(e);
    res.status(404).redirect('/404');
  }
  res.redirect(`/book/${id}`);
});

router.post('/delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Book.deleteOne({ _id: id });
  } catch (e) {
    console.error(e);
    res.status(404).redirect('/404');
  }

  res.redirect('/book');
});

export default router;
