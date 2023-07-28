import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    name: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    booksList: {
      type: Schema.Types.ObjectId,
      ref: 'Books',
    },
    readingList: {
      type: Schema.Types.ObjectId,
      ref: 'ReadingList',
    },
    wishList: {
      type: Schema.Types.ObjectId,
      ref: 'WishList',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)
export const User = model<IUser, UserModel>('User', userSchema)
