const Book = require('../models/Book');

type BookType = {
  title: string,
  description: string,
  authors: string,
  favorite: string,
  fileCover: string,
  fileName: string,
}

interface IBookRepository {
  createBook(book: BookType): Promise<void>;
  getBook(id: string): Promise<void | BookType>;
  getBooks(): Promise<Array<BookType> | void>;
  updateBook(id: string, book: BookType): Promise<void | BookType>;
  deleteBook(id: string): Promise<void>;
}

class BooksRepository implements IBookRepository {
  async createBook(book: BookType): Promise<void> {
    const newbook = new Book({ book });
    try {
      await newbook.save();
      return;
    } catch (e) {
      console.error(e);
    }
  }

  async getBook(id: string): Promise<void | BookType> {
    try {
      const book = await Book.findById(id).select('-__v');
      return book;
    } catch (e) {
      console.error(e);
    }
  }

  async getBooks(): Promise<Array<BookType> | void> {
    try {
      const books = await Book.find().select('-__v');
      return books;
    } catch (e) {
      console.log(e);
    }
  }

  async updateBook(id: string, book: BookType): Promise<void | BookType> {
    try {
      await Book.findByIdAndUpdate(id, { book });
      return book;
    } catch (e) {
      console.error(e);
    }
  }

  async deleteBook(id: string): Promise<void> {
    try {
      await Book.deleteOne({ _id: id });
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = BooksRepository;
