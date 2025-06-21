import { Router } from 'express'
import { SalesController } from './controller.js'

const salesRouter = Router()
const salesController = new SalesController()

salesRouter.get('/', salesController.getAll)
salesRouter.post('/', salesController.create)
salesRouter.get('/:id', salesController.getById)
salesRouter.patch('/:id', salesController.update)
salesRouter.delete('/:id', salesController.delete)

export default salesRouter
