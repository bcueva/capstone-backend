import { Router } from 'express'
import { RolesController } from './controller.js'

const rolesRouter = Router()
const rolesController = new RolesController()

rolesRouter.get('/', rolesController.getAll)
rolesRouter.post('/', rolesController.create)
rolesRouter.get('/:id', rolesController.getById)
rolesRouter.patch('/:id', rolesController.update)
rolesRouter.delete('/:id', rolesController.delete)

export default rolesRouter
