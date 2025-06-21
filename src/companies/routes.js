import { Router } from 'express'
import { CompaniesController } from './controller.js'

const companiesRouter = Router()
const companiesController = new CompaniesController()

companiesRouter.get('/', companiesController.getAll)
companiesRouter.post('/', companiesController.create)
companiesRouter.get('/:id', companiesController.getById)
companiesRouter.patch('/:id', companiesController.update)
companiesRouter.delete('/:id', companiesController.delete)

export default companiesRouter
