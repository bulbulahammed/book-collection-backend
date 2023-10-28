import express from 'express'
import { BookRoutes } from '../modules/books/books.routes'
import { ReviewRoutes } from '../modules/reviews/reviews.routes'
import { UserRoutes } from '../modules/users/user.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
