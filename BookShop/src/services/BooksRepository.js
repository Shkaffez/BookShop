const __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  const c = arguments.length; let r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc; let
    d;
  if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') r = Reflect.decorate(decorators, target, key, desc);
  else for (let i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const { injectable } = require('inversify');
const Book = require('../models/Book');
// const TYPES = {
//   BooksRepository: Symbol.for('BooksRepository'),
// };
let BooksRepository = class BooksRepository {
  async createBook(book) {
    const newbook = new Book({ book });
    try {
      await newbook.save();
      return;
    } catch (e) {
      console.error(e);
    }
  }

  async getBook(id) {
    try {
      const book = await Book.findById(id).select('-__v');
      return book;
    } catch (e) {
      console.error(e);
    }
  }

  async getBooks() {
    try {
      const books = await Book.find().select('-__v');
      return books;
    } catch (e) {
      console.log(e);
    }
  }

  async updateBook(id, book) {
    try {
      await Book.findByIdAndUpdate(id, { book });
      return book;
    } catch (e) {
      console.error(e);
    }
  }

  async deleteBook(id) {
    try {
      await Book.deleteOne({ _id: id });
    } catch (e) {
      console.error(e);
    }
  }
};
BooksRepository = __decorate([
  injectable(),
], BooksRepository);
module.exports = BooksRepository;
