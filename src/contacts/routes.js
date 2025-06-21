import { Router } from 'express'
import { ContactsController } from './controller.js'

const contactsRouter = Router()
const contactsController = new ContactsController()

contactsRouter.get('/', contactsController.getAll)
contactsRouter.post('/', contactsController.create)
contactsRouter.get('/:id', contactsController.getById)
contactsRouter.patch('/:id', contactsController.update)
contactsRouter.delete('/:id', contactsController.delete)

export default contactsRouter
