import { Router } from 'express'
import { TablesController } from './controller.js'

const tablesRouter = Router()
const tablesController = new TablesController()

tablesRouter.get('/', tablesController.getAll)
tablesRouter.post('/', tablesController.create)
tablesRouter.get('/:id', tablesController.getById)
tablesRouter.patch('/:id', tablesController.update)
tablesRouter.delete('/:id', tablesController.delete)

export default tablesRouter
