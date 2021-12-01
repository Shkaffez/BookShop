import { injectable } from 'inversify';
import Book from '../models/BookModel';
import { CreateBookDto, BookType } from '../Interfaces/IBook';

@injectable()
export default class BooksRepository implements CreateBookDto {
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
