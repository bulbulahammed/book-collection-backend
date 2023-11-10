import { Schema, model } from 'mongoose'
import { BookModel, IBook } from './books.interface'

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationYear: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    addedBy: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [
      {
        comment: {
          type: String,
        },
        reviewer: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Book = model<IBook, BookModel>('Book', bookSchema)
