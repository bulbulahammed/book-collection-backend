import { IBookRating, IBookStatus } from './books.interface'

export const bookStatus: IBookStatus[] = ['N/A', 'Reading', 'Finished']
export const bookRating: IBookRating[] = ['1', '2', '3', '4', '5']

export const bookSearchableFields = ['title', 'author', 'genre']

export const booksFilterableFields = [
  'searchTerm',
  'title',
  'author',
  'genre',
  'publicationYear',
]
