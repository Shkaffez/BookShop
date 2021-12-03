import express, { Request, Response } from 'express';

const router = express.Router();
const Book = require('../../models/BookModel');

router.get('/', async (req: Request, res: Response) => {
  const books = await Book.find().select('-__v');
  res.json(books);
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id).select('-__v');
    res.json(book);
  } catch (e) {
    console.error(e);
    res.status(404).json('book not found');
  }
});

router.post('/', async (req: Request, res: Response) => {
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
    res.json(newbook);
  } catch (e) {
    console.error(e);
    res.status(500).json();
  }
});

router.put('/:id', async (req: Request, res: Response) => {
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
    await Book.updateOne(
      { _id: id },
      {
        $set: {
          title,
          description,
          authors,
          favorite,
          fileCover,
          fileName,
        },
      },
    );
    res.redirect(`/api/book/:${id}`);
  } catch (e) {
    console.error(e);
    res.status(500).json();
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Book.deleteOne({ _id: id });
    res.json(true);
  } catch (e) {
    console.error(e);
    res.status(500).json();
  }
});

export default router;
