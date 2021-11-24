"use strict";
const Book = require('../models/Book');
class BooksRepository {
    static async createBook(book) {
        const newbook = new Book({ book });
        try {
            await newbook.save();
        }
        catch (e) {
            console.error(e);
        }
    }
    static async getBook(id) {
        try {
            const book = await Book.findById(id).select('-__v');
            return book;
        }
        catch (e) {
            console.error(e);
        }
    }
    static async getBooks() {
        try {
            const books = await Book.find().select('-__v');
            return books;
        }
        catch (e) {
            console.log(e);
        }
    }
    static async updateBook(id, book) {
        try {
            await Book.findByIdAndUpdate(id, { book });
            return book;
        }
        catch (e) {
            console.error(e);
        }
    }
    static async deleteBook(id) {
        try {
            await Book.deleteOne({ _id: id });
        }
        catch (e) {
            console.error(e);
        }
    }
}
module.exports = BooksRepository;
