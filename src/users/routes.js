import { Router } from 'express'
import { UsersController } from './controller.js'

const usersRouter = Router()
const usersController = new UsersController()

usersRouter.get('/', usersController.getAll)
usersRouter.post('/', usersController.create)
usersRouter.get('/:id', usersController.getById)
usersRouter.patch('/:id', usersController.update)
usersRouter.delete('/:id', usersController.delete)

export default usersRouter