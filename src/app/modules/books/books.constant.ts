import { IBookStatus } from './books.interface'

export const bookStatus: IBookStatus[] = ['N/A', 'Reading', 'Finished']

export const bookSearchableFields = ['title', 'author', 'genre']

export const booksFilterableFields = [
  'searchTerm',
  'title',
  'author',
  'genre',
  'publicationYear',
]
