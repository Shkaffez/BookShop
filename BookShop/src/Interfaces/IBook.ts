export type BookType = {
  title: string,
  description: string,
  authors: string,
  favorite: string,
  fileCover: string,
  fileName: string,
};

export interface CreateBookDto {
  createBook(book: BookType): Promise<void>;
  getBook(id: string): Promise<void | BookType>;
  getBooks(): Promise<Array<BookType> | void>;
  updateBook(id: string, book: BookType): Promise<void | BookType>;
  deleteBook(id: string): Promise<void>;
}
