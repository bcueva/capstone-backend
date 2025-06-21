import { Router } from 'express'
import { ProductsController } from './controller.js'

const productsRouter = Router()
const productsController = new ProductsController()

productsRouter.get('/', productsController.getAll)
productsRouter.get('/suggestions', productsController.getSuggestions)
productsRouter.get('/byCode/:code', productsController.getByCode)
productsRouter.post('/', productsController.create)
productsRouter.get('/:slug', productsController.getBySlug)
productsRouter.patch('/:id', productsController.update)
productsRouter.delete('/:id', productsController.delete)

export default productsRouter
