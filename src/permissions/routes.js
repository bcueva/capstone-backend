import { Router } from 'express'
import { PermissionsController } from './controller.js'

const permissionsRouter = Router()
const permissionsController = new PermissionsController()

permissionsRouter.get('/', permissionsController.getAll)
permissionsRouter.post('/', permissionsController.create)
permissionsRouter.get('/:id', permissionsController.getById)
permissionsRouter.patch('/:id', permissionsController.update)
permissionsRouter.delete('/:id', permissionsController.delete)

export default permissionsRouter
