type BookType = {
  title: string,
  description: string,
  authors: string,
  favorite: string,
  fileCover: string,
  fileName: string,
}

interface IBookRepository {
  (book: BookType): void,
  (id: string): void,
}
